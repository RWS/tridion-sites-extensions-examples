import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addPushHelloNotificationAction } from './PushHelloNotificationAction';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addPushHelloNotificationAction(builder);
    },
};

export default extensionModule;
