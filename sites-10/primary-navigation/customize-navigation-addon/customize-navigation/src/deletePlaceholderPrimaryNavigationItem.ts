import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { placeholderNavigationItemId } from './addPlaceholderNavigationItem';

/**
 * Removes a placeholder navigation item by ID using `customize` method.
 * The same result can be achieved using `remove` method.
 */
export const deletePlaceholderPrimaryNavigationItem = (builder: ExtensionBuilder) => {
    builder.header.navigation.config.customize(config => {
        const placeholderNavigationItemIndex = config.findIndex(navItemId => navItemId === placeholderNavigationItemId);
        if (placeholderNavigationItemIndex !== -1) {
            config.splice(placeholderNavigationItemIndex, 1);
        }
    });
};
