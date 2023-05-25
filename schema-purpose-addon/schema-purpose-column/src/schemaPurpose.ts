import { t } from '@globals';
import { ExtensionBuilder, isItemNode, useContentExplorer } from '@tridion-sites/extensions';

import { SchemaPurposeColumn } from './SchemaPurposeColumn';
import { BusinessProcessTypes, KeywordCategory, Publication, Taxonomies } from '@tridion-sites/models';

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

    builder.contentExplorer.table.addColumn(() => ({
        id: 'schemaPurposeColumnExtension',
        title: t('schemaPurposeColumnExtension'),
        isResizable: true,
        minWidth: 100,
        component: SchemaPurposeColumn,
        useIsAvailable: () => {
            const { currentNode } = useContentExplorer();
            const isItemApplicable =
                isItemNode(currentNode) &&
                !(
                    currentNode.data.item instanceof Publication ||
                    currentNode.data.item instanceof KeywordCategory ||
                    currentNode.data.item instanceof BusinessProcessTypes ||
                    currentNode.data.item instanceof Taxonomies
                );

            return isItemApplicable && !!currentNode.data.item;
        },
    }));
};
