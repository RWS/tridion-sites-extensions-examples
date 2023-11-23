import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionId } from '@tridion-sites/extensions';

export const replaceAddSelectedItemsToBundleWithNewStructureGroupAction = (builder: ExtensionBuilder) => {
    builder.contentExplorer.table.contextMenu.replaceAction(
        contentExplorerActionId.addSelectedItemsToBundle,
        contentExplorerActionId.newStructureGroup,
    );
};
