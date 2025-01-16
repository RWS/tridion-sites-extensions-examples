import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { initializeGlobals } from './globals';
import { addPublishTransactionsNavigationItem } from './publishTransactionsNavigationItem';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addPublishTransactionsNavigationItem(builder);
    },
};

export default extensionModule;
