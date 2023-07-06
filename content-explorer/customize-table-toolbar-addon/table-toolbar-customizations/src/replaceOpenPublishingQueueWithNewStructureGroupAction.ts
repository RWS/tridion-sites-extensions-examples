import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionId } from '@tridion-sites/extensions';

export const replaceOpenPublishingQueueWithNewStructureGroupAction = (builder: ExtensionBuilder) => {
    builder.contentExplorer.table.toolbar.replaceAction(
        contentExplorerActionId.openPublishingQueue,
        contentExplorerActionId.newStructureGroup,
    );
};
