import { memo } from 'react';
import styled from 'styled-components';

import { Flex, getBorderRadius, getColorPalette, Stack } from '@tridion-sites/extensions';
import type { User } from '@tridion-sites/models';

import { UserListItem } from './UserListItem';

const Container = styled(Flex)`
    border: 1px solid ${getColorPalette().blue100};
    border-radius: ${getBorderRadius().small}px;
`;

export interface UsersListProps {
    users: ReadonlyArray<User>;
}

export const UsersList = memo(({ users }: UsersListProps) => {
    return (
        <Container marginTop="xs" padding="sm">
            <Stack direction="column" itemGap="xs">
                {users.map(user => (
                    <UserListItem
                        key={user.id.asString}
                        userId={user.id}
                        label={user.description || user.id.asString}
                    />
                ))}
            </Stack>
        </Container>
    );
});

UsersList.displayName = 'UsersList';
