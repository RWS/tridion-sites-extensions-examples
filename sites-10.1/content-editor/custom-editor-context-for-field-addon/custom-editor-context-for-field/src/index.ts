import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { registerCustomEditorWithField } from './registerCustomEditorWithField';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        // Register the custom item-editor wrapper and the custom form field.
        registerCustomEditorWithField(builder);
    },
};

export default extensionModule;
