import { useCallback } from 'react';
import type { RawEditorOptions } from 'tinymce';

import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';
import { XhtmlFieldDefinition } from '@tridion-sites/models';

import { colorTextPlugin, colorTextMenuButtonId } from './colorTextPlugin';

/**
 * Enhances the functionality of the RTF by introducing a menu that enables users to modify the text color.
 */
export const addColorTextPlugin = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        actionLabel: 'Color Me',
        pinkLabel: 'Pink',
        blueLabel: 'Blue',
    });

    /**
     * Registers a plugin but does not automatically apply it.
     * To apply the plugin, it needs to be added to the configuration.
     */
    builder.contentEditor.richTextField.registerPlugin({
        id: colorTextMenuButtonId,
        plugin: colorTextPlugin,
    });

    builder.contentEditor.richTextField.customize({
        id: 'colorText',
        useRichTextField: ({ fieldDefinition }) => {
            const componentEditor = useOptionalComponentEditor();

            /**
             * Adds the registered plugin to the configuration.
             * For more details, please refer to the TinyMCE documentation.
             * https://www.tiny.cloud/docs/tinymce/6/creating-a-plugin/
             */
            const customize = useCallback((config: RawEditorOptions) => {
                if (Array.isArray(config.plugins)) {
                    config.plugins.push(colorTextMenuButtonId);
                }
                config.toolbar = `${colorTextMenuButtonId} | ${config.toolbar as string}`;
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
