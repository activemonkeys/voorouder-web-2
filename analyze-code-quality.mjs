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
    excludeFiles = [], // Haal excludeFiles uit de specifieke workspace-regels
  } = rules;

  const {excludeDirs: globalExcludeDirs = []} = globalRules;

  const allExcludeDirs = new Set([...excludeDirs, ...globalExcludeDirs]);
  const allExcludeFiles = new Set(excludeFiles); // Gebruik alleen de specifieke bestands-uitsluitingen voor deze workspace

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

      // Check op zowel directory- als bestandsnaam uitsluitingen
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

const minLinesForDeadCode = 3;

function analyzeDeadCode(filePath, profile) {
  const minLines = profile.analysis?.minDeadCodeLines || minLinesForDeadCode;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let inBlock = false;
  let count = 0;
  let blockStart = 0;
  const results = [];

  const isCommentedCode = (line) => /^\s*\/\//.test(line);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isCommentedCode(line) || /^\s*$/.test(line)) {
      if (!inBlock) {
        blockStart = i + 1;
        inBlock = true;
      }
      count++;
    } else {
      if (inBlock && count >= minLines) {
        results.push({start: blockStart, count});
      }
      inBlock = false;
      count = 0;
    }
  }

  if (inBlock && count >= minLines) {
    results.push({start: blockStart, count});
  }

  if (results.length > 0) {
    return results.sort((a, b) => b.count - a.count)[0];
  }
  return null;
}

function analyzeAndRepairFileHeader(filePath, shouldRepair) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const firstLine = lines[0]?.trim() || '';
  const relativePath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  const expectedHeader = `// ${relativePath}`;

  if (firstLine === expectedHeader) {
    return null; // Alles is correct
  }

  const issue = {
    file: relativePath,
    expected: expectedHeader,
    actual: firstLine.startsWith('//')
      ? firstLine
      : 'Geen of incorrect header commentaar',
  };

  if (shouldRepair) {
    try {
      let newContent;
      if (firstLine.startsWith('//')) {
        // Vervang de incorrecte header
        lines[0] = expectedHeader;
        newContent = lines.join('\n');
      } else {
        // Voeg de nieuwe header toe aan het begin
        newContent = expectedHeader + '\n' + content;
      }
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`🔧 Hersteld: ${relativePath}`);
      return null; // Geen issue meer na reparatie
    } catch (err) {
      console.error(`❌ Fout bij herstellen van ${relativePath}:`, err.message);
      return issue;
    }
  }

  return issue;
}

const args = process.argv.slice(2);
const profileNameArg = args.find((arg) => !arg.startsWith('--'));
const shouldRepair = args.includes('--repair');

if (!profileNameArg) {
  console.error(
    'Gebruik: node analyze-code-quality.mjs <profielnaam> [--repair]',
  );
  console.log(
    'Beschikbare profielen:',
    fs
      .readdirSync(path.resolve(__dirname, PROFILES_DIR))
      .map((f) => f.replace('.json', ''))
      .join(', '),
  );
  process.exit(1);
}

const profile = loadProfile(profileNameArg);
console.log(`🚀 Analyse gestart met profiel: '${profileNameArg}'...`);
if (shouldRepair) {
  console.log('🛠️ Reparatie modus is ingeschakeld.');
}

const workspacePatterns = findWorkspaces();
const workspacePaths = resolveWorkspacePaths(workspacePatterns);
const filesToAnalyze = new Set();

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

    // De 'rules' voor de workspace overschrijven nu de 'global' regels.
    // Dit zorgt ervoor dat `excludeFiles` uit de workspace-config wordt gebruikt.
    const effectiveRules =
      typeof rules === 'object'
        ? {...profile.global, ...rules}
        : profile.global;

    const files = collectFiles(workspacePath, effectiveRules, profile.global);
    files.forEach((file) => filesToAnalyze.add(file));
  }
}

if (profile.rootFiles) {
  profile.rootFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) filesToAnalyze.add(filePath);
  });
}

const allFiles = Array.from(filesToAnalyze).sort();
console.log(`\n🔍 ${allFiles.length} bestanden worden geanalyseerd...`);

let deadCodeIssues = [];
let headerIssues = [];

allFiles.forEach((file) => {
  if (profile.analysis?.deadCode) {
    const deadCodeIssue = analyzeDeadCode(file, profile);
    if (deadCodeIssue) {
      deadCodeIssues.push({
        file: path.relative(__dirname, file).replace(/\\/g, '/'),
        ...deadCodeIssue,
      });
    }
  }

  if (
    profile.analysis?.header &&
    (file.endsWith('.ts') || file.endsWith('.tsx'))
  ) {
    const headerIssue = analyzeAndRepairFileHeader(file, shouldRepair);
    if (headerIssue) {
      headerIssues.push(headerIssue);
    }
  }
});

let totalIssues = headerIssues.length + deadCodeIssues.length;

if (totalIssues === 0 && !shouldRepair) {
  console.log(
    '\n✅ Geen kwaliteitsproblemen gevonden op basis van de geselecteerde analyses.',
  );
} else if (shouldRepair && headerIssues.length === 0) {
  console.log('\n✅ Alle bestandsheaders zijn correct of succesvol hersteld.');
}

if (headerIssues.length > 0) {
  console.log('\n--- ❌ Resterende Fouten in Bestandsheaders ---');
  headerIssues.forEach(({file, expected, actual}) => {
    console.log(`[FOUT] ${file}`);
    console.log(`  Verwacht: ${expected}`);
    console.log(`  Gevonden: ${actual}`);
  });
}

if (deadCodeIssues.length > 0) {
  console.log('\n--- 🧹 Mogelijke Dode Code Gevonden ---');
  deadCodeIssues.forEach(({file, start, count}) => {
    console.log(`[INFO] ${file}:${start} (${count} commentaar/lege regels)`);
  });
}

if (totalIssues > 0 && headerIssues.length === 0 && shouldRepair) {
  console.log('\nHelemaal goed... ');
}

if (totalIssues > 0 && !shouldRepair) {
  console.log(
    `\n🚨 Totaal ${totalIssues} problemen gevonden. Draai met '--repair' om headers automatisch te herstellen.`,
  );
} else if (totalIssues > 0 && shouldRepair) {
  console.log(
    `\n🚨 Totaal ${totalIssues} problemen gevonden. Headers zijn hersteld waar mogelijk.`,
  );
}
