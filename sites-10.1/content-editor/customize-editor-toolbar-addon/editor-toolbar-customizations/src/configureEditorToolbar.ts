import type {
    ContentEditorToolbarExtension,
    ContentEditorToolbarExtensionHookProps,
    ExtensionBuilder,
} from '@tridion-sites/extensions';
import { editorToolbarItemId } from '@tridion-sites/extensions';
import { Page } from '@tridion-sites/models';

import { PublishStatusIndicator } from './PublishStatusIndicator';

export const CUSTOM_TOOLBAR_ITEM_ID = 'toolbarExtensionCustomItem';

const customToolbarItem: ContentEditorToolbarExtension = () => ({
    id: CUSTOM_TOOLBAR_ITEM_ID,
    useToolbarItem: ({ item }: ContentEditorToolbarExtensionHookProps) => {
        return { isAvailable: item instanceof Page };
    },
    component: PublishStatusIndicator,
});

export const configureEditorToolbar = (builder: ExtensionBuilder): void => {
    builder.translations.addTranslation('en', {
        popup: {
            loading: 'Loading publish information...',
            error: 'Unable to load publish information.',
            noTargets: 'Not published to any target',
            publishedAt: 'Published on {{date}}',
            publishedBy: 'by {{user}}',
            notPublished: 'Not published',
            unknownDate: 'unknown date',
        },
    });

    // Registers a custom toolbar item. Not visible until its ID is added via config.
    builder.contentEditor.toolbar.register(customToolbarItem);

    // Makes the custom item visible, placed before the finish button.
    builder.contentEditor.toolbar.config.add(CUSTOM_TOOLBAR_ITEM_ID, editorToolbarItemId.finish);

    // Hides the revert button from the toolbar entirely.
    builder.contentEditor.toolbar.config.remove(editorToolbarItemId.revert);

    // Moves the save button to the end of the toolbar configuration.
    builder.contentEditor.toolbar.config.move(editorToolbarItemId.save);

    // --- config.customize ---
    // Provides direct access to the underlying list for complex transformations
    // that cannot be expressed with add/move/remove alone.
    // `currentList` reflects all prior config changes (add, remove, move above).
    // `defaultList` is the original built-in list — use it only as a reference.
    // NOTE: always mutate `currentList` in place; never replace it using `defaultList`
    //       as the source, or any custom-registered items will be lost.
    //
    // Example: bubble all extension-registered items (not in defaultList) to the front.
    builder.contentEditor.toolbar.config.customize((currentList, defaultList) => {
        const defaultIds = new Set(defaultList);
        const extensionItems = currentList.filter(id => !defaultIds.has(id));
        const builtInItems = currentList.filter(id => defaultIds.has(id));
        currentList.splice(0, currentList.length, ...extensionItems, ...builtInItems);
    });
};
