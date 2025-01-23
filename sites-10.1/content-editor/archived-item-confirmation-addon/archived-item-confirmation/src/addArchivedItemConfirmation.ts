import { ContentEditorViewHookProps, ExtensionBuilder } from '@tridion-sites/extensions';
import { ItemEditorWrapper } from './ItemEditorWrapper';
import { RepositoryLocalObject } from '@tridion-sites/models';

export const addArchivedItemConfirmation = (builder: ExtensionBuilder) => {
    // First let's add all necessary translation strings
    builder.translations.addTranslation('en', {
        confirmationDialog: {
            title: 'Archived item',
            description:
                'You are opening an archived item. Please DO NOT edit and publish the item unless the item needs to be updated and republished due to an approved business requirement',
        },
    });

    // Then let's add new item editor to Content Editor with the provided criteria of availability
    builder.contentEditor.addItemEditor(() => ({
        id: 'archivedItemConfirmation',
        component: ItemEditorWrapper,
        useContentEditorView: ({ isReadonly, item }: ContentEditorViewHookProps) => {
            if (!(item instanceof RepositoryLocalObject))
                return {
                    isAvailable: false,
                };

            return {
                isAvailable: !isReadonly,
            };
        },
    }));
};
