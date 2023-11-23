import type { ChangeEvent } from 'react';
import { memo, useCallback, useMemo } from 'react';

import { t } from '@globals';
/**
 * Extensions can utilize components from other libraries. However, using Sites components can help ensure a familiar look and feel.
 */
import { TextInput } from '@mantine/core';
import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';
import { Flex, getColorPalette, Text } from '@tridion-sites/extensions';
import { SingleLineTextFieldDefinition } from '@tridion-sites/models';

export const LimitedLengthField = memo(
    ({ renderField, fieldDefinition, value, setValue, isReadOnly }: ContentEditorFormFieldExtensionProps) => {
        const remainingLength = useMemo(() => {
            // Make sure field is a single line text type.
            if (!(fieldDefinition instanceof SingleLineTextFieldDefinition)) return;
            // Make sure there is length constraint set.
            if (fieldDefinition.maxLength === undefined) return;

            return fieldDefinition.maxLength - (typeof value === 'string' ? value.length : 0);
        }, [fieldDefinition, value]);

        const isMaxLengthExceeded = remainingLength ? remainingLength < 0 : false;

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.currentTarget.value);
            },
            [setValue],
        );

        /**
         * Keep original field rendered for readonly.
         */
        if (isReadOnly) return <>{renderField}</>;
        /**
         * We need to make sure we not rendering length limit for non-text value.
         */
        if (value !== undefined && value !== null && typeof value !== 'string') return <>{renderField}</>;

        return (
            <Flex>
                <TextInput
                    value={typeof value === 'string' ? value : ''}
                    onChange={handleChange}
                    styles={{
                        input: {
                            borderColor: isMaxLengthExceeded ? getColorPalette().red100 : getColorPalette().gray100,
                            ':focus': {
                                borderColor: getColorPalette().brandAccessible,
                            },
                            ':hover': {
                                borderColor: getColorPalette().brandAccessible,
                            },
                        },
                    }}
                />
                {remainingLength !== undefined &&
                    (isMaxLengthExceeded ? (
                        <Text color="red100">{t('overLengthMessage', { length: Math.abs(remainingLength) })}</Text>
                    ) : (
                        <Text>
                            {t('leftLengthMessage', {
                                length: remainingLength,
                            })}
                        </Text>
                    ))}
            </Flex>
        );
    },
);

LimitedLengthField.displayName = 'LimitedLengthField';
