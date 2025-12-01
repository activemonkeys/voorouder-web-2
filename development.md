# Check alle outdated dependencies

pnpm check-updates
ncu --workspaces -u
pnpm instal

## Interactive mode - kies welke je wilt updaten

pnpm check-updates:interactive

## Update alles automatisch (voorzichtig!)

pnpm update-deps

## Knip (voor detecteren unused files)

pnpm knip

## Generate content

node snapshot.mjs full

## Code quality

node analyze-code-quality.mjs full
node analyze-code-quality.mjs full --repair

## Check kebab-case

node check-filenames-kebab.mjs full4

## Shadcn

cd packages/ui
pnpm dlx shadcn@latest add ...

## Remove node_modules

Get-ChildItem -Path . -Include node_modules -Recurse -Directory | Remove-Item -Recurse -Force

## Tekst

Momenteel ben ik bezig om een nextjs project om te zetten naar een monorepo. Bijgaand de huidige code. Benieuwd wat je er al van vindt

ok.. laten we het als volgt doen... Geef de compleet bijgewerkte code van alle files die aangepast/nieuw gemaakt moeten worden, zonder weglatingen, zonder andere dingen aan te passen en zonder onnodig commentaar. Doe het in batches van 3 files, elke file heeft zijn eigen blok waardoor ik het in 1x kan kopieren. Aan het einde van elke batch geef je aan welke files er in de volgende batch zitten. Als alle batches klaar zijn, geef je aan welke files verwijderd kunnen worden. Zorg er graag voor dat elk bestand in een apart Markdown codeblok (drie backticks) staat, zodat de interface de kopieerknop per blok toont.
