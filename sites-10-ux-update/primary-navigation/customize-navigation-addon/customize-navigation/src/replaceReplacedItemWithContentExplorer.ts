import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { navigationItemId } from '@tridion-sites/extensions';

import { replacedNavigationItemId } from './addReplacedNavigationItem';

/**
 * Replaces the placeholder navigation item with Content Explorer.
 */
export const replaceReplacedItemWithContentExplorer = (builder: ExtensionBuilder) => {
    builder.header.navigation.config.replace(replacedNavigationItemId, navigationItemId.contentExplorer);
};
