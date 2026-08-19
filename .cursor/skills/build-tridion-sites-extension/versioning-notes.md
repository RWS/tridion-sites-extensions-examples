# Sites versioning notes

## Product release → npm packages

Authoritative mapping for generated extensions (wiki + repo README package pins):

| Product release | extensions | models | open-api-client | extensions-cli | Examples folder |
|-----------------|------------|--------|-----------------|----------------|-----------------|
| Tridion Sites 10.0 | 1.0.3 | 1.0.0 | 2.0.0 | 1.0.4 | `sites-10` |
| Sites 10.0 UX Update | 2.0.3 | 1.2.1 | 3.0.0 | 1.1.3 | `sites-10-ux-update` |
| Sites 10.1 (10.1.1) | 3.1.0 | 2.1.0 | 4.1.0 | 1.2.2 | `sites-10.1` |
| Sites 10.1 (10.1.2) | 3.2.0 | 2.2.0 | 4.2.0 | 1.2.3 | `sites-10.1` |
| Sites 10.1 (10.1.3) | 3.3.0 | 2.3.0 | 4.2.0 | 1.2.4 | `sites-10.1` |
| Sites 10.1 (10.1.3.45362) **latest** | 3.4.0 | 2.3.1 | 4.2.0 | 1.2.5 | `sites-10.1` |

## REST API version

| Experience Space | open-api-client | REST API |
|------------------|-----------------|----------|
| 10.0 / UX Update | 3.0.0+ | v2 |
| 10.1+ | 4.0.0+ | v3 |

## API docs alignment

- `apiDocsAligned: true` for Sites 10.1.x — API docs submodule matches package APIs
- Older versions (`sites-10`, `sites-10-ux-update`): prefer example patterns from that folder; treat API docs as reference only

## Hotfix / npm tag caveats

- `develop` branch rows have unresolved versions — agent uses latest published row
- Non-`latest` npm tags may apply for hotfix scenarios; pin exact versions from the table above
- `open-api-client` stable at `4.2.0` since 10.1.2

## Deprecated API replacements (10.1+)

- `getAppData` → `getUserSettings`
- `getCheckedOutItems` → `getLockedItems`
