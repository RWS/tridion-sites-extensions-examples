---
name: build-tridion-sites-extension
description: >-
  Build validated Tridion Sites Experience Space extensions from natural language
  prompts. Use when the user wants to create, scaffold, validate, build, or pack
  an addon, or mentions Content Explorer actions, Content Editor fields, columns,
  navigation items, or Tridion extension points.
---

# Build Tridion Sites Extension

End-to-end workflow for generating a **validated, built, and packed** addon zip from this repository’s examples. Follow this playbook so generated extensions stay aligned across the team.

## Prerequisites

- User stated (or you asked once for) a Tridion Sites product version
- Closest example chosen from [extension-catalog.md](extension-catalog.md) and the matching `sites-*` folder

## Workflow (follow in order)

1. **Clarify version** — If the user did not state a Tridion Sites product version, ask once. Map it with [versioning-notes.md](versioning-notes.md). Reject or warn when the requested feature’s min version exceeds the selected version (see the catalog `Min version` column).

2. **Discover examples** — Pick the closest base example from [extension-catalog.md](extension-catalog.md) and `sites-*/README.md`. Copy that addon; do not invent a new file layout.

3. **Read patterns** — Before writing code, read `manifest.json`, the extension `package.json`, `src/index.ts`, and the `register*` module from the chosen example.

4. **Scaffold** — Copy the example addon to a new folder. Rename addon id, extension package name, webpack `output.path`, and manifest `dist\\...` paths. Keep Windows backslashes in the manifest.

5. **Plan config** — Externalize deployer-tunable values to `{addonId}.config.json`. See [config-guidelines.md](config-guidelines.md). Always expose `priority` when hooks support it.

6. **Implement** — Customize scaffolded code. Read tunables via `getConfiguration<T>()`. Match the base example's UI approach (typically `styled-components`); do not introduce `@tridion/graphene` — it is not publicly available.

7. **Validate loop** — In the **extension package folder**: `npm install` → `npm run lint` → `npm run build` → `npm run pack`. Fix errors and repeat until all pass.

8. **Deliver** — Return zip path, config file path, and dev instructions (`npm run dev`, OIDC redirect URL).

## Configuration-first rules

- Externalize field names, TCM IDs, thresholds, API URLs, and **priority** to config
- Never hardcode `priority: 1` in hook returns — use `priority: config?.priority`
- Set `manifest.json` `requireConfiguration` appropriately (`yes` / `optional` / `no`)
- See [config-guidelines.md](config-guidelines.md)

## Version selection

- Pin `@tridion-sites/*` and peer dependency versions from [versioning-notes.md](versioning-notes.md) (match the example folder for that product release)
- Confirm the operation is available on the selected version via the catalog `Min version` column
- For `sites-10` or `sites-10-ux-update`, copy patterns from that version tree; do not assume 10.1-only APIs exist

## Extension catalog

See [extension-catalog.md](extension-catalog.md) for extension-point → example mapping.

## Coding conventions

- `ExtensionModule` + `createExtensionGlobals()` pattern
- Register features in separate modules receiving `ExtensionBuilder`
- Manifest paths use Windows backslashes: `dist\\{name}\\main.js`
- Match dependency versions from [versioning-notes.md](versioning-notes.md) for the chosen product release
- Shell operations run in the **extension package folder** (e.g. `simple-action-addon/hello-action/`)

## Example tool chain

**Prompt:** *Sites 10.1.2 — Content Explorer action that copies selected item URLs*

1. Resolve version `10.1.2` → examples folder `sites-10.1`, packages `3.2.0 / 2.2.0 / 4.2.0 / 1.2.3`
2. Catalog match: Content Explorer simple action → `sites-10.1/content-explorer/simple-action-addon`
3. Read `manifest.json`, `hello-action/src/index.ts`, `registerHelloAction.tsx`
4. Copy and rename to `copy-urls-addon` / `copy-urls`
5. Implement action logic; add config keys as needed
6. `npm run lint` → `npm run build` → `npm run pack`
