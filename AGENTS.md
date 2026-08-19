# Extension generation (shared skills)

This branch shares Cursor **project skills** so the team generates Tridion Sites Experience Space extensions the same way: copy the closest official example, follow configuration-first rules, and pack a zip.

## What to use

| File | Purpose |
|------|---------|
| [`.cursor/skills/build-tridion-extension/SKILL.md`](.cursor/skills/build-tridion-extension/SKILL.md) | Agent playbook (`@build-tridion-extension`) |
| [`.cursor/skills/build-tridion-extension/extension-catalog.md`](.cursor/skills/build-tridion-extension/extension-catalog.md) | Extension point → example mapping |
| [`.cursor/skills/build-tridion-extension/config-guidelines.md`](.cursor/skills/build-tridion-extension/config-guidelines.md) | What to put in `{addonId}.config.json` |
| [`.cursor/skills/build-tridion-extension/versioning-notes.md`](.cursor/skills/build-tridion-extension/versioning-notes.md) | Sites version → npm package pins |
| [`.cursor/rules/tridion-extension.mdc`](.cursor/rules/tridion-extension.mdc) | Conventions when editing addon `src/` |

## In Cursor

1. Check out this branch (or merge it into your working branch).
2. Reference **`@build-tridion-extension`** or describe an extension intent.
3. The agent should pick a base example from the catalog, copy/rename it, implement, then `lint` / `build` / `pack`.

## Non-negotiables

- Start from an official example in `sites-10`, `sites-10-ux-update`, or `sites-10.1` — do not invent layout or webpack config.
- Pin package versions from versioning notes for the requested Sites release.
- Externalize deployer-tunable values (field names, TCM IDs, URLs, **priority**) to `{addonId}.config.json`.
- Do not use `@tridion/graphene` in generated extensions; it is not publicly available.
