import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { NumberFieldDefinition } from '@tridion-sites/models';

import { NumberField } from './NumberField';

export const addNumberField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'numberField',
        component: NumberField,
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
                priority: 2,
                /**
                 * Specifically applies to number fields.
                 */
                isAvailable: fieldDefinition instanceof NumberFieldDefinition,
            };
        },
    }));
};
