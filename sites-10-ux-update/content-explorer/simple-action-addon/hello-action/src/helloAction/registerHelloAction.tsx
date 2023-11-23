import { t } from '@globals';
import type { ActionGroup, ExtensionBuilder } from '@tridion-sites/extensions';

import { SmileIcon } from './SmileIcon';
import { useHelloAction } from './useHelloAction';

export const helloActionId = 'helloAction';

export const registerHelloAction = (builder: ExtensionBuilder) => {
    // First let's add all necessary translation strings
    builder.translations.addTranslation('en', {
        actionLabel: 'Say hello!',
        groupLabel: 'Simple actions',
        confirmationDialog: {
            title: 'Confirmation',
            description: 'Are you sure you want to say hello?',
            okButtonLabel: 'Yes',
            cancelButtonLabel: 'No',
        },
        notification: {
            // Note that you can use placeholders in your translation strings
            title: 'Hello, {{userName}}!',
            description: 'You are currently in {{nodeTitle}}',
        },
    });

    // Adding a new action to Content Explorer with the provided icon and label
    // Note that even though we added this action it will not be visible yet anywhere
    builder.contentExplorer.addAction(() => ({
        id: helloActionId,
        icon: <SmileIcon />,
        label: t('actionLabel'),
        useAction: useHelloAction,
    }));

    // We want to add the new action into the toolbar, context menu of the table and
    // into the context menu of the tree.
    // In order to achieve this we should first create an action group that would
    // contain the new action (we could also change an existing action group instead)
    const newActionGroup: ActionGroup = {
        id: 'simpleActions',
        label: t('groupLabel'),
        actionIds: [helloActionId],
    };

    // And now let's add the action group to all places where we want to show it.
    builder.contentExplorer.table.toolbar.addGroup(newActionGroup);
    builder.contentExplorer.table.contextMenu.addGroup(newActionGroup);
    builder.contentExplorer.tree.contextMenu.addGroup(newActionGroup);
};
