import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionGroupId } from '@tridion-sites/extensions';

export const movePublishingActionsGroup = (builder: ExtensionBuilder) => {
    builder.contentExplorer.table.toolbar.moveGroup(contentExplorerActionGroupId.publishing, undefined);
};
