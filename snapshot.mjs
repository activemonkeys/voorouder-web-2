#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const PROFILES_DIR = 'profiles';
const DEFAULT_PROFILE = 'default';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findWorkspaces() {
  const packagePath = path.resolve(__dirname, 'package.json');
  if (!fs.existsSync(packagePath)) {
    console.warn(
      '⚠️ package.json niet gevonden, gebruik standaard workspace paden.',
    );
    return ['apps/*', 'packages/*'];
  }
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    const workspaces = packageJson.workspaces;
    if (Array.isArray(workspaces)) return workspaces;
    if (workspaces && Array.isArray(workspaces.packages))
      return workspaces.packages;
    return ['apps/*', 'packages/*'];
  } catch (err) {
    console.error('❌ Fout bij het lezen van package.json:', err.message);
    return [];
  }
}

function resolveWorkspacePaths(workspacePatterns) {
  const resolvedPaths = new Map();
  workspacePatterns.forEach((pattern) => {
    if (!pattern.includes('*')) {
      const fullPath = path.resolve(__dirname, pattern);
      if (fs.existsSync(fullPath)) resolvedPaths.set(pattern, fullPath);
      return;
    }
    const baseDir = pattern.replace('/*', '');
    const basePath = path.resolve(__dirname, baseDir);
    if (fs.existsSync(basePath)) {
      fs.readdirSync(basePath, {withFileTypes: true})
        .filter((dirent) => dirent.isDirectory())
        .forEach((dirent) => {
          const workspaceKey = `${baseDir}/${dirent.name}`;
          resolvedPaths.set(workspaceKey, path.join(basePath, dirent.name));
        });
    }
  });
  return resolvedPaths;
}

function loadProfile(profileName) {
  const profilePath = path.resolve(
    __dirname,
    PROFILES_DIR,
    `${profileName}.json`,
  );
  if (!fs.existsSync(profilePath)) {
    console.error(`❌ Profiel niet gevonden: ${profilePath}`);
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
  } catch (err) {
    console.error(
      `❌ Fout bij het lezen van profiel ${profileName}.json:`,
      err.message,
    );
    process.exit(1);
  }
}

function collectFiles(dir, rules, globalRules, currentDepth = 0) {
  const {
    extensions = globalRules.extensions || [],
    excludeDirs = [],
    include = [],
    excludeFiles = [],
  } = rules;

  const {excludeDirs: globalExcludeDirs = []} = globalRules;

  const allExcludeDirs = new Set([...excludeDirs, ...globalExcludeDirs]);
  const allExcludeFiles = new Set(excludeFiles);

  let results = [];

  const pathSegments = dir.split(path.sep);
  const lastSegment = pathSegments[pathSegments.length - 1] ?? '';
  if (allExcludeDirs.has(lastSegment) || currentDepth > 20) {
    return [];
  }

  try {
    const files = fs.readdirSync(dir, {withFileTypes: true});
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      const relativePath = path.relative(dir, filePath);

      if (allExcludeDirs.has(file.name) || allExcludeFiles.has(file.name)) {
        continue;
      }

      if (file.isDirectory()) {
        if (
          include.length === 0 ||
          include.some((dir) => relativePath.startsWith(dir))
        ) {
          results = results.concat(
            collectFiles(filePath, rules, globalRules, currentDepth + 1),
          );
        }
      } else if (extensions.includes(path.extname(file.name))) {
        if (
          include.length === 0 ||
          include.some((dir) => relativePath.startsWith(dir))
        ) {
          results.push(filePath);
        }
      }
    }
  } catch (err) {
    console.warn(
      `⚠️ Kan directory niet lezen (${path.relative(__dirname, dir)}): ${err.message}`,
    );
  }
  return results;
}

function generateDocumentation(files, profile, extensions) {
  const outputPath = path.resolve(
    __dirname,
    profile.outputFile || 'monorepo-content.txt',
  );
  let content = `Monorepo projectoverzicht gegenereerd op: ${new Date().toLocaleString('nl-NL')}\n`;
  content += `Profiel: ${profile.name} (${profile.description || 'Geen beschrijving'})\n`;
  content += `Totaal aantal bestanden: ${files.length}\n`;
  content += `Bestandstypen: ${extensions.join(', ')}\n\n`;

  const filesByWorkspace = {};
  files.forEach((file) => {
    const relative = path.relative(__dirname, file);
    const parts = relative.split(path.sep);
    let workspace = 'ROOT';
    if (parts[0] === 'apps' || parts[0] === 'packages') {
      workspace = `${parts[0].toUpperCase()}/${parts[1].toUpperCase()}`;
    }
    if (!filesByWorkspace[workspace]) filesByWorkspace[workspace] = [];
    filesByWorkspace[workspace].push(file);
  });

  Object.keys(filesByWorkspace)
    .sort()
    .forEach((workspace) => {
      content += `${'='.repeat(60)}\n`;
      content += `WORKSPACE: ${workspace}\n`;
      content += `${'='.repeat(60)}\n\n`;

      filesByWorkspace[workspace].sort().forEach((file) => {
        try {
          const fileContent = fs.readFileSync(file, 'utf-8');
          const relativePath = path
            .relative(__dirname, file)
            .replace(/\\/g, '/');
          content += `// Begin van ${relativePath}\n`;
          content += fileContent.trim() + '\n';
          content += `// Einde van ${relativePath}\n\n`;
          console.log(`✅ Toegevoegd: ${relativePath}`);
        } catch (err) {
          console.warn(
            `❌ Kan bestand niet lezen (${path.relative(__dirname, file)}): ${err.message}`,
          );
        }
      });
    });

  fs.writeFileSync(outputPath, content.trim(), 'utf-8');
  console.log(
    `\n🎉 Monorepo documentatie gegenereerd in ${path.basename(outputPath)}`,
  );
  console.log(`📊 Totaal ${files.length} bestanden verwerkt.`);
}

const profileNameArg = process.argv[2];
if (!profileNameArg) {
  console.log(
    `ℹ️ Geen profiel opgegeven, gebruik standaardprofiel: '${DEFAULT_PROFILE}'`,
  );
}
const profileName = profileNameArg || DEFAULT_PROFILE;
const profile = loadProfile(profileName);
profile.name = profileName;

console.log(`🚀 Start generatie met profiel: '${profileName}'...`);
console.log(`   Beschrijving: ${profile.description || 'N.v.t.'}`);

const workspacePatterns = findWorkspaces();
const workspacePaths = resolveWorkspacePaths(workspacePatterns);
const allFiles = new Set();

// 1. Verwerk 'workspaces' configuratie
if (profile.workspaces) {
  for (const [workspaceKey, rules] of Object.entries(profile.workspaces)) {
    if (rules === 'none') continue;

    const workspacePath = workspacePaths.get(workspaceKey);
    if (!workspacePath) {
      console.warn(
        `⚠️ Workspace '${workspaceKey}' gedefinieerd in profiel, maar niet gevonden op schijf.`,
      );
      continue;
    }

    const effectiveRules =
      typeof rules === 'object'
        ? {...profile.global, ...rules}
        : profile.global;

    console.log(`🔍 Scannen: ${workspaceKey}`);
    const files = collectFiles(workspacePath, effectiveRules, profile.global);
    files.forEach((file) => allFiles.add(file));
  }
}

// 2. Verwerk 'rootFiles' configuratie
if (profile.rootFiles) {
  profile.rootFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) {
      allFiles.add(filePath);
    } else {
      console.warn(`⚠️ Root-bestand '${file}' niet gevonden.`);
    }
  });
}

// 3. Genereer output
const finalFiles = Array.from(allFiles).sort();
const allExtensions = new Set(finalFiles.map((f) => path.extname(f)));

if (finalFiles.length === 0) {
  console.warn('\n⚠️ Geen bestanden gevonden met de criteria in het profiel.');
} else {
  generateDocumentation(finalFiles, profile, Array.from(allExtensions).sort());
}
