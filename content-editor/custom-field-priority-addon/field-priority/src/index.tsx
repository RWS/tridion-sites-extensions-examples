import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addAnyTypeField } from './addAnyTypeField';
import { addNumberField } from './addNumberField';

const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        /**
         * This extension demonstrates the usage of the 'priority' property.
         * It becomes valuable when multiple extensions meet the requirements, but only one of them should be applied.
         *
         * - "anyTypeField" extension registered with priority 1
         * - "numberField" extension registered with priority 2
         *
         * If the "isAvailable" conditions of both extensions evaluate to true,
         * the "numberField" extension will take precedence and be applied.
         */
        addAnyTypeField(builder);
        addNumberField(builder);
    },
};

export default extensionModule;
