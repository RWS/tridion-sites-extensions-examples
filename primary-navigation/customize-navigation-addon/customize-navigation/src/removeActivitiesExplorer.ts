import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { navigationItemId } from '@tridion-sites/extensions';

/**
 * Removes Activities Explorer from primary navigation.
 */
export const removeActivitiesExplorer = (builder: ExtensionBuilder) => {
    builder.header.navigation.config.remove(navigationItemId.activitiesExplorer);
};
