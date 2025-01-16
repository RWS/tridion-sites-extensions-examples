import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionId } from '@tridion-sites/extensions';

export const removeNewPageAction = (builder: ExtensionBuilder) => {
    builder.contentExplorer.tree.contextMenu.removeAction(contentExplorerActionId.newPage);
};
