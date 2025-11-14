import { createExtensionGlobals } from '@tridion-sites/extensions';

const { initialize: initializeGlobals, t, getConfiguration } = createExtensionGlobals();

export { initializeGlobals, t, getConfiguration };
