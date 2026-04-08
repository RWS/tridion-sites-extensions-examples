import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { MultimediaLinkFieldDefinition } from '@tridion-sites/models';

import { Field } from './Field';

const id = 'multiselect-field-extension';

interface ExtensionConfiguration {
    priority: number;
}

export const registerMultiselectField = (builder: ExtensionBuilder) => {
    const config = getConfiguration<ExtensionConfiguration>();

    builder.contentEditor.addMultivalueFormField(() => ({
        component: Field,
        id,
        useFormField: ({ fieldDefinition }) => {
            return {
                isAvailable: fieldDefinition instanceof MultimediaLinkFieldDefinition,
                priority: config?.priority,
            };
        },
    }));
};
