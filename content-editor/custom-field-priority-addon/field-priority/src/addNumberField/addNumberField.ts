import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { NumberFieldDefinition } from '@tridion-sites/models';

import { NumberField } from './NumberField';

export const addNumberField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'numberField',
        component: NumberField,
        useFormField: ({ fieldDefinition }) => {
            return {
                priority: 2,
                isAvailable: fieldDefinition instanceof NumberFieldDefinition,
            };
        },
    }));
};
