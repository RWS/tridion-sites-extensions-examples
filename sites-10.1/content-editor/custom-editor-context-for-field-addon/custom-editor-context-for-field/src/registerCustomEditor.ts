/**
 * registerCustomEditor.ts
 *
 * Registers two Content Editor UI contributions with the Tridion Sites host:
 *   1. A custom **item editor** that wraps the entire Content Editor view and
 *      provides a React Context (EditorContext) that child components can consume.
 *   2. A custom **form field** that reads from that context and lets the user
 *      change a shared color value.
 *
 * APIs used:
 *
 *   builder.contentEditor.addItemEditor(factory)  — ExtensionBuilder API
 *     Registers a component that wraps the whole item editor view.  The factory
 *     must return an object with:
 *       • id               — Unique string identifier for this editor contribution.
 *       • component        — React component rendered as the editor wrapper.
 *                           Receives `renderEditor` (the host's original editor
 *                           subtree) so the wrapper can choose where to place it.
 *       • useContentEditorView() — Hook called by the host to decide whether this
 *                           editor should be active (`isAvailable`) and how to
 *                           order it relative to other editors (`priority`).
 *
 *   builder.contentEditor.addFormField(factory)  — ExtensionBuilder API
 *     Registers a component that replaces or augments a form field.  The factory
 *     must return an object with:
 *       • id               — Unique string identifier for this field contribution.
 *       • component        — React component rendered in place of the field.
 *                           Receives `renderField` so the original field can still
 *                           be embedded inside the custom component.
 *       • useFormField()   — Hook called by the host to decide availability and
 *                           ordering, same shape as useContentEditorView.
 *
 *   getConfiguration()  — globals util (@tridion-sites/extensions via globals.ts)
 *     Retrieves the typed config object from the extension manifest at runtime.
 *     Here we use it to allow deployers to override the editor and field
 *     priority values without recompiling the extension.
 */
import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { EditorContextProvider } from './EditorContext';
import { Field } from './Field';

// Stable, unique IDs for each registered contribution.
const editorId = 'custom-editor-context-for-field-addon-id';
const fieldId = 'custom-editor-context-for-field-addon-field-id';

/**
 * Shape of the optional configuration block that can be provided in the
 * extension manifest to control rendering priority of each contribution.
 */
interface CustomEditorConfig {
    editorPriority: number;
    fieldPriority: number;
}

export const registerCustomEditor = (builder: ExtensionBuilder) => {
    // Read optional priority overrides from the extension configuration.
    const config: CustomEditorConfig | undefined = getConfiguration();

    // --- 1. Register the item editor wrapper ---
    // EditorContextProvider wraps the entire editor view and sets up an
    // EditorContext so that deeply nested form-field components can communicate
    // state back up.
    builder.contentEditor.addItemEditor(() => {
        return {
            component: EditorContextProvider,
            id: editorId,
            useContentEditorView: () => {
                return {
                    isAvailable: true,
                    priority: config?.editorPriority,
                };
            },
        };
    });

    // --- 2. Register the custom form field ---
    // The Field component renders alongside every field in the form.  It reads
    // EditorContext to push a color value up to the EditorContextProvider.
    builder.contentEditor.addFormField(() => ({
        id: fieldId,
        component: Field,
        useFormField: () => {
            return {
                isAvailable: true,
                priority: config?.fieldPriority,
            };
        },
    }));
};
