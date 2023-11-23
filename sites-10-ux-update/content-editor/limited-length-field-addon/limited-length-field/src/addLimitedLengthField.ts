import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { SingleLineTextFieldDefinition } from '@tridion-sites/models';

import { LimitedLengthField } from './LimitedLengthField';

/**
 * This example consumes the max length constraint for the text type field.
 * More about this type of constraint: https://docs.rws.com/1099765/101986/tridion-sites-10-main-documentation/constraining-field-content.
 */
export const addLimitedLengthField = (builder: ExtensionBuilder) => {
    /**
     * `t()` function can accept variables to render as part of a string literal defined in translations.
     * Variables are mapped by names in `{{}}`.
     */
    builder.translations.addTranslation('en', {
        leftLengthMessage: '{{length}} character(s) remaining',
        overLengthMessage: 'Limit exceeded, please remove {{length}} character(s)',
    });

    builder.contentEditor.addFormField(() => ({
        /**
         * Component that will be rendered instead of the original field.
         */
        component: LimitedLengthField,
        id: 'limitedLengthField',
        /**
         * Using this hook you can decide whether a custom component should be rendered instead of the original field.
         * You can use contextual information (like `useOptionalComponentEditor` hook to make sure you are in the specific editor or it has the desired state)
         * or Field Definition to calculate availability.
         */
        useFormField: ({ fieldDefinition }) => {
            const isSinglelineText = fieldDefinition instanceof SingleLineTextFieldDefinition;

            /**
             * Extension field should be available only if the field has a single line of text and has a length constraint set.
             */
            return {
                isAvailable: isSinglelineText && fieldDefinition.maxLength !== undefined,
            };
        },
    }));
};
