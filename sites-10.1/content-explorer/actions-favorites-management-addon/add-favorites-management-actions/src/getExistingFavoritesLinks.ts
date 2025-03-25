import type { FavoriteLink as BackendUserFavoriteLink, IdentifiableObject } from '@tridion-sites/open-api-client';
import { ErrorType, ItemsService, UserProfileService } from '@tridion-sites/open-api-client';

export const getExistingFavoritesLinks = async (): Promise<ReadonlyArray<BackendUserFavoriteLink> | undefined> => {
    const userProfile = await UserProfileService.getOwnUserProfile();

    const favorites = userProfile?.Preferences?.Favorites ?? [];

    if (!favorites.length) return [];
    // Note: Favorites may reference deleted items which should be filtered out.
    // We can achieve this by trying to load list of full items and check for `LoadInfo` errors.
    const items = await ItemsService.getItems({
        itemIds: favorites.map(favorite => favorite.IdRef).filter((value): value is string => value !== undefined),
    });

    const itemsMap = new Map<string, IdentifiableObject>();
    for (const item of Object.values(items)) {
        itemsMap.set(item.Id, item);
    }

    return favorites?.filter(favLink => {
        if (favLink.IdRef === undefined) return false;

        const item = itemsMap.get(favLink.IdRef);
        return item?.LoadInfo?.ErrorType !== ErrorType.ERROR;
    });
};
