import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { customizeReplacingActionsGroup } from './customizeReplacingActionsGroup';
import { movePublishingActionsGroup } from './movePublishingActionsGroup';
import { moveUnpublishBeforePublishUnpublishAction } from './moveUnpublishBeforePublishUnpublishAction';
import { removeClipboardActionsGroup } from './removeClipboardActionsGroup';
import { removeLocalizeAction } from './removeLocalizeAction';
import { replaceAddSelectedItemsToBundleWithNewStructureGroupAction } from './replaceAddSelectedItemsToBundleWithNewStructureGroupAction';
import { replaceRefreshingActionsGroup } from './replaceRefreshingActionsGroup';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        moveUnpublishBeforePublishUnpublishAction(builder);
        removeLocalizeAction(builder);
        replaceAddSelectedItemsToBundleWithNewStructureGroupAction(builder);

        movePublishingActionsGroup(builder);
        removeClipboardActionsGroup(builder);
        replaceRefreshingActionsGroup(builder);
        customizeReplacingActionsGroup(builder);
    },
};

export default extensionModule;
