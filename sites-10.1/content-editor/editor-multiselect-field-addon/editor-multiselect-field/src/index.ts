import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { registerMultiselectField } from './registerMultiselectField';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        registerMultiselectField(builder);
    },
};

export default extensionModule;
