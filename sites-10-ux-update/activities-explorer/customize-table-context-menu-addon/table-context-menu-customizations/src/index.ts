import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { registerActionGroupsExtensions } from './actionGroups';
import { registerActionsExtensions } from './actions';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        registerActionsExtensions(builder);
        registerActionGroupsExtensions(builder);
    },
};

export default extensionModule;
