import { t } from '@globals';
import { type ActionGroup, type ExtensionBuilder } from '@tridion-sites/extensions';

import { AddToFavoritesIcon, useAddToFavoritesAction } from './addToFavoritesAction';
import { IconTrash, useRemoveFromFavoritesAction } from './removeFromFavoritesAction';

const addToFavoritesAddonId = 'addToFavoritesAddonId';
const removeFromFavoritesAddonId = 'removeFromFavoritesAddonId';

export const registerFavoritesActions = (builder: ExtensionBuilder) => {
    // First let's add all necessary translation strings
    builder.translations.addTranslation('en', {
        actionGroupTitle: 'Favorites',
        addToFavorites: {
            label: 'Add items to Favorites',
            notification: {
                success: {
                    title: 'Items added to Favorites',
                    description: `Selected {{count}} items added to Favorites.`,
                },
                failed: {
                    title: 'Error',
                    description: `An error occurred while adding items to Favorites. Try again.`,
                },
            },
        },
        removeFromFavorites: {
            label: 'Remove items from Favorites',
            notification: {
                success: {
                    title: 'Items removed from Favorites',
                    description: `Selected {{count}} items removed from Favorites.`,
                },
                failed: {
                    title: 'Error',
                    description: `An error occurred while removing items from Favorites. Try again.`,
                },
            },
        },
    });

    // Adding a new action to Content Explorer with the provided icon and label
    // Note that even though we've added this action it will not be visible yet anywhere
    builder.contentExplorer.addAction(() => ({
        id: addToFavoritesAddonId,
        icon: <AddToFavoritesIcon />,
        label: t('addToFavorites.label'),
        useAction: useAddToFavoritesAction,
    }));

    builder.contentExplorer.addAction(() => ({
        id: removeFromFavoritesAddonId,
        icon: <IconTrash />,
        label: t('removeFromFavorites.label'),
        useAction: useRemoveFromFavoritesAction,
    }));

    // We want to add the new action into the toolbar of the table.
    // In order to achieve this we should first create an action group that would
    // contain the new action (we could also change an existing action group instead)
    const newActionGroup: ActionGroup = {
        id: 'favorites',
        label: t('actionGroupTitle'),
        actionIds: [addToFavoritesAddonId, removeFromFavoritesAddonId],
    };

    // Add new actions to the toolbar.
    builder.contentExplorer.table.toolbar.addGroup(newActionGroup);

    // Add new actions to the context menu of the table.
    builder.contentExplorer.table.contextMenu.addGroup(newActionGroup);
};
