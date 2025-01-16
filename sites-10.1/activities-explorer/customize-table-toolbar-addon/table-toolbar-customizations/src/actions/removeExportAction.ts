import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionId } from '@tridion-sites/extensions';

/**
 * Removes 'Export' action from the list of actions in the toolbar of the table.
 */
export const removeExportAction = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.toolbar.removeAction(activitiesExplorerActionId.export);
};
