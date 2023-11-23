import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { customizeReplacingActionsGroup } from './customizeReplacingActionsGroup';
import { movePublishingActionGroup } from './movePublishingActionGroup';
import { moveUnpublishBeforePublishAction } from './moveUnpublishBeforePublishAction';
import { removeClipboardActionGroup } from './removeClipboardActionGroup';
import { removeNewPageAction } from './removeNewPageAction';
import { replaceAddSelectedItemsToBundleWithNewStructureGroupAction } from './replaceAddSelectedItemsToBundleWithNewStructureGroupAction';
import { replaceRefreshingActionGroup } from './replaceRefreshingActionGroup';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        customizeReplacingActionsGroup(builder);
        movePublishingActionGroup(builder);
        removeClipboardActionGroup(builder);
        replaceRefreshingActionGroup(builder);

        moveUnpublishBeforePublishAction(builder);
        removeNewPageAction(builder);
        replaceAddSelectedItemsToBundleWithNewStructureGroupAction(builder);
    },
};

export default extensionModule;
