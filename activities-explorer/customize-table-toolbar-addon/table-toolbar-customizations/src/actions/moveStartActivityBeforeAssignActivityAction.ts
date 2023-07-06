import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionId } from '@tridion-sites/extensions';

/**
 * Moves 'Start Activity' action before 'Assign Activity' action in the toolbar of the table.
 */
export const moveStartActivityBeforeAssignActivityAction = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.toolbar.moveAction(
        activitiesExplorerActionId.startActivity,
        activitiesExplorerActionId.assignActivity,
    );
};
