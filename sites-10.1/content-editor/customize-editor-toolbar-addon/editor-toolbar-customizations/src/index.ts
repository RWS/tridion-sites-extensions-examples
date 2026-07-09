import { initializeGlobals } from '@globals';
import type { ExtensionModule, RuntimeInformation } from '@tridion-sites/extensions';

import packageJson from '../package.json';
import { configureEditorToolbar } from './configureEditorToolbar';

/**
 * Example that demonstrates the Content Editor toolbar extension point (available since 10.1.3).
 *
 * It registers a custom toolbar item for pages that shows publish status at a glance
 * as a segmented pie chart (one section per target), with per-target details in a hover popover
 * (using Floating UI — https://floating-ui.com/),
 * then customizes the toolbar:
 * - adds the custom item before Finish
 * - removes Revert
 * - moves Save to the end
 * - bubbles extension-registered items to the front via config.customize
 *
 * Publish data is loaded with useItemPublishedToQuery, useItemQuery, and usePublishableTargetTypesQuery.
 */
const extensionModule: ExtensionModule = {
    runtimeInfo: packageJson as RuntimeInformation,
    initializeGlobals,
    initialize: builder => {
        configureEditorToolbar(builder);
    },
};

export default extensionModule;
