import { useCallback } from 'react';
import type { Editor } from 'tinymce';

import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';
import { XhtmlFieldDefinition } from '@tridion-sites/models';

/**
 * By default, TinyMCE wraps the content in a <p> tag, even for single-line text.
 * This function removes the wrapping <p> tag, but only when there is a single <p> tag (i.e., one line of content).
 */
const removeWrappingParagraphForSingleLine = (html: string) => {
    const root = /^<p>(.*?)<\/p>$/gi;
    if (root.test(html)) {
        const paragraphs = html.match(/<p>/gi);
        if (paragraphs && paragraphs.length === 1) {
            return html.replace(root, '$1');
        }
    }
    return html;
};

/**
 * Removes a wrapping paragraph for single-line text in the RTF.
 */
export const removeSingleLineWrappingParagraph = (builder: ExtensionBuilder) => {
    builder.contentEditor.richTextField.customize({
        id: 'rtfRemoveSingleLineWrappingParagraph',
        useRichTextField: ({ fieldDefinition }) => {
            const componentEditor = useOptionalComponentEditor();

            const setup = useCallback((editor: Editor) => {
                editor.on('getcontent', (event: any) => {
                    event.content = removeWrappingParagraphForSingleLine(event.content);
                });
            }, []);

            if (!componentEditor) {
                return {
                    isAvailable: false,
                };
            }

            return {
                setup,
                isAvailable: fieldDefinition instanceof XhtmlFieldDefinition,
            };
        },
    });
};
