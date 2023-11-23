import { forwardRef } from 'react';

import { ColorSwatch, Group, Text } from '@mantine/core';
import { Flex } from '@tridion-sites/extensions';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string;
    label: string;
}

export const ColorSelectItem = forwardRef<HTMLDivElement, ItemProps>(({ value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
        <Group noWrap={true}>
            <ColorSwatch key={value} color={value} />
            <Flex>
                <Text size="sm">{value}</Text>
            </Flex>
        </Group>
    </div>
));

ColorSelectItem.displayName = 'ColorSelectItem';
