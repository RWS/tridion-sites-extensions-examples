import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionGroupId } from '@tridion-sites/extensions';

/**
 * Removes 'Refreshing' action group from the context menu.
 */
export const removeRefreshingGroup = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.contextMenu.removeGroup(activitiesExplorerActionGroupId.refreshing);
};
