# Tridion Sites 10 UX update extension examples

## Running an example

After checking out the repository navigate into the folder with the example that you are interested in, i.e:

```bash
$ cd ./primary-navigation/async-page-addon/async-page
```

Update `target=` argument in `scripts/dev` in `package.json` to the environment that you want to target.

Install the necessary dependencies

```bash
$ npm install
```

Run the example

```bash
$ npm run dev
```

## Note

All examples use http://0.0.0.0:8080 as the target environment.
Before running an example don't forget to change this value in `package.json` to a compatible Tridion Sites environment that you want to target.

## Extension points

### Primary Navigation

| Operation                                                 | Example                                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Dynamic navigation item that depends on the async request | [async-page-addon](./sites-10-ux-update/primary-navigation/async-page-addon/) |

## Migration from [Sites 10](../sites-10/)

### 1. Infrastructure

Since some of updated dependencies of Extension API framework have breaking changes, these dependencies should be updated in your Extension.

```json
/// \package.json

    // Before
    "@tridion-sites/extensions": "1.0.3",
    "@tridion-sites/extensions-cli": "1.0.4",
    "@tridion-sites/models": "1.0.0",
    "@tridion-sites/open-api-client": "2.0.0",
    "tinymce": "6.4.2"

    // After
    "@tridion-sites/extensions": "2.0.0",
    "@tridion-sites/extensions-cli": "1.1.0",
    "@tridion-sites/models": "1.1.0",
    "@tridion-sites/open-api-client": "3.0.0",
    "tinymce": "6.7.1"
```

(optional) For serving live addons together with local addons `targetUrl` can be passed to `setupExtensionsResponse`.

```javascript
/// \devServer.js

// before
setupExtensionsResponse({
  app,
  webAppPath,
  manifestPath,
  addonConfigPath,
});

// after
setupExtensionsResponse({
  app,
  webAppPath,
  manifestPath,
  addonConfigPath,
  targetUrl,
});
```

### 2. Codebase

If OpenAPI services are used in your extension, you should update any calls that have parameters.
In particular, replace any comma-separated parameters with an object of named properties when calling methods of any OpenAPI service.

```typescript
// Before (actual names might be different, for example only)
ListsService.getLockedItems(forAllUsers, lockFilter, lockResult, maxResults);
WorkflowService.listActivityInstances(
  forAllUsers,
  activityStates,
  processDefinitionId
);

// After
ListsService.getLockedItems({
  forAllUsers,
  lockUserId,
  lockFilter,
  lockResult,
  maxResults,
});
WorkflowService.listActivityInstances({
  forAllUsers,
  ownerId,
  assigneeId,
  activityStates,
  processDefinitionId,
});
```
