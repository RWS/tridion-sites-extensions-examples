import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionId } from '@tridion-sites/extensions';

/**
 * Replaces 'Finish Activity' action with 'Export' action in the toolbar of the table.
 */
export const replaceFinishActivityWithExportAction = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.toolbar.replaceAction(
        activitiesExplorerActionId.finishActivity,
        activitiesExplorerActionId.export,
    );
};
