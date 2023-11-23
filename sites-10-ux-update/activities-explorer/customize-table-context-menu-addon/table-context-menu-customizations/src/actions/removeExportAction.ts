import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionId } from '@tridion-sites/extensions';

/**
 * Removes 'Export' action from the list of actions in the context menu of the table.
 */
export const removeExportAction = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.contextMenu.removeAction(activitiesExplorerActionId.export);
};
