import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { AddToFavoritesIcon } from './AddToFavoritesIcon';
import { usePushHelloNotificationAction } from './usePushHelloNotificationAction';

export const sayHelloActionId = 'sayHelloAction';

export const addPushHelloNotificationAction = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        actionLabel: 'Action label',
        groupLabel: 'Simple actions',
        confirmationDialog: {
            title: 'Refreshing',
            description: 'Are you sure you want to refresh the Table?',
            okButtonLabel: 'Ok',
            cancelButtonLabel: 'Cancel',
        },
        notification: {
            title: 'Hello, {{userName}}!',
            description: 'You are currently in {{nodeName}}',
        },
    });

    builder.contentExplorer.addAction(() => ({
        id: sayHelloActionId,
        icon: <AddToFavoritesIcon />,
        label: t('actionLabel'),
        useAction: usePushHelloNotificationAction,
    }));

    const newActionGroup = {
        id: 'exampleGroup',
        label: t('groupLabel'),
        actionIds: [sayHelloActionId],
    };

    builder.contentExplorer.table.toolbar.addGroup(newActionGroup);
    builder.contentExplorer.table.contextMenu.addGroup(newActionGroup);
    builder.contentExplorer.tree.contextMenu.addGroup(newActionGroup);
};
