import { useCallback, useMemo } from 'react';

import { t } from '@globals';
import {
    isFavoritesNodeId,
    useNotifications,
    useOptionalContentExplorer,
    useOptionalContentExplorerTable,
    useUserProfile,
} from '@tridion-sites/extensions';
import type { RepositoryLocalObject } from '@tridion-sites/models';
import type {
    FavoriteLink as BackendUserFavoriteLink,
    UserProfile as BackendUserProfile,
} from '@tridion-sites/open-api-client';
import { UserProfileService } from '@tridion-sites/open-api-client';

export const useAddToFavoritesAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();
    const contentExplorer = useOptionalContentExplorer();
    const contentExplorerTable = useOptionalContentExplorerTable();

    const favorites = useMemo(
        () => (userProfile?.preferences?.favorites || []).map(i => i.getInternalModel()),
        [userProfile?.preferences?.favorites],
    );
    const favoritesItemIds = useMemo(() => new Set(favorites.map(link => link.IdRef)), [favorites]);

    const isFavoritesNode = useMemo(
        () => isFavoritesNodeId(contentExplorer?.currentNode?.id || ''),
        [contentExplorer?.currentNode?.id],
    );

    const applicableItems = useMemo(
        () =>
            (contentExplorerTable?.selection.selectedItems || []).filter(
                item => !favoritesItemIds.has(item.id.asString),
            ),
        [contentExplorerTable?.selection.selectedItems, favoritesItemIds],
    );

    const filteredSelectedFavoriteItemLinks = useMemo(() => {
        return applicableItems.map(item => {
            // Each item from the selection is being translated to BackendUserFavoriteLink
            // to overwrite current user's favorites with an updated Favorites array.
            const backendModel: BackendUserFavoriteLink = {
                $type: 'FavoriteLink',
                IdRef: item.id.asString,
                Title: item.title,
                Path: (item as RepositoryLocalObject).locationInfo?.path || '//',
            };
            return backendModel;
        });
    }, [applicableItems]);

    // The action should be available if there are items selected
    // and at least one of them is not in Favorites list already
    const isAvailable = useMemo(() => {
        const hasApplicableItems = applicableItems.length > 0;
        return hasApplicableItems && !isFavoritesNode;
    }, [applicableItems.length, isFavoritesNode]);

    const execute = useCallback(async () => {
        const userId = userProfile?.user?.id.asString;

        if (!userId) return;
        if (!isAvailable) return;

        const updatedUserProfile: BackendUserProfile = {
            ...userProfile.getInternalModel(),
            Preferences: {
                ...userProfile.preferences,
                Favorites: [...favorites, ...filteredSelectedFavoriteItemLinks],
            },
        };

        try {
            await UserProfileService.updateUserProfile({
                escapedUserId: userProfile.user.id.asString,
                userProfile: updatedUserProfile,
            });
            notify({
                title: t('addToFavorites.notification.success.title'),
                description: t('addToFavorites.notification.success.description', {
                    count: applicableItems.length,
                }),
                type: 'success',
            });
        } catch (error) {
            notify({
                type: 'error',
                title: t('addToFavorites.notification.failed.title'),
                description: t('addToFavorites.notification.failed.description'),
                showInMessageCenter: true,
            });
        }
    }, [userProfile, isAvailable, favorites, filteredSelectedFavoriteItemLinks, notify, applicableItems.length]);

    return {
        isAvailable,
        execute,
    };
};
