import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { WorkItemsColumnCell } from './WorkItemsColumnCell';

/**
 * Adds 'Work Items' column to Activities Explorer table.
 * It shows a link to the primary item and also renders a popover
 * with a list of all work items available for the given activity instance.
 */
export const registerWorkItemsColumn = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        title: 'Work Items',
        loadingMessage: 'Loading...',
    });

    builder.activitiesExplorer.table.addColumn(() => ({
        id: 'workItemsColumn',
        component: WorkItemsColumnCell,
        useColumn: () => {
            return {
                title: t('title'),
                minWidth: 150,
                isResizable: true,
                isAvailable: true,
            };
        },
    }));
};
