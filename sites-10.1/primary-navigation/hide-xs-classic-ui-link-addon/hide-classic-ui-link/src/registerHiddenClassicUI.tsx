import { type ExtensionBuilder } from '@tridion-sites/extensions';
import { infoMenuItemId } from '@tridion-sites/extensions';

export const registerHiddenClassicUI = (builder: ExtensionBuilder) => {
    builder.header.infoMenu.config.remove(infoMenuItemId.classicUI);
};
