import { memo, useMemo } from 'react';

import { getConfiguration } from '@globals';
import { ActionIcon, Tooltip } from '@mantine/core';
import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';
import { Flex, getBorderRadius, getColorPalette } from '@tridion-sites/extensions';

import type { GuidedFieldConfig } from './addGuidedField';
import { InfoIcon } from './InfoIcon';

export const GuidedField = memo(
    ({ renderField, fieldDefinition, isReadOnly }: ContentEditorFormFieldExtensionProps) => {
        // Accessing configuration file to get prefix and cut it from the message later.
        const configuration = getConfiguration<GuidedFieldConfig>();

        const message = useMemo(() => {
            const targetFieldCustomUrl = configuration?.targetFieldCustomUrl;
            if (!targetFieldCustomUrl) return;

            // Custom URL has format `{prefix defined in config}\s{message to render}` by this extension's design.
            // So we need to separate message from the prefix with space.
            return fieldDefinition.customUrl?.replace(targetFieldCustomUrl, '').replace(/^\s+/g, '');
        }, [configuration?.targetFieldCustomUrl, fieldDefinition.customUrl]);

        if (isReadOnly) return <>{renderField}</>;

        // Additional element can be added next to built-in field by combining `renderField` which is available from `ContentEditorFormFieldExtensionProps` and custom elements.
        return (
            <Flex direction="row">
                <Flex shouldFill={true}>{renderField}</Flex>
                <Tooltip
                    label={message}
                    position="left"
                    /** Aligning look and feel with built-in field by using provided palette and border radius. */
                    styles={{
                        tooltip: {
                            backgroundColor: 'white',
                            color: getColorPalette().gray180,
                            border: `1px solid ${getColorPalette().gray80}`,
                            borderRadius: getBorderRadius().small,
                        },
                    }}
                >
                    <ActionIcon>
                        <InfoIcon />
                    </ActionIcon>
                </Tooltip>
            </Flex>
        );
    },
);

GuidedField.displayName = 'GuidedField';
