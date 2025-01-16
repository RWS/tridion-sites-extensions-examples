# Tridion Sites 10.1 extension examples

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
| Action with reusable Modal component, action to start new Workflow Task                | [xs-create-workflow-task-addon](./content-explorer/xs-create-workflow-task-addon/)           |

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

## Migration from [Sites 10 UX update](../sites-10-ux-update/)

### 1. Infrastructure

Since some of updated dependencies of Extension API framework have breaking changes, these dependencies should be updated in your Extension.

```json
/// \package.json

    // Before
    "@tridion-sites/extensions": "2.0.0",
    "@tridion-sites/extensions-cli": "1.1.0",
    "@tridion-sites/models": "1.1.0",
    "@tridion-sites/open-api-client": "3.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "styled-components": "5.3.6",
    "tinymce": "6.7.1"

    // After
    "@tridion-sites/extensions": "3.0.0",
    "@tridion-sites/extensions-cli": "1.2.0",
    "@tridion-sites/models": "2.0.0",
    "@tridion-sites/open-api-client": "4.0.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "styled-components": "6.1.13",
    "tinymce": "7.3.0"
```

### 2. Codebase

#### @tridion-sites/open-api-client

In Tridion Sites 10.1, a new V3 API version is introduced. The existing V1 and V2 API versions are still supported and fully backwards compatible. Here is mapping of open-api-client version and API version it uses:

| Experience Space version | @tridion-sites/open-api-client | REST API version |
| ------------------------ | ------------------------------ | ---------------- |
| 10.0                     | 3.0.0                          | v2               |
| 10.1                     | 4.0.0                          | v3               |

In V3 there are 2 endpoints that were removed, therefore you should replace them in your codebase:

- `ApplicationDataService.getAppData()`, can be replaced with `SettingsService.getUserSettings()` or `SettingsService.getApplicationSettings()`
- `ListService.getCheckedOutItems()`, can be replaced with `ListService.getLockedItems()`

The primary changes in version 3 involve new error handling mechanisms and a different return type for failure cases. For more information, please refer to the OpenAPI release notes and documentation.

#### @tridion-sites/models

Mapping for content and metadata fields of items has been changed; the results of this mapping are different in some specific cases.
Action is to make sure all the items with `content` or\and `metadata` fields are handled properly when mapping backend response with `mapToModel()` or items returned by queries and mutations.
New mapping handles recursive mapping of values down the field (content\metadata). And instead of raw backend object you should now get mapped `Link` class instance.

```typescript
// ================= BEFORE =================

// Component instance from mapping:
{
  id: TcmUri,
  title: 'Component 1',
  ...,
  metadata: {
    textField: 'Text value',
    numberField: 1,
    componentLinkField: {
      $type: "Link",
      IdRef: 'tcm:1-1',
      Title: 'Linked component',
    },
  }
}

// usage
console.log(item.metadata.textField) // 'Text value'
console.log(item.metadata.componentLinkField.IdRef) // 'tcm:1-1'

// ================= AFTER =================

// Component instance from mapping:
{
  id: TcmUri,
  title: 'Component 1',
  ...,
  metadata: {
    textField: 'Text value',
    numberField: 1,
    componentLinkField: Link,
  }
}

// usage
console.log(item.metadata.textField) // 'Text value'
console.log(item.metadata.componentLinkField.idRef.asString) // 'tcm:1-1'

```

#### @tridion-sites/extensions

TinyMCE has been updated to v7.3.0. Please check the official changelog for major updates: https://www.tiny.cloud/docs/tinymce/latest/changelog/#7-0-0-2024-03-20
Potential changes required for existing extension will depend on tiny API usage in it.

---

`useEditor` hook has new return type. You should adjust places where you rely on schema presence returned by `useEditor` hook, now it can be `undefined`.

```typescript
// ================= BEFORE =================
export interface EditorHookResult {
  item:
    | Bundle
    | KeywordCategory
    | Component
    | MultimediaComponent
    | Folder
    | Keyword
    | Page
    | StructureGroup;
  schema: Schema;
  isChanged: boolean;
  isEditing: boolean;
}

// usage
const { schema } = useEditor();

console.log(schema.id.asString);

// ================= AFTER =================
export interface EditorHookResult {
  item:
    | Bundle
    | KeywordCategory
    | Component
    | MultimediaComponent
    | Folder
    | Keyword
    | Page
    | StructureGroup;
  schema: Schema | undefined;
  isChanged: boolean;
  isEditing: boolean;
  onUpdate: (
    item:
      | Bundle
      | KeywordCategory
      | Component
      | MultimediaComponent
      | Folder
      | Keyword
      | Page
      | StructureGroup
  ) => void;
}

// usage
const { schema } = useEditor();

console.log(schema?.id.asString);
```

---

Update of `react-query` package to v5. There are many api changes, both arguments for queries and mutations and return type. Required changes for existing extension purely depends on API usage. We strongly recommend reading the official migration plan for major update: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5.

Worth noting that loading state and its shorthands (`isLoading`, `isPending`, `isInitialLoading`, etc) have been changed so make sure you adjusted them in your code.

Parameters for OpenAPI requests have not been changed (like `itemId`, `useDynamicVersion`, etc), only additional options that passed down to `react-query`.

One of the examples:

```typescript
// ================= BEFORE =================
const { data, isLoading, isError } = useContainerItemsQuery({
  itemId,
});

// ================= AFTER =================
const {
  data,
  isPending, // `isLoading` is replaced with `isPending`
  isError,
} = useContainerItemsQuery({
  itemId,
});
```

---

Deprecation of `containerId` parameter for some mutations. Parameter has been replaced with `containerItem`. Please make sure you updated parameter when using mutations from the list:

- `useAutoClassifyItemsMutation`
- `useDeleteItemsMutation`
- `useFinishEditingItemsMutation`
- `useLocalizeItemsMutation`
- `useRevertItemsMutation`
- `useUnlocalizeItemsMutation`

```typescript
// ================= BEFORE =================
const { mutateAsync: unlocalizeItemMutation } = useUnlocalizeItemMutation();

try {
  const unlocalizedItem = await unlocalizeItemMutation(
    { itemId, containerId },
    { onSuccess }
  );
} catch (error) {
  // error handling
}

// ================= AFTER =================
const { mutateAsync: unlocalizeItemMutation } = useUnlocalizeItemMutation();

try {
  const unlocalizedItem = await unlocalizeItemMutation(
    { itemId, containerItem },
    { onSuccess }
  );
} catch (error) {
  // error handling
}
```

---

Alignment of hooks API. `useConfirmation()` hook now returns different type of result. Make sure you updated it's usage.

```typescript
// ================= BEFORE =================
const open = useConfirmation();

// ================= AFTER =================
const { open } = useConfirmation();
```

---

`useUserProfile` has new return type `userProfile` can be `undefined` in some instances.

```typescript
// ================= BEFORE =================
const { userProfile } = useUserProfile();

return (
  <span className="userProfile__name" title={userProfile.displayName}>
    {userProfile.displayName}
  </span>
);

// ================= AFTER =================
const { userProfile } = useUserProfile();

if (userProfile === undefined) {
  return null;
}

return (
  <span className="userProfile__name" title={userProfile.displayName}>
    {userProfile.displayName}
  </span>
);
```
