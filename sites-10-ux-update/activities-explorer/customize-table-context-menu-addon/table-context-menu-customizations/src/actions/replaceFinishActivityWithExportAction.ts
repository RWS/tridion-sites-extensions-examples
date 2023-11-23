import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionId } from '@tridion-sites/extensions';

/**
 * Replaces 'Finish Activity' action with 'Export' action in the context menu of the table.
 */
export const replaceFinishActivityWithExportAction = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.contextMenu.replaceAction(
        activitiesExplorerActionId.finishActivity,
        activitiesExplorerActionId.export,
    );
};
