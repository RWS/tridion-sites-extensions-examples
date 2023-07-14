import { memo } from 'react';

import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';
import { Flex, Text } from '@tridion-sites/extensions';

import { InputIcon } from './InputIcon';

export const InputField = memo(({ isReadOnly, renderField }: ContentEditorFormFieldExtensionProps<string>) => {
    return (
        <Flex direction="row" crossAxis="center">
            <Flex marginRight="sm">
                <InputIcon />
            </Flex>
            <Flex shouldFill={true}>{isReadOnly ? <Text>{renderField}</Text> : renderField}</Flex>
        </Flex>
    );
});

InputField.displayName = 'InputField';
