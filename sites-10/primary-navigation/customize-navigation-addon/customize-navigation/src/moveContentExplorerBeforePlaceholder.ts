import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { navigationItemId } from '@tridion-sites/extensions';

import { placeholderNavigationItemId } from './addPlaceholderNavigationItem';

/**
 * Moves Content Explorer navigation item before Placeholder.
 */
export const moveContentExplorerBeforePlaceholder = (builder: ExtensionBuilder) => {
    builder.header.navigation.config.move(navigationItemId.contentExplorer, placeholderNavigationItemId);
};
