import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionGroupId } from '@tridion-sites/extensions';

/**
 * Moves `Workflow` action group to the end of the toolbar.
 */
export const moveWorkflowGroupToTheEnd = (builder: ExtensionBuilder) => {
    builder.activitiesExplorer.table.toolbar.moveGroup(activitiesExplorerActionGroupId.workflow, undefined);
};
