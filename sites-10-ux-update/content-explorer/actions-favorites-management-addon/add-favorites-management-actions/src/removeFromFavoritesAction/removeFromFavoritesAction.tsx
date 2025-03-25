import { useCallback, useMemo } from 'react';

import { t } from '@globals';
import {
    isFavoritesNodeId,
    useNotifications,
    useOptionalContentExplorer,
    useOptionalContentExplorerTable,
    useUserProfile,
} from '@tridion-sites/extensions';
import { parseItemUri } from '@tridion-sites/models';
import type { UserProfile as BackendUserProfile } from '@tridion-sites/open-api-client';
import { UserProfileService } from '@tridion-sites/open-api-client';

import { getExistingFavoritesLinks } from '../getExistingFavoritesLinks';

export const useRemoveFromFavoritesAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();

    const contentExplorerTable = useOptionalContentExplorerTable();
    const contentExplorer = useOptionalContentExplorer();
    const selectedItemsCount = contentExplorerTable?.selection.ids.size;

    const selectedItemsSet = useMemo(
        () => new Set(contentExplorerTable?.selection.ids),
        [contentExplorerTable?.selection.ids],
    );

    // The action should be available if there are items selected
    const isAvailable = useMemo(() => {
        if (!contentExplorer?.currentNode?.id) return false;

        return !!selectedItemsCount && isFavoritesNodeId(contentExplorer.currentNode.id);
    }, [contentExplorer?.currentNode?.id, selectedItemsCount]);

    const execute = useCallback(async () => {
        const userId = userProfile.user?.id.asString;

        if (!userId) return;
        if (!isAvailable) return;

        const backendUserProfile = userProfile.getInternalModel();

        try {
            // Fetch user's favorites list directly from server to prevent stale data overwrites.
            const favorites = (await getExistingFavoritesLinks()) ?? [];

            const updatedUserProfile: BackendUserProfile = {
                ...backendUserProfile,
                Preferences: {
                    ...backendUserProfile.Preferences,
                    Favorites: [
                        ...favorites.filter(link => link.IdRef && !selectedItemsSet.has(parseItemUri(link.IdRef))),
                    ],
                },
            };

            await UserProfileService.updateUserProfile({
                escapedUserId: userId,
                userProfile: updatedUserProfile,
            });
            contentExplorerTable?.refresh();

            notify({
                title: t('removeFromFavorites.notification.success.title'),
                description: t('removeFromFavorites.notification.success.description', {
                    count: selectedItemsCount,
                }),
                type: 'success',
            });
        } catch (error) {
            notify({
                type: 'error',
                title: t('removeFromFavorites.notification.failed.title'),
                description: t('removeFromFavorites.notification.failed.description'),
                showInMessageCenter: true,
            });
        }
    }, [userProfile, isAvailable, contentExplorerTable, selectedItemsSet, notify, selectedItemsCount]);

    return {
        isAvailable,
        execute,
    };
};
