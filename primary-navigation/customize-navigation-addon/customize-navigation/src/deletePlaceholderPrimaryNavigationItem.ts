import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { placeholderNavigationItemId } from './addPlaceholderNavigationItem';

/**
 * Removes dummy navigational item by it's id using customize method. You can achieve same result using `remove` method.
 * @param builder
 */
export const deletePlaceholderPrimaryNavigationItem = (builder: ExtensionBuilder) => {
    builder.header.navigation.config.customize(config => {
        const placeholderNavigationItemIndex = config.findIndex(navItemId => navItemId === placeholderNavigationItemId);
        if (placeholderNavigationItemIndex !== -1) {
            config.splice(placeholderNavigationItemIndex, 1);
        }
    });
};
