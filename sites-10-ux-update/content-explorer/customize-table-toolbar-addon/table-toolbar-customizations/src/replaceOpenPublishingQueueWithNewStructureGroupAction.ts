import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionId } from '@tridion-sites/extensions';

export const replaceOpenPublishingQueueWithNewStructureGroupAction = (builder: ExtensionBuilder) => {
    /**
     * Sites 10 UX update has separate Publishing queue page and because of that action was removed from the default toolbar config.
     * This creates good example of why extension should not rely on presence of any known action.
     * It can be removed at any time by core application or by other extension.
     * In cases when you need to make sure action is there - use `customizeGroup()` endpoint instead (See `./customizeReplacingActionsGroup.ts`).
     */
    builder.contentExplorer.table.toolbar.replaceAction(
        contentExplorerActionId.openPublishingQueue,
        contentExplorerActionId.newStructureGroup,
    );
};
