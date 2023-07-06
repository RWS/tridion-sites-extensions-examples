import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addChangeLanguageActionExtension } from './addChangeLanguageActionExtension';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addChangeLanguageActionExtension(builder);
    },
};

export default extensionModule;
