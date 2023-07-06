import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionGroupId, contentExplorerActionId } from '@tridion-sites/extensions';

export const replaceRefreshingActionsGroup = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        groupLabel: 'Replacing Group',
    });

    builder.contentExplorer.table.toolbar.replaceGroup(contentExplorerActionGroupId.refreshing, {
        actionIds: [
            contentExplorerActionId.newComponent,
            contentExplorerActionId.newPage,
            contentExplorerActionId.refresh,
        ],
        id: 'replacingGroup',
        label: t('groupLabel'),
    });
};
