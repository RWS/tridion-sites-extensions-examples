import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { registerChangeLanguageToDutchAction } from './changeLanguageToDutchAction';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        registerChangeLanguageToDutchAction(builder);
    },
};

export default extensionModule;
