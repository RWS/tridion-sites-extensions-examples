import { useCallback } from 'react';
import type { RawEditorOptions } from 'tinymce';

import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useUserProfile } from '@tridion-sites/extensions';

/**
 * This extension enables the utilization of the TinyMCE plugin 'wordcount'.
 */
export const addRTFWordCount = (builder: ExtensionBuilder) => {
    builder.contentEditor.richTextField.customize({
        id: 'rtfWordCount',
        useRichTextField: () => {
            const { userProfile } = useUserProfile();

            /**
             * Adds a plugin that adds functionality to open a word count dialog,
             * displaying the count of words and characters.
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
                isAvailable: !!userProfile.runtime?.isAdministrator,
            };
        },
    });
};
