import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { ColorPicker } from './ColorPicker';

export interface GuidedFieldConfig {
    targetFieldName: string;
}

/**
 * Adds a custom color picker control to the field that corresponds to the specified field name in the configuration.
 */
export const addColorPickerField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'colorPickerField',
        component: ColorPicker,
        useFormField: ({ fieldDefinition }) => {
            /**
             * Obtains the configuration for the current extension from
             * the "color-picker-field-addon.config.json" file within the addon.
             */
            const configuration = getConfiguration<GuidedFieldConfig>();
            const targetFieldName = configuration?.targetFieldName || '';

            return {
                isAvailable: fieldDefinition.name === targetFieldName,
            };
        },
    }));
};
