# Tridion Sites extension examples

This repository contains examples of extensions for Tridion Sites.
It covers different extension points and also demonstrates usage of a wide range of hooks, components and utility methods.

## Running an example

After checking out the repo navigate into the folder with the example that you are interested it, i.e:

```bash
$ cd ./activities-explorer/simple-action-addon/hello-action
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
| Remove wrapping paragraph for single-line text in RTF content | [rtf-remove-single-line-wrapping-paragraph-addon](./content-editor/rtf-remove-single-line-wrapping-paragraph-addon/) |
| Select with predefined list of colors                         | [color-select-addon](./content-editor/color-select-addon/)                                                           |
| Select with options from 3rd party API                        | [external-data-select-addon](./content-editor/external-data-select-addon/)                                           |
| Field with guide message                                      | [guided-field-addon](./content-editor/guided-field-addon/)                                                           |
| Text field that shows how many symbols left                   | [limited-length-field-addon](./content-editor/limited-length-field-addon/)                                           |

### Content Explorer

| Operation                                               | Example                                                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Simple action                                           | [simple-action-addon](./content-explorer/simple-action-addon/)                                              |
| Action with a mutation                                  | [action-with-mutation-addon](./content-explorer/action-with-mutation-addon/)                                |
| Toolbar customization                                   | [customize-table-toolbar-addon](./content-explorer/customize-table-toolbar-addon/)                          |
| Context menu customization                              | [customize-table-context-menu-addon](./content-explorer/customize-table-context-menu-addon/)                |
| Column with a link to the other part of the application | [linked-schema-column-addon](./content-explorer/linked-schema-column-addon/)                                |
| Column with custom rendering                            | [linked-schema-column-addon](./content-explorer/linked-schema-column-addon/)                                |
| Context menu customization                              | [content-explorer-tree-customize-context-menu-addon](./content-explorer-tree-customize-context-menu-addon/) |

### Activities Explorer

| Operation                                               | Example                                                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Simple action                                           | [simple-action-addon](./activities-explorer/simple-action-addon/)                               |
| Toolbar customization                                   | [customize-table-toolbar-addon](./activities-explorer/customize-table-toolbar-addon/)           |
| Context menu customization                              | [customize-table-context-menu-addon](./activities-explorer/customize-table-context-menu-addon/) |
| Column with a link to the other part of the application | [work-items-column-addon](./activities-explorer/work-items-column-addon/)                       |

### Translations

| Operation                                                | Example                                                                                                                                                                                 |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add translations and use their values as controls labels | [content-explorer-simple-action-addon](./content-explorer/simple-action-addon/confirm-say-hello-notification-action/src/PushHelloNotificationAction/addPushHelloNotificationAction.tsx) |

### Misc

| Operation                                               | Example                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Using addon configuration                               | [content-editor-color-picker-field-addon](./content-editor/color-picker-field-addon/) |
| Using CSS modules for styling                           | [async-page-addon](./primary-navigation/async-page-addon/)                            |
| Show a notification that is saved to the message center | [activities-explorer-simple-action-addon](./activities-explorer/simple-action-addon/) |
| Show a confirmation dialog                              | [content-explorer-simple-action-addon](./content-explorer/simple-action-addon/)       |
