import { memo } from 'react';

import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';
import { Flex, Text } from '@tridion-sites/extensions';

import { PercentIcon } from './PercentIcon';

export const NumberField = memo(({ isReadOnly, renderField }: ContentEditorFormFieldExtensionProps<string>) => {
    if (isReadOnly) {
        return (
            <Flex direction="row" crossAxis="center">
                <Flex marginRight="sm">
                    <PercentIcon />
                </Flex>
                <Flex shouldFill={true}>
                    <Text color="brandPrimary">{renderField}</Text>
                </Flex>
            </Flex>
        );
    }

    return <>{renderField}</>;
});

NumberField.displayName = 'NumberField';
