import { memo } from 'react';

import { t } from '@globals';
import { Flex, Text, useUserProfile, useUsersQuery } from '@tridion-sites/extensions';

import { LoadingIndicator } from './LoadingIndicator';
import { UsersList } from './UsersList';

export const UsersPage = memo(() => {
    const { userProfile } = useUserProfile();
    const { data: users, isLoading } = useUsersQuery();

    return (
        <Flex direction="column" padding="lg" backgroundColor="gray10">
            <Text tag="span">Hi {userProfile.displayName}!</Text>
            <Text tag="span" type="heading2">
                {t('usersListHeaderLabel')}
            </Text>
            <LoadingIndicator isLoading={isLoading}>{users && <UsersList users={users} />}</LoadingIndicator>
        </Flex>
    );
});

UsersPage.displayName = 'UsersPage';
