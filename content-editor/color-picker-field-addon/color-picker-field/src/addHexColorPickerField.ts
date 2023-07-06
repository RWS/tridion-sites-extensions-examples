import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { HexColorPicker } from './HexColorPicker';

export interface GuidedFieldConfig {
    targetFieldName: string;
}

/**
 * This extension enables the selection of a color for a field that meets specified conditions,
 * incorporating a custom control.
 */
export const addHexColorPickerField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'hexColorPickerField',
        component: HexColorPicker,
        useFormField: ({ fieldDefinition }) => {
            /**
             * Obtains the configuration for the current extension from
             * the "color-picker-field-addon.config.json" file within the addon.
             */
            const configuration = getConfiguration<GuidedFieldConfig>();
            const targetFieldName = configuration?.targetFieldName || '';

            return {
                priority: 1,
                isAvailable: fieldDefinition.name === targetFieldName,
            };
        },
    }));
};
