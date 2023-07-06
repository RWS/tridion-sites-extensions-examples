import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { EmbeddedSchemaFieldDefinition } from '@tridion-sites/models';

import { InputField } from './InputField';

export const addAnyTypeField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'anyTypeField',
        component: InputField,
        useFormField: ({ fieldDefinition }) => {
            return {
                priority: 1,
                isAvailable: !(fieldDefinition instanceof EmbeddedSchemaFieldDefinition),
            };
        },
    }));
};
