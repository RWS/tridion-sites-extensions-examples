import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

export const replacedNavigationItemId = 'replacedNavigationItem';

/**
 * Adds dummy primary navigation item that will be replaced by another item (see ./replaceReplacedItemWithContentExplorer.ts).
 */
export const addReplacedNavigationItem = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        itemReplacedLabel: 'This item should be replaced',
    });

    builder.header.navigation.register(() => ({
        id: replacedNavigationItemId,
        routePath: '/replaced',
        routeComponent: () => null,
        useNavigationItem: () => {
            return {
                label: t('itemReplacedLabel'),
                isInitialized: true,
                isAvailable: true,
            };
        },
    }));

    builder.header.navigation.config.add(replacedNavigationItemId);
};
