import { t } from '@globals';
import { type ActionGroup, type ExtensionBuilder } from '@tridion-sites/extensions';

import { NetherlandsFlagIcon } from './NetherlandsFlagIcon';
import { useChangeLanguageToDutchAction } from './useChangeLanguageToDutchAction';

const changeToDutchActionId = 'changeToDutch';

export const registerChangeLanguageToDutchAction = (builder: ExtensionBuilder) => {
    // First let's add all necessary translation strings
    builder.translations.addTranslation('en', {
        actionGroupTitle: 'Languages',
        actionTitle: 'Change current language to Dutch',
        errorTitle: 'Error occurred while trying to change the language',
        success: {
            title: `Language changed`,
            description: `Your language has been successfully changed to Dutch.`,
        },
        started: {
            title: `Changing language`,
            description: `Changing your current language to Dutch.`,
        },
    });

    // Adding a new action to Content Explorer with the provided icon and label
    // Note that even though we've added this action it will not be visible yet anywhere
    builder.contentExplorer.addAction(() => ({
        id: changeToDutchActionId,
        icon: <NetherlandsFlagIcon />,
        label: t('actionTitle'),
        useAction: useChangeLanguageToDutchAction,
    }));

    // We want to add the new action into the toolbar of the table.
    // In order to achieve this we should first create an action group that would
    // contain the new action (we could also change an existing action group instead)
    const newActionGroup: ActionGroup = {
        id: 'languages',
        label: t('actionGroupTitle'),
        actionIds: [changeToDutchActionId],
    };

    // And now let's add it to the toolbar
    builder.contentExplorer.table.toolbar.addGroup(newActionGroup);
};
