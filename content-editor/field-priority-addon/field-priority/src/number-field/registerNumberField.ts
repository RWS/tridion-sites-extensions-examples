import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { NumberFieldDefinition } from '@tridion-sites/models';

import { NumberField } from './NumberField';

export const registerNumberField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'numberField',
        component: NumberField,
        useFormField: ({ fieldDefinition }) => {
            return {
                priority: 2,
                /**
                 * Specifically applies to number fields.
                 */
                isAvailable: fieldDefinition instanceof NumberFieldDefinition,
            };
        },
    }));
};
