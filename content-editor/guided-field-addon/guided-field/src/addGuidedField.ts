import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';

import { GuidedField } from './GuidedField';

export interface GuidedFieldConfig {
    targetFieldCustomUrl: string;
}

export const addGuidedField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        /**
         * Component that will be rendered instead of the original field.
         */
        component: GuidedField,
        id: 'guidedField',
        /**
         * Using this hook you can decide whether a custom component should be rendered instead of the original field.
         * You can use contextual information (like `useOptionalComponentEditor` hook to make sure you are in the specific editor or it has the desired state)
         * or Field Definition to calculate availability.
         */
        useFormField: ({ fieldDefinition }) => {
            // At this point we can be in the Editor of any type of item.
            // So to make sure this is the right place - we should check if `useOptionalComponentEditor` returns data.
            const componentEditor = useOptionalComponentEditor();
            // Getting addon configuration. `targetFieldCustomUrl` is required to be there for this Extension to work and is used to attach a custom field to.
            const configuration = getConfiguration<GuidedFieldConfig>();
            const targetCustomUrl = configuration?.targetFieldCustomUrl;

            if (!componentEditor) return { isAvailable: false };

            return {
                isAvailable:
                    !!fieldDefinition.customUrl &&
                    !!targetCustomUrl &&
                    fieldDefinition.customUrl.includes(targetCustomUrl),
            };
        },
    }));
};
