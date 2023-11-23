import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';
import { DateFieldDefinition } from '@tridion-sites/models';

import { DateField } from './DateField';

export interface GuidedFieldConfig {
    targetSchemaId: string | null;
}

/**
 * Adds a custom presentation to a Date field.
 * By default, this extension will be applied to all Date fields, irrespective of the schema.
 * Optionally, it can accept a schema ID parameter to restrict its scope.
 */
export const addDateField = (builder: ExtensionBuilder) => {
    builder.contentEditor.addFormField(() => ({
        id: 'dateField',
        component: DateField,
        useFormField: ({ fieldDefinition }) => {
            const componentEditor = useOptionalComponentEditor();
            /**
             * Obtains the configuration for the current extension from
             * the "date-field-addon.config.json" file within the addon.
             */
            const configuration = getConfiguration<GuidedFieldConfig>();
            const targetSchemaId = configuration?.targetSchemaId;
            const isSchemaSupported = targetSchemaId ? componentEditor?.schema.id.asString === targetSchemaId : true;

            return {
                isAvailable: isSchemaSupported && fieldDefinition instanceof DateFieldDefinition,
            };
        },
    }));
};
