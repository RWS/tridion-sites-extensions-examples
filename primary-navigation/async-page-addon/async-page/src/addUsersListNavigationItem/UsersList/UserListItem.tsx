import { memo } from 'react';

import { Block, Flex, Text } from '@tridion-sites/extensions';
import type { ItemUri } from '@tridion-sites/models';

import { UserIcon } from './UserIcon';

export interface UserListItemProps {
    userId: ItemUri;
    label: string;
}

export const UserListItem = memo(({ label, userId }: UserListItemProps) => {
    return (
        <Flex key={userId.asString} direction="row" crossAxis="center">
            <Block marginRight="xs">
                <UserIcon />
            </Block>
            <Text>
                {label} ({userId.asString})
            </Text>
        </Flex>
    );
});

UserListItem.displayName = 'UserListItem';
