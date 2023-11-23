import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addAdministratorOnlyNavigationItem } from './addAdministratorOnlyNavigationItem';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addAdministratorOnlyNavigationItem(builder);
    },
};

export default extensionModule;
