import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addCreateWorkflowTaskAction } from './addCreateWorkflowTaskAction';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addCreateWorkflowTaskAction(builder);
    },
};

export default extensionModule;
