import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';
import { initializeGlobals } from '@globals';

import packageJson from '../package.json';
import { addSchemaPurposeColumn } from './schemaPurpose';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addSchemaPurposeColumn(builder);
    },
};

export default extensionModule;
