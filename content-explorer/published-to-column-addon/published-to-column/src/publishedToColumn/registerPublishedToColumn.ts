import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { PublishedToColumnCell } from './PublishedToColumnCell';

/**
 * Adds 'Published to' column to Context Explorer table.
 * It makes use of data that has been prepared by the data extenders.
 */
export const registerPublishedToColumn = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        title: 'Published to',
        tooltip: {
            target: 'Target',
            published: 'Published',
            publishedBy: 'Published By',
        },
    });

    builder.contentExplorer.table.addColumn(() => ({
        id: 'publishedToColumn',
        component: PublishedToColumnCell,
        useColumn: () => {
            return {
                title: t('title'),
                minWidth: 100,
                isResizable: true,
                isAvailable: true,
            };
        },
    }));
};
