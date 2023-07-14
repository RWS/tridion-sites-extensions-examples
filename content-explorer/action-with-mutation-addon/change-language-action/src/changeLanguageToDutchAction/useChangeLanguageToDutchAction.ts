import { useCallback, useMemo } from 'react';

import { t } from '@globals';
import { useChangeUserLanguageMutation, useNotifications, useUserProfile } from '@tridion-sites/extensions';

const DUTCH_LANGUAGE_ID = 1043;

// This hook controls the behavior of Change language to Dutch action
// It utilizes global data context as well as mutations.
// It also demonstrates the usage of notifications.
export const useChangeLanguageToDutchAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();
    // We can utilize mutations to change data on the backend
    const { mutateAsync } = useChangeUserLanguageMutation();

    const currentUserId = userProfile.user?.id;
    const currentUserLanguageId = userProfile.user?.languageId;

    const isAvailable = useMemo(() => {
        if (!currentUserId) return false;
        if (currentUserLanguageId === DUTCH_LANGUAGE_ID) return false;

        return true;
    }, [currentUserId, currentUserLanguageId]);

    const execute = useCallback(async () => {
        if (!currentUserId) return;

        try {
            notify({
                type: 'info',
                title: t('started.title'),
                description: t('started.description'),
            });

            await mutateAsync({ languageId: DUTCH_LANGUAGE_ID, userId: currentUserId });

            notify({
                type: 'success',
                title: t('success.title'),
                description: t('success.description'),
                showInMessageCenter: true,
            });

            // User language change requires a reload of the page because
            // some of the translated information is coming from the backend
            window.location.reload();
        } catch (error) {
            notify({
                type: 'error',
                title: t('errorTitle'),
                showInMessageCenter: true,
            });
        }
    }, [currentUserId, mutateAsync, notify]);

    return {
        isAvailable,
        execute,
    };
};
