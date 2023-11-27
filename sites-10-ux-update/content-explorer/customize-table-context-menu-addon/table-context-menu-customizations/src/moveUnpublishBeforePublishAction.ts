import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionId } from '@tridion-sites/extensions';

export const moveUnpublishBeforePublishAction = (builder: ExtensionBuilder) => {
    builder.contentExplorer.table.contextMenu.moveAction(
        contentExplorerActionId.unpublish,
        contentExplorerActionId.publish,
    );
};
