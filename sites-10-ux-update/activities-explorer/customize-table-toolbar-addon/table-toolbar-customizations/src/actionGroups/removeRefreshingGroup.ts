import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionGroupId } from '@tridion-sites/extensions';

/**
 * Removes 'Refreshing' action group from the toolbar.
 */
export const removeRefreshingGroup = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.toolbar.removeGroup(activitiesExplorerActionGroupId.refreshing);
};
