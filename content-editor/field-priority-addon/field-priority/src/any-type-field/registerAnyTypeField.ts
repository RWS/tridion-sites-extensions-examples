import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { EmbeddedSchemaFieldDefinition } from '@tridion-sites/models';

import { InputField } from './InputField';

export const registerAnyTypeField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'anyTypeField',
        component: InputField,
        useFormField: ({ fieldDefinition }) => {
            return {
                priority: 1,
                /**
                 * Makes it applicable to all field types, except for embedded fields.
                 */
                isAvailable: !(fieldDefinition instanceof EmbeddedSchemaFieldDefinition),
            };
        },
    }));
};
