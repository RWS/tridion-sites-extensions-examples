# Configuration-first design

Addon configuration is uploaded **separately** to Tridion Add-ons Service and can be changed per environment **without rebuilding the zip**.

## Config file shape

At addon root: `{addonId}.config.json`

```json
{
  "configuration": {
    "{extension-name}": {
      "targetFieldName": "color",
      "priority": 1
    }
  }
}
```

Read at runtime via `getConfiguration<T>()` from `globals.ts`.

## manifest.json requireConfiguration

| Value | When to use |
|-------|-------------|
| `"yes"` | Extension cannot function without config |
| `"optional"` | Sensible code defaults; config overrides (most generated addons) |
| `"no"` | No deployer-tunable values |

## What to externalize

| Category | Examples | Config key pattern |
|----------|----------|-------------------|
| Field targeting | `targetFieldName` | Per extension name block |
| TCM / schema IDs | publication type maps | Descriptive camelCase keys |
| Feature thresholds | max length, confirmation toggles | `maxLength`, `showConfirmation` |
| External endpoints | 3rd-party API URLs | `apiBaseUrl` |
| **Priority** | field / editor ordering | `priority`, `fieldPriority`, `editorPriority` |

Keep in code: extension IDs, registration structure, React components, translation keys, business logic.

## Priority — always in config

When a hook returns `priority`, the value **must** come from config:

```typescript
interface ExtensionConfiguration {
  priority?: number;
}
const config = getConfiguration<ExtensionConfiguration>();
// in hook:
priority: config?.priority,
```

| Builder API | Hook | Config keys |
|-------------|------|-------------|
| `addFormField` | `useFormField` → `priority` | `priority` or `fieldPriority` |
| `addMultivalueFormField` | `useFormField` → `priority` | `priority` |
| `addItemEditor` | `useContentEditorView` → `priority` | `editorPriority` |

**Anti-pattern:** `priority: 1` hardcoded in hook return.

## Validation

Fail the generated addon when:

- `priority: N` appears in source without `getConfiguration()` usage
- `requireConfiguration: "yes"` but the config file is missing

Warn when hardcoded TCM IDs appear without config backing.

When the base example has a config file or uses `priority`, generate `{addonId}.config.json` and wire the `package.json` `dev` script with `config=../{addonId}.config.json`.

Document each config key with a one-line comment in the generated TypeScript interface or an adjacent note.
