import type { Editor } from 'tinymce';

import { t } from '@globals';

export const colorTextCommandId = 'colorTextCommand';
export const colorTextMenuButtonId = 'colorTextMenuButton';

export const colorTextPlugin = (editor: Editor) => {
    /**
     * Adds a custom command to the editor, allowing users to modify the color of the selected text.
     * For more details, please refer to the TinyMCE documentation.
     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.editor/#addCommand
     */
    editor.addCommand(colorTextCommandId, (ui, color: string) => {
        const value = editor.selection.getContent({ format: 'html' });
        editor.selection.setContent(`<span style="color:${color};">${value}</span>`);
    });

    /**
     * Registers a new menu button that provides users with the ability to change the color
     * of the selected text to either blue or pink.
     * For more details, please refer to the TinyMCE documentation.
     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.editor.ui.registry/#addMenuButton
     */
    editor.ui.registry.addMenuButton(colorTextMenuButtonId, {
        text: t('actionLabel'),
        fetch: callback => {
            const items: Parameters<typeof callback>[0] = [
                {
                    type: 'menuitem',
                    text: t('blueLabel'),
                    /**
                     * Executes the previously added command to modify the color of the selected text to blue.
                     * For more details, please refer to the TinyMCE documentation.
                     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.root/#execCommand
                     */
                    onAction: () => editor.execCommand(colorTextCommandId, false, '#6699CC'),
                },
                {
                    type: 'menuitem',
                    text: t('pinkLabel'),
                    /**
                     * Executes the previously added command to modify the color of the selected text to pink.
                     * For more details, please refer to the TinyMCE documentation.
                     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.root/#execCommand
                     */
                    onAction: () => editor.execCommand(colorTextCommandId, false, 'hotpink'),
                },
            ];

            callback(items);
        },
    });
};
