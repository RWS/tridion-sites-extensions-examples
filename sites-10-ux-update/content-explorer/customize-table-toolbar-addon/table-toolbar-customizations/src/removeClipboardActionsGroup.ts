import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionGroupId } from '@tridion-sites/extensions';

export const removeClipboardActionsGroup = (builder: ExtensionBuilder) => {
    builder.contentExplorer.table.toolbar.removeGroup(contentExplorerActionGroupId.clipboard);
};
