import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { activitiesExplorerActionGroupId, activitiesExplorerActionId } from '@tridion-sites/extensions';

/**
 * Creates a new action group that replaces 'Exporting' group in the context menu.
 * The new group contains two pre-existing actions: 'Export' and 'Restart Activity'.
 * We also utilize translations functionality to provide localized strings in different languages.
 */
export const replaceExportingGroup = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', { newGroupLabel: 'New group' });
    builder.translations.addTranslation('de', { newGroupLabel: 'Neue gruppe' });
    builder.translations.addTranslation('fr', { newGroupLabel: 'Nouveau groupe' });

    builder.activitiesExplorer.table.contextMenu.replaceGroup(activitiesExplorerActionGroupId.exporting, {
        id: 'newGroup',
        label: t('newGroupLabel'),
        actionIds: [activitiesExplorerActionId.export, activitiesExplorerActionId.restartActivity],
    });
};
