import { memo } from 'react';

import { Flex, Stack } from '@tridion-sites/extensions';
import type { User } from '@tridion-sites/models';

import { UserListItem } from './UserListItem';
import styles from './UsersList.module.css';

export interface UsersListProps {
    users: ReadonlyArray<User>;
}

export const UsersList = memo(({ users }: UsersListProps) => {
    return (
        <Flex className={styles.usersList} marginTop="xs" padding="sm">
            <Stack direction="column" itemGap="xs">
                {users.map(user => (
                    <UserListItem
                        key={user.id.asString}
                        userId={user.id}
                        label={user.description || user.id.asString}
                    />
                ))}
            </Stack>
        </Flex>
    );
});

UsersList.displayName = 'UsersList';
