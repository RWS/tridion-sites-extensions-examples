import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { contentExplorerActionId } from '@tridion-sites/extensions';

export const customizeReplacingActionsGroup = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        newLabel: 'New Label',
        initialLabel: 'Initial label',
    });

    builder.contentExplorer.tree.contextMenu.addGroup({
        id: 'replacingGroup',
        actionIds: [],
        label: t('initialLabel'),
    });

    builder.contentExplorer.tree.contextMenu.customizeGroup(config => {
        const replacingGroupIndex = config.findIndex(item => item.id === 'replacingGroup');

        if (replacingGroupIndex !== -1) {
            config.splice(replacingGroupIndex, 1, {
                id: 'replacingGroup',
                label: t('newLabel'),
                actionIds: [contentExplorerActionId.localize, contentExplorerActionId.refresh],
            });
        }
    });
};
