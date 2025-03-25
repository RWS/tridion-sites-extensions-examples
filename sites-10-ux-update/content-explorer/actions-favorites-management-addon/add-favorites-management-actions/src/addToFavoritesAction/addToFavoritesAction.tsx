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
import {
    type FavoriteLink as BackendUserFavoriteLink,
    type UserProfile as BackendUserProfile,
    UserProfileService,
} from '@tridion-sites/open-api-client';

import { getExistingFavoritesLinks } from '../getExistingFavoritesLinks';

export const useAddToFavoritesAction = () => {
    const { notify } = useNotifications();
    const { userProfile } = useUserProfile();
    const contentExplorer = useOptionalContentExplorer();
    const contentExplorerTable = useOptionalContentExplorerTable();

    const favoritesItemIds = useMemo(
        () => new Set(userProfile?.preferences?.favorites.map(link => link.idRef)),
        [userProfile?.preferences?.favorites],
    );

    const applicableItems = useMemo(
        () => (contentExplorerTable?.selection.selectedItems || []).filter(item => !favoritesItemIds.has(item.id)),
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
        if (!contentExplorer?.currentNode?.id) return false;

        const hasApplicableItems = applicableItems.length > 0;
        return hasApplicableItems && !isFavoritesNodeId(contentExplorer.currentNode.id);
    }, [applicableItems.length, contentExplorer?.currentNode?.id]);

    const execute = useCallback(async () => {
        const userId = userProfile?.user?.id.asString;

        if (!userId) return;
        if (!isAvailable) return;

        const backendUserProfile = userProfile.getInternalModel();

        try {
            // Fetch user's favorites list directly from server to prevent stale data overwrites.
            const existingFavorites = (await getExistingFavoritesLinks()) ?? [];
            const updatedUserProfile: BackendUserProfile = {
                ...backendUserProfile,
                Preferences: {
                    ...backendUserProfile.Preferences,
                    Favorites: [...existingFavorites, ...filteredSelectedFavoriteItemLinks],
                },
            };

            await UserProfileService.updateUserProfile({
                escapedUserId: userId,
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
    }, [userProfile, isAvailable, filteredSelectedFavoriteItemLinks, notify, applicableItems.length]);

    return {
        isAvailable,
        execute,
    };
};
