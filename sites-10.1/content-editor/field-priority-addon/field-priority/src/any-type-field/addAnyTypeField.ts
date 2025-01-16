import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { EmbeddedSchemaFieldDefinition } from '@tridion-sites/models';

import { InputField } from './InputField';

export const addAnyTypeField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'anyTypeField',
        component: InputField,
        useFormField: ({ fieldDefinition }) => {
            return {
                /**
                 * Can be used to ensure that a given field extension is rendered when there are multiple extensions
                 * that target the same field (i.e., for which useIsAvailable returns true).
                 * For example, you may have an extension that augments all single-line text fields
                 * but want to have a different extension apply to a specific field.
                 * This can be achieved by ensuring that the value of the 'priority' property of the extension
                 * you want to render is greater than that of other extensions that match the same field.
                 * If no 'priority' is specified for a field extension, the value defaults to 0.
                 */
                priority: 1,
                /**
                 * Makes it applicable to all field types, except for embedded fields.
                 */
                isAvailable: !(fieldDefinition instanceof EmbeddedSchemaFieldDefinition),
            };
        },
    }));
};
