import { useCallback } from 'react';

import { t } from '@globals';
import {
    useConfirmation,
    useContentExplorer,
    useNotifications,
    useOptionalContentExplorerTable,
    useOptionalContentExplorerTree,
    useUserProfile,
} from '@tridion-sites/extensions';

export const usePushHelloNotificationAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();
    const { currentNode } = useContentExplorer();
    const contentExplorerTable = useOptionalContentExplorerTable();
    const contentExplorerTree = useOptionalContentExplorerTree();

    const refreshTable = contentExplorerTable?.refresh;
    const refreshTree = contentExplorerTree?.refresh;

    const onConfirm = useCallback(() => {
        if (!currentNode?.data.title) return;

        refreshTable?.();
        refreshTree?.();

        notify({
            type: 'info',
            title: t('notification.title', { userName: userProfile.displayName || '' }),
            description: t('notification.description', { nodeName: currentNode.data.title }),
            showInMessageCenter: true,
        });
    }, [currentNode?.data.title, notify, refreshTable, refreshTree, userProfile.displayName]);

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
