import { useCallback } from 'react';

import { t } from '@globals';
import { useConfirmation, useContentExplorer, useNotifications, useUserProfile } from '@tridion-sites/extensions';

// This hook controls the behavior of Hello action
// It utilizes global data context as well as ContentExplorer data context.
// It also shows how you can add a confirmation dialog to your action.
export const useHelloAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();
    // We can retrieve the current node information from ContentExplorer data context.
    const { currentNode } = useContentExplorer();

    const currentNodeTitle = currentNode?.data.title || '';
    const userName = userProfile?.displayName || '';
    const onConfirm = useCallback(() => {
        notify({
            type: 'info',
            title: t('notification.title', { userName }),
            description: t('notification.description', { nodeTitle: currentNodeTitle }),
            showInMessageCenter: true,
        });
    }, [currentNodeTitle, notify, userName]);

    const { open } = useConfirmation({
        title: t('confirmationDialog.title'),
        description: t('confirmationDialog.description'),
        okButtonLabel: t('confirmationDialog.okButtonLabel'),
        cancelButtonLabel: t('confirmationDialog.cancelButtonLabel'),
        onConfirm,
    });

    return {
        isAvailable: true,
        execute: open,
    };
};
