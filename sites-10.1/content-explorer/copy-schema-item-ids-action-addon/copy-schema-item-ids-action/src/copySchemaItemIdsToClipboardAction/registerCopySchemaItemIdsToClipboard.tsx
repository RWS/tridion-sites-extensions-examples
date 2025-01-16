import { t } from '@globals';
import { type ActionGroup, type ExtensionBuilder } from '@tridion-sites/extensions';

import { CopyIcon } from './CopyIcon';
import { useCopySchemaItemIdsToClipboardAction } from './useCopySchemaItemIdsToClipboard';

const copySchemaItemIdsActionId = 'copySchemaItemIdsActionExtension';

export const registerCopySchemaItemIdsToClipboard = (builder: ExtensionBuilder) => {
    // First let's add all necessary translation strings
    builder.translations.addTranslation('en', {
        actionGroupTitle: 'copySchemaItemIds',
        actionTitle: 'Copy Schema item ids to clipboard',
        copySchemaItemIdsToClipboard: {
            label: 'Copy Schema item ids to clipboard',
            notification: {
                title: 'Schema item ids copied',
                description: `Selected {{count}} Schema item ids copied to the clipboard.`,
            },
        },
    });

    // Adding a new action to Content Explorer with the provided icon and label
    // Note that even though we've added this action it will not be visible yet anywhere
    builder.contentExplorer.addAction(() => ({
        id: copySchemaItemIdsActionId,
        icon: <CopyIcon />,
        label: t('copySchemaItemIdsToClipboard.label'),
        useAction: useCopySchemaItemIdsToClipboardAction,
    }));

    // We want to add the new action into the toolbar of the table.
    // In order to achieve this we should first create an action group that would
    // contain the new action (we could also change an existing action group instead)
    const newActionGroup: ActionGroup = {
        id: 'copyToClipboard',
        label: t('actionGroupTitle'),
        actionIds: [copySchemaItemIdsActionId],
    };

    // And now let's add it to the toolbar
    builder.contentExplorer.table.toolbar.addGroup(newActionGroup);
};
