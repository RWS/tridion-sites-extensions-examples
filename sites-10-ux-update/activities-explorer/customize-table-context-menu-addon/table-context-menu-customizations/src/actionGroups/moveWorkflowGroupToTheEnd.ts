import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionGroupId } from '@tridion-sites/extensions';

/**
 * Moves `Workflow` action group to the end of the context menu.
 */
export const moveWorkflowGroupToTheEnd = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.contextMenu.moveGroup(activitiesExplorerActionGroupId.workflow, undefined);
};
