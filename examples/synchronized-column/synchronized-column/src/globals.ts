import { createExtensionGlobals } from '@tridion-sites/extensions';

const { initialize: initializeGlobals, t } = createExtensionGlobals();

export { initializeGlobals, t };
