import { memo } from 'react';

import { t } from '@globals';
import { Flex, Text, useUserProfile } from '@tridion-sites/extensions';

export const AdministratorOnlyPage = memo(() => {
    const { userProfile } = useUserProfile();

    return (
        <Flex padding="lg">
            {/* To pass variable data to string template pass key-value object as a second argument to a t function. Make sure keys match. */}
            <Text type="heading2">{t('hiUserMessage', { userName: userProfile?.displayName })}</Text>
            <Text>{t('bodyMessage')}</Text>
        </Flex>
    );
});

AdministratorOnlyPage.displayName = 'AdministratorOnlyPage';
