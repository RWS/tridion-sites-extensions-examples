import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { editorPanelId } from '@tridion-sites/extensions';
import { Bundle } from '@tridion-sites/models';

import { BundleItemsTab } from './BundleItemsTab';

export const addBundleItemsTab = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        panel: {
            label: 'Items',
        },
        filter: {
            label: 'Filter by type',
            all: 'All types',
        },
        table: {
            titleColumn: 'Title',
            schemaColumn: 'Schema',
            owningPublicationColumn: 'Owning Publication',
            isLocalColumn: 'Is Local',
        },
        noItems: 'This bundle contains no items.',
        noMatchingItems: 'No items match the selected filter.',
        isLocal: {
            yes: 'Yes',
            no: 'No',
        },
        error: 'An error occurred while loading bundle items.',
        remove: 'Remove',
        removeConfirmationTitle: 'Remove items',
        removeConfirmationMessage: 'Are you sure you want to remove {{count}} item(s) from this bundle?',
    });

    builder.contentEditor.panels.register<Bundle>(() => ({
        id: 'bundleItemsTab',
        contentComponent: BundleItemsTab,
        usePanel: ({ item }) => ({
            isAvailable: item instanceof Bundle,
            label: t('panel.label'),
        }),
    }));

    builder.contentEditor.panels.config.add('bundleItemsTab', editorPanelId['where-used']);
};
