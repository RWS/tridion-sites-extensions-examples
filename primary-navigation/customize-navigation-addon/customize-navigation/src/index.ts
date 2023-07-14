import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addPlaceholderNavigationItem } from './addPlaceholderNavigationItem';
import { addReplacedNavigationItem } from './addReplacedNavigationItem';
import { deletePlaceholderPrimaryNavigationItem } from './deletePlaceholderPrimaryNavigationItem';
import { moveContentExplorerBeforePlaceholder } from './moveContentExplorerBeforePlaceholder';
import { removeActivitiesExplorer } from './removeActivitiesExplorer';
import { replaceReplacedItemWithContentExplorer } from './replaceReplacedItemWithContentExplorer';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addPlaceholderNavigationItem(builder);
        addReplacedNavigationItem(builder);

        moveContentExplorerBeforePlaceholder(builder);
        replaceReplacedItemWithContentExplorer(builder);
        removeActivitiesExplorer(builder);
        deletePlaceholderPrimaryNavigationItem(builder);
    },
};

export default extensionModule;
