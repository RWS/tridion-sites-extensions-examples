import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { addArchivedItemConfirmation } from './addArchivedItemConfirmation';

/**
 * Example that shows warning about archived content before allowing user to edit component.
 * Warning is shown only for editable version of the component, readonly mode is ignored.
 *
 * This example requires content preparation:
 * 1. Create Category with "archived" keyword
 * 2. Create a schema with a metadata text field with id `contentState`, allow Category (step 1) to be a value.
 * 3. Copy `tcmUri` of the `archived` keyword to `archived-keyword` in `apps\addon-example\addon-example.config.json`.
 * 4. Open the component and select archived keyword in the created metadata field.
 */
const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        addArchivedItemConfirmation(builder);
    },
};

export default extensionModule;
