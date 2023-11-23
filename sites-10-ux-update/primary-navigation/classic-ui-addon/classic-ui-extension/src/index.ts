import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addPublishingQueueNavigationItem } from './addPublishingQueueNavigationItem';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addPublishingQueueNavigationItem(builder);
    },
};

export default extensionModule;
