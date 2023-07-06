import { useCallback } from 'react';
import type { RawEditorOptions } from 'tinymce';

import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';
import { XhtmlFieldDefinition } from '@tridion-sites/models';

import { colorTextPlugin, rtfColorTextMenuButtonId } from './colorTextPlugin';

/**
 * This extension expands the functionality of the RTF by introducing a menu within the RTF editor,
 * enabling the modification of text color.
 */
export const addRTFColorText = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        actionLabel: 'Color Me',
        pinkLabel: 'Pink',
        blueLabel: 'Blue',
    });

    /**
     * The provided code snippet registers a plugin but does not automatically apply it.
     * To apply the plugin, it needs to be added to the configuration.
     */
    builder.contentEditor.richTextField.registerPlugin({
        id: rtfColorTextMenuButtonId,
        plugin: colorTextPlugin,
    });

    builder.contentEditor.richTextField.customize({
        id: 'rtfColorText',
        useRichTextField: ({ fieldDefinition }) => {
            const componentEditor = useOptionalComponentEditor();

            /**
             * Adds the registered plugin to the configuration.
             * For more details, please refer to the TinyMCE documentation.
             * https://www.tiny.cloud/docs/tinymce/6/creating-a-plugin/
             */
            const customize = useCallback((config: RawEditorOptions) => {
                if (Array.isArray(config.plugins)) {
                    config.plugins.push(rtfColorTextMenuButtonId);
                }
                config.toolbar = `${rtfColorTextMenuButtonId} | ${config.toolbar as string}`;
            }, []);

            if (!componentEditor) {
                return {
                    isAvailable: false,
                };
            }

            return {
                customize,
                isAvailable: fieldDefinition instanceof XhtmlFieldDefinition,
            };
        },
    });
};
