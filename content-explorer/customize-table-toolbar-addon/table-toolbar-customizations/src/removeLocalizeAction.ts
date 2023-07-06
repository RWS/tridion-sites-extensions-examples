import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionId } from '@tridion-sites/extensions';

export const removeLocalizeAction = (builder: ExtensionBuilder) => {
    builder.contentExplorer.table.toolbar.removeAction(contentExplorerActionId.localize);
};
