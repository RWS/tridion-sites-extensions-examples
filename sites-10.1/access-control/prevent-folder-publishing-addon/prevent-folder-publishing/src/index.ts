import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { initializeGlobals } from '@globals';
import { registerAccessControlExtensions } from './registerAccessControlExtensions';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        registerAccessControlExtensions(builder);
    },
};

export default extensionModule;
