import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';
import { registerCopySchemaItemIdsToClipboard } from './copySchemaItemIdsToClipboardAction';

import packageJson from '../package.json';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        registerCopySchemaItemIdsToClipboard(builder);
    },
};

export default extensionModule;
