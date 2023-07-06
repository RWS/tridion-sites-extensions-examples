import { memo } from 'react';

import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';
import { Flex, Text } from '@tridion-sites/extensions';

import { CalendarIcon } from './CalendarIcon';

export const DateField = memo(({ isReadOnly, renderField }: ContentEditorFormFieldExtensionProps<string>) => {
    if (isReadOnly) {
        return (
            <Flex direction="row">
                <Flex marginRight="nano">
                    <CalendarIcon />
                </Flex>
                <Text underline={true}>{renderField}</Text>
            </Flex>
        );
    }

    return <>{renderField}</>;
});

DateField.displayName = 'DateField';
