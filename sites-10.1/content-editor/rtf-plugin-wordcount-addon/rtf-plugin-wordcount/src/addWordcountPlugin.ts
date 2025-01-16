import { useCallback } from 'react';
import type { RawEditorOptions } from 'tinymce';

import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useUserProfile } from '@tridion-sites/extensions';

/**
 * Enables the utilization of the 'wordcount' plugin for TinyMCE.
 * https://www.tiny.cloud/docs/tinymce/6/wordcount/
 */
export const addWordcountPlugin = (builder: ExtensionBuilder) => {
    builder.contentEditor.richTextField.customize({
        id: 'wordCount',
        useRichTextField: () => {
            const { userProfile } = useUserProfile();

            /**
             * Adds a plugin that enhances the functionality of the editor by introducing a word count dialog,
             * which displays the count of words and characters.
             * For more details, please refer to the TinyMCE documentation.
             * https://www.tiny.cloud/docs/tinymce/6/wordcount/
             */
            const customize = useCallback((config: RawEditorOptions) => {
                if (Array.isArray(config.plugins)) {
                    config.plugins.push('wordcount');
                }
            }, []);

            return {
                customize,
                isAvailable: !!userProfile?.runtime?.isAdministrator,
            };
        },
    });
};
