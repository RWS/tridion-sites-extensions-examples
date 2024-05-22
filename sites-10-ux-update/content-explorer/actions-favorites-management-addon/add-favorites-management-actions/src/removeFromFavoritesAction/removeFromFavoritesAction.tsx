import { useCallback, useMemo } from 'react';

import { t } from '@globals';
import {
    isFavoritesNodeId,
    useNotifications,
    useOptionalContentExplorer,
    useOptionalContentExplorerTable,
    useUserProfile,
} from '@tridion-sites/extensions';
import type {
    FavoriteLink as BackendUserFavoriteLink,
    UserProfile as BackendUserProfile,
} from '@tridion-sites/open-api-client';
import { UserProfileService } from '@tridion-sites/open-api-client';

export const useRemoveFromFavoritesAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();

    const contentExplorerTable = useOptionalContentExplorerTable();
    const favorites = useMemo(
        () => (userProfile?.preferences?.favorites || []).map(i => i.getInternalModel()),
        [userProfile],
    );

    const contentExplorer = useOptionalContentExplorer();
    const isFavoritesNode = isFavoritesNodeId(contentExplorer?.currentNode?.id || '');
    const selectedItemsCount = contentExplorerTable?.selection.ids.size;

    // The action should be available if there are items selected
    const isAvailable = useMemo(() => {
        return !!selectedItemsCount && isFavoritesNode;
    }, [isFavoritesNode, selectedItemsCount]);

    const execute = useCallback(async () => {
        const userId = userProfile?.user?.id.asString;

        if (!userId) return;
        if (!isAvailable) return;

        const selectedItemLinks = Array.from(contentExplorerTable?.selection.selectedItems || []).map(item => {
            // Each item from the selection is being translated to BackendUserFavoriteLink
            // to overwrite current user's favorites with an updated Favorites array.
            const backendModel: BackendUserFavoriteLink = {
                $type: 'FavoriteLink',
                IdRef: item.id.asString,
                Title: item.title,
                Path: '//',
            };
            return backendModel;
        });

        const favoritesItemIds = new Set(selectedItemLinks.map(link => link.IdRef));
        const updatedUserProfile: BackendUserProfile = {
            ...userProfile.getInternalModel(),
            Preferences: {
                ...userProfile.preferences,
                Favorites: [...favorites.filter(link => !favoritesItemIds.has(link.IdRef))],
            },
        };

        try {
            await UserProfileService.updateUserProfile({
                escapedUserId: userProfile.user.id.asString,
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
    }, [userProfile, isAvailable, contentExplorerTable, favorites, notify, selectedItemsCount]);

    return {
        isAvailable,
        execute,
    };
};
