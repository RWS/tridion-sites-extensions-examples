import { useCallback } from 'react';
import type { Editor } from 'tinymce';

import type { ExtensionBuilder} from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';
import { XhtmlFieldDefinition } from '@tridion-sites/models';

/**
 * TinyMCE always adds a <p> tag around the content, even when it's a single line
 * In the Classic UI we do not do this, unless you press enter and create another
 * paragraph. This converter can be used to work around this behavior by stripping
 * out the wrapping <p> tag, but only when there is a single <p> tag (one line of
 * content).
 */
export const removeWrappingParagraph = (html: string) => {
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
 * This extension enables the removal of paragraph wrapping for single-line text within the RTF editor.
*/
export const removeSingleLineWrappingParagraph = (builder: ExtensionBuilder) => {
    builder.contentEditor.richTextField.customize({
        id: 'rtfRemoveSingleLineWrappingParagraph',
        useRichTextField: ({ fieldDefinition }) => {
            const componentEditor = useOptionalComponentEditor();

            const setup = useCallback((editor: Editor) => {
                editor.on('getcontent', (event: any) => {
                    event.content = removeWrappingParagraph(event.content);
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
