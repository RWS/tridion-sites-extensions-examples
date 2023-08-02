import { memo, useMemo } from 'react';

import { t } from '@globals';
import { ColorSwatch, Group, Select, Text } from '@mantine/core';
import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';
import { Flex } from '@tridion-sites/extensions';
import { SingleLineTextFieldDefinition } from '@tridion-sites/models';

import { ColorSelectItem } from './ColorSelectItem';

export const ColorSelectField = memo(
    ({ fieldDefinition, value, isReadOnly, setValue, renderField }: ContentEditorFormFieldExtensionProps) => {
        const data = useMemo(() => {
            if (!(fieldDefinition instanceof SingleLineTextFieldDefinition)) return [];

            return fieldDefinition?.list?.entires || [];
        }, [fieldDefinition]);

        if (isReadOnly) {
            return (
                <Group noWrap={true}>
                    <ColorSwatch key={value} color={value} />
                    <Flex>
                        <Text size="sm">{value}</Text>
                    </Flex>
                </Group>
            );
        }

        return (
            <Select
                placeholder={t('colorSelect.placeholder')}
                itemComponent={ColorSelectItem}
                data={data}
                maxDropdownHeight={400}
                nothingFound={t('colorSelect.notFound')}
                value={value as string}
                onChange={setValue}
            />
        );
    },
);

ColorSelectField.displayName = 'ColorSelectField';
