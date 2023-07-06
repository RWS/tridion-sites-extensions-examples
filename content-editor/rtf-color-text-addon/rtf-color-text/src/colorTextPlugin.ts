import type { Editor } from 'tinymce';

import { t } from '@globals';

export const rtfColorTextCommandId = 'rtfColorTextCommand';
export const rtfColorTextMenuButtonId = 'rtfColorTextMenuButton';

export const colorTextPlugin = (editor: Editor) => {
    /**
     * Adds a custom command to the editor, enabling the ability to modify the color of the text.
     * For more details, please refer to the TinyMCE documentation.
     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.editor/#addCommand
     */
    editor.addCommand(rtfColorTextCommandId, (ui, color: string) => {
        const value = editor.selection.getContent({ format: 'html' });
        editor.selection.setContent(`<span style="color:${color};">${value}</span>`);
    });

    /**
     * Registers a new menu button that provides multiple options for executing
     * the custom command with different parameters.
     * For more details, please refer to the TinyMCE documentation.
     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.editor.ui.registry/#addMenuButton
     */
    editor.ui.registry.addMenuButton(rtfColorTextMenuButtonId, {
        text: t('actionLabel'),
        fetch: callback => {
            const items: Parameters<typeof callback>[0] = [
                {
                    type: 'menuitem',
                    text: t('blueLabel'),
                    /**
                     * Executes the previously added command to modify the text color to a specific value.
                     * For more details, please refer to the TinyMCE documentation.
                     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.root/#execCommand
                     */
                    onAction: () => editor.execCommand(rtfColorTextCommandId, false, '#6699CC'),
                },
                {
                    type: 'menuitem',
                    text: t('pinkLabel'),
                    /**
                     * Executes the previously added command to modify the text color to a specific value.
                     * For more details, please refer to the TinyMCE documentation.
                     * https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.root/#execCommand
                     */
                    onAction: () => editor.execCommand(rtfColorTextCommandId, false, 'hotpink'),
                },
            ];

            callback(items);
        },
    });
};
