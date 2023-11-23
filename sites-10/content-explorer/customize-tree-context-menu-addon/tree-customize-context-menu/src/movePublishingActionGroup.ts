import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionGroupId } from '@tridion-sites/extensions';

export const movePublishingActionGroup = (builder: ExtensionBuilder) => {
    builder.contentExplorer.tree.contextMenu.moveGroup(contentExplorerActionGroupId.publishing, undefined);
};
