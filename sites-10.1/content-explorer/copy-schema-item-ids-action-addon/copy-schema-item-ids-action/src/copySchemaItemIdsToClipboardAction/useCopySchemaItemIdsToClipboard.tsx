import { useCallback } from 'react';

import { t } from '@globals';
import { useNotifications, useOptionalContentExplorerTable } from '@tridion-sites/extensions';
import { copyTextToClipboard } from '../copyTextToClipboard';
import { Schema } from '@tridion-sites/models';

// Hook which allows to copy to clipboard the list of selected schema ids
export const useCopySchemaItemIdsToClipboardAction = () => {
    const { notify } = useNotifications();
    // The result of this hook is being used as a source for the selection state here.
    // It gives an access to currently selected items of the table that can be used to perform the custom action.
    const contentExplorerTable = useOptionalContentExplorerTable();

    const execute = useCallback(() => {
        // Filters items based on a criteria of the item type required being Schema
        const filteredItems = Array.from(contentExplorerTable?.selection.selectedItems || []).filter(
            i => i instanceof Schema,
        );
        const selectedSchemaIds = filteredItems.map(i => i.id.asString);
        const textValue = selectedSchemaIds.join(', ');
        void copyTextToClipboard(textValue);
        notify({
            title: t('copySchemaItemIdsToClipboard.notification.title'),
            description: t('copySchemaItemIdsToClipboard.notification.description', {
                count: filteredItems.length,
            }),
            type: 'success',
        });
    }, [contentExplorerTable?.selection.ids, notify]);

    return {
        // Action is available only if at least one of the items selected is a Schema
        isAvailable: contentExplorerTable?.selection.selectedItems.some(i => i instanceof Schema) || false,
        execute,
    };
};
