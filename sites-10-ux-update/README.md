# Tridion Sites 10 UX update extension examples

## Running an example

1. Make sure the target environment allows requests to be made from custom subdomains (the local development domain should match your certificate common name). Customer instances hosted in the cloud (with domain tridion.sdlproducts.com) should be able to access `{local}.tridion.sdlproducts.com` using the default wildcard HTTPS certificate (`*.tridion.sdlproducts.com`). For other deployment scenarios (e.g., on-premise) you will need to adjust your HTTPS certificate to include the desired subdomain or use an allowed value within your configuration.

2. Configure a redirect URL in Access Management:

```
{protocol}://{localhost}:{port}/ui/signin-oidc

// Example using defaults: http://localhost:3000/ui/signin-oidc
// Cloud customers: https://local.tridion.sdlproducts.com/ui/signin-oidc
```

where the `protocol` (i.e., http/https) should match that used for the targeted environment.

3. Check out the repository and navigate into the folder with the example that you are interested in, e.g.,

```bash
$ cd ./primary-navigation/async-page-addon/async-page
```

4. In the extension's `package.json` file, locate the `scripts.dev` key and edit the value, replacing `http://0.0.0.0:8080` with the address of the Tridion instance that you wish to target.

5. Inside `devServer.js` update your `host` constant to hostname you would like/allowed to use. The port number can be adjusted here as well if needed.

```
// From:
const port = 3000;
const host = `localhost:${port}`;
// To:
const port = 3000;
const host = `local.tridion.sdlproducts.com:${port}`;
```

6. In `C:/Windows/System32/drivers/etc/host` (`/private/etc/hosts` on macOS) file add your host domain name from step 5, like so:

```
127.0.0.1 local.tridion.sdlproducts.com
```

7. Install the necessary dependencies

```bash
$ npm install
```

8. Run the example

```bash
$ npm run dev
```

9. If you would like to package an extension for uploading to a server via the Add-ons Service, run

```bash
$ npm run pack
```

Further information about creating, building, and packing Tridion Sites Experience Space extensions, please refer to

https://www.npmjs.com/package/@tridion-sites/extensions-cli

## Extension points

### Primary Navigation

| Operation                                                 | Example                                                                        |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Navigation item with restricted access                    | [restricted-page-addon](./primary-navigation/restricted-page-addon/)           |
| Dynamic navigation item that depends on the async request | [async-page-addon](./primary-navigation/async-page-addon/)                     |
| Navigation items customization                            | [customize-navigation-addon](./primary-navigation/customize-navigation-addon/) |
| Publish transactions navigation item                      | [publish-transactions-addon](./primary-navigation/publish-transactions-addon/) |
| Classic UI navigation item                                | [classic-ui-addon](./primary-navigation/classic-ui-addon/)                     |

### Content Editor

| Operation                                                     | Example                                                                                                              |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Color picker field customization                              | [color-picker-field-addon](./content-editor/color-picker-field-addon/)                                               |
| Date field customization                                      | [date-field-addon](./content-editor/date-field-addon/)                                                               |
| Multiple overlapping extensions for the same field            | [field-priority-addon](./content-editor/field-priority-addon/)                                                       |
| Customization of the RTF field using custom plugin            | [rtf-plugin-color-text-addon](./content-editor/rtf-plugin-color-text-addon/)                                         |
| Customization of the RTF field using built-in plugin          | [rtf-plugin-wordcount-addon](./content-editor/rtf-plugin-wordcount-addon/)                                           |
| Customization of the RTF field styles format dropdown options | [rtf-customize-format-styles-addon](./content-editor/rtf-customize-format-styles-addon/)                             |
| Remove wrapping paragraph for single-line text in RTF content | [rtf-remove-single-line-wrapping-paragraph-addon](./content-editor/rtf-remove-single-line-wrapping-paragraph-addon/) |
| Select with predefined list of colors                         | [color-select-addon](./content-editor/color-select-addon/)                                                           |
| Select with options from 3rd party API                        | [external-data-select-addon](./content-editor/external-data-select-addon/)                                           |
| Field with guide message                                      | [guided-field-addon](./content-editor/guided-field-addon/)                                                           |
| Text field that shows how many symbols left                   | [limited-length-field-addon](./content-editor/limited-length-field-addon/)                                           |

### Content Explorer

| Operation                                                                              | Example                                                                                      |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Simple action                                                                          | [simple-action-addon](./content-explorer/simple-action-addon/)                               |
| Action which copies ids of selected Schema items                                       | [copy-schema-item-ids-action-addon](./content-explorer/copy-schema-item-ids-action-addon/)   |
| Action with a mutation                                                                 | [action-with-mutation-addon](./content-explorer/action-with-mutation-addon/)                 |
| Actions which manage Favorites                                                         | [actions-favorites-management-addon](./content-explorer/actions-favorites-management-addon/) |
| Toolbar customization                                                                  | [customize-table-toolbar-addon](./content-explorer/customize-table-toolbar-addon/)           |
| Context menu customization                                                             | [customize-table-context-menu-addon](./content-explorer/customize-table-context-menu-addon/) |
| Column with a link to the other part of the application                                | [linked-schema-column-addon](./content-explorer/linked-schema-column-addon/)                 |
| Column that renders custom data provided by data extenders                             | [published-to-column-addon](./content-explorer/published-to-column-addon/)                   |
| Column that renders schema purpose value                                               | [schema-purpose-addon](./content-explorer/schema-purpose-addon/)                             |
| Context menu customization                                                             | [customize-tree-context-menu-addon](./content-explorer/customize-tree-context-menu-addon/)   |
| Panel that shows difference between 2 historical versions of the versioned active item | [history-diff-insights-panel-addon](./content-explorer/history-diff-insights-panel-addon/)   |
| Insight panel that shows the list of bundles the active item is a part of              | [in-bundle-insights-panel-addon](./content-explorer/in-bundle-insights-panel-addon/)         |

### Activities Explorer

| Operation                                               | Example                                                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Simple action                                           | [simple-action-addon](./activities-explorer/simple-action-addon/)                               |
| Toolbar customization                                   | [customize-table-toolbar-addon](./activities-explorer/customize-table-toolbar-addon/)           |
| Context menu customization                              | [customize-table-context-menu-addon](./activities-explorer/customize-table-context-menu-addon/) |
| Column with a link to the other part of the application | [work-items-column-addon](./activities-explorer/work-items-column-addon/)                       |

### Translations

| Operation                                                | Example                                                                                                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Add translations and use their values as controls labels | [content-explorer-simple-action-addon](./content-explorer/simple-action-addon/hello-action/src/helloAction/registerHelloAction.tsx) |

### Misc

| Operation                                               | Example                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Using addon configuration                               | [content-editor-color-picker-field-addon](./content-editor/color-picker-field-addon/) |
| Using CSS modules for styling                           | [async-page-addon](./primary-navigation/async-page-addon/)                            |
| Show a notification that is saved to the message center | [activities-explorer-simple-action-addon](./activities-explorer/simple-action-addon/) |
| Show a confirmation dialog                              | [content-explorer-simple-action-addon](./content-explorer/simple-action-addon/)       |
| Using frontend and backend extensions together          | [published-to-column-addon](./content-explorer/published-to-column-addon/)            |

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
