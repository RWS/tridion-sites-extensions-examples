import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { initializeGlobals } from '@globals';
import { removeSingleLineWrappingParagraph } from './removeSingleLineWrappingParagraph';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        removeSingleLineWrappingParagraph(builder)
    },
};

export default extensionModule;
