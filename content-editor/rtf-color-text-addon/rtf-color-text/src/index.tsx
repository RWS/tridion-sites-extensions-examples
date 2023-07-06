import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addRTFColorText } from './addRTFColorText';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addRTFColorText(builder);
    },
};

export default extensionModule;
