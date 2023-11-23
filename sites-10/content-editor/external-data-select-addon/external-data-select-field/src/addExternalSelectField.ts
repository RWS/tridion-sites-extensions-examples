import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';
import { SingleLineTextFieldDefinition } from '@tridion-sites/models';

import { ExternalSelectField } from './ExternalSelectField';

/**
 * Describing the structure of the Addon's configuration file. Make sure this maps to the real JSON file (`external-data-select-addon.config.json`).
 */
export interface ExtensionConfiguration {
    targetFieldCustomUrl: string;
}

export const addExternalSelectField = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        errorMessage: 'Error occurred while loading list',
    });

    builder.contentEditor.addFormField(() => ({
        /**
         * Component that will be rendered instead of the original field.
         */
        component: ExternalSelectField,
        id: 'externalSelectField',
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

            /**
             * Single line text can be of 2 variants, one is regular and second is with pre-defined list of options.
             * Predefined one won't let you save custom value.
             * We need to make sure it a regular type.
             */
            const isSingleLineText = fieldDefinition instanceof SingleLineTextFieldDefinition && !fieldDefinition.list;

            return {
                isAvailable:
                    !!fieldDefinition.customUrl &&
                    isSingleLineText &&
                    !!targetCustomUrl &&
                    fieldDefinition.customUrl === targetCustomUrl,
            };
        },
    }));
};
