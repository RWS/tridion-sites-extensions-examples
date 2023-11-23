import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { isItemNode, useContentExplorer } from '@tridion-sites/extensions';
import { Folder } from '@tridion-sites/models';

import { LinkedSchemaCell } from './LinkedSchemaCell';

export const addLinkedSchemaColumn = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        linkedSchemaColumnExtension: 'Linked Schema',
    });

    builder.translations.addTranslation('nl', {
        linkedSchemaColumnExtension: 'Gekoppeld schema',
    });

    builder.contentExplorer.table.addColumn(() => ({
        id: 'linkedSchemaColumnExtension',
        component: LinkedSchemaCell,
        useColumn: () => {
            const { currentNode } = useContentExplorer();

            return {
                title: t('linkedSchemaColumnExtension'),
                isResizable: true,
                minWidth: 150,
                isAvailable: isItemNode(currentNode) && currentNode.data.item instanceof Folder,
            };
        },
    }));
};
