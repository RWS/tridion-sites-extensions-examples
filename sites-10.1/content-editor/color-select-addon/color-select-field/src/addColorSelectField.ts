import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';

import { ColorSelectField } from './ColorSelectField';

export interface ExtensionConfiguration {
    targetFieldCustomUrl: string;
}

/**
 * Color select expects valid hex color values as the options for this field.
 */
export const addColorSelectField = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        colorSelect: {
            placeholder: 'Select the color',
            notFound: 'List is empty',
        },
    });

    builder.contentEditor.addFormField(() => ({
        /**
         * Component that will be rendered instead of the original field.
         * The list of values for the dropdown to select from can be set in the item's Schema.
         */
        component: ColorSelectField,
        id: 'colorSelectField',
        /**
         * Using this hook you can decide whether a custom component should be rendered instead of the original field.
         * You can use contextual information (like `useOptionalComponentEditor` hook to make sure you are in the specific editor or it has the desired state)
         * or Field Definition to calculate availability.
         */
        useFormField: ({ fieldDefinition }) => {
            const componentEditor = useOptionalComponentEditor();
            /**
             * User can specify a custom URL of a target field in Addon's configuration.
             * We can get value from the configuration to compare it to every field mounted in the editor.
             */
            const configuration = getConfiguration<ExtensionConfiguration>();
            const targetCustomUrl = configuration?.targetFieldCustomUrl;

            /**
             * In case `componentEditor` is not available that means we are not inside the component editor and our custom field should not be applied.
             */
            if (!componentEditor) return { isAvailable: false };

            return {
                isAvailable:
                    !!fieldDefinition.customUrl && !!targetCustomUrl && fieldDefinition.customUrl === targetCustomUrl,
            };
        },
    }));
};
