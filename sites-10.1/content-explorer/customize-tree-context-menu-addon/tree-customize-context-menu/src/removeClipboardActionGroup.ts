import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionGroupId } from '@tridion-sites/extensions';

export const removeClipboardActionGroup = (builder: ExtensionBuilder) => {
    builder.contentExplorer.tree.contextMenu.removeGroup(contentExplorerActionGroupId.clipboard);
};
