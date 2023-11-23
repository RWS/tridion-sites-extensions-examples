import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { isItemNode, useContentExplorer } from '@tridion-sites/extensions';
import { BusinessProcessTypes, KeywordCategory, Publication, Taxonomies } from '@tridion-sites/models';

import { SchemaPurposeColumn } from './SchemaPurposeColumn';

export const addSchemaPurposeColumn = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        schemaPurposeColumnExtension: 'Schema purpose',
        schemaPurpose: {
            component: 'Component',
            multimedia: 'Multimedia',
            embedded: 'Embedded',
            metadata: 'Metadata',
            protocol: 'Protocol',
            virtualFolderType: 'Virtual folder',
            templateParameters: 'Template parameters',
            bundle: 'Bundle',
            region: 'Region',
        },
    });

    builder.contentExplorer.table.addColumn(() => {
        const { currentNode } = useContentExplorer();
        const isItemApplicable =
            isItemNode(currentNode) &&
            !(
                currentNode.data.item instanceof Publication ||
                currentNode.data.item instanceof KeywordCategory ||
                currentNode.data.item instanceof BusinessProcessTypes ||
                currentNode.data.item instanceof Taxonomies
            );

        return {
            id: 'schemaPurposeColumnExtension',
            useColumn: () => {
                return {
                    title: t('schemaPurposeColumnExtension'),
                    isResizable: true,
                    minWidth: 100,
                    isAvailable: isItemApplicable && !!currentNode.data.item,
                };
            },
            component: SchemaPurposeColumn,
        };
    });
};
