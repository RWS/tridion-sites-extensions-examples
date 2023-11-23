import { useCallback } from 'react';

import { t } from '@globals';
import { useConfirmation, useNotifications, useUserProfile } from '@tridion-sites/extensions';

// This hook controls the behavior of Hello action
// It gets notifications functionality and the current user information
// out of the global data context.
// It also shows how you can add a confirmation dialog to your action.
export const useHelloAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();

    const userName = userProfile.displayName || '';
    const onConfirm = useCallback(() => {
        notify({
            type: 'info',
            title: t('notification.title', { userName }),
            description: t('notification.description'),
            showInMessageCenter: true,
        });
    }, [notify, userName]);

    const execute = useConfirmation({
        title: t('confirmationDialog.title'),
        description: t('confirmationDialog.description'),
        okButtonLabel: t('confirmationDialog.okButtonLabel'),
        cancelButtonLabel: t('confirmationDialog.cancelButtonLabel'),
        onConfirm,
    });

    return {
        isAvailable: true,
        execute,
    };
};
