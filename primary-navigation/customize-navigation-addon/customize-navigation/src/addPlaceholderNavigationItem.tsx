import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { Text } from '@tridion-sites/extensions';

export const placeholderNavigationItemId = 'placeholderNavigationItem';

/**
 * Adds dummy placeholder primary navigation item that shows simple text on the page and is going to be deleted (see ./deletePlaceholderPrimaryNavigationItem.ts).
 */
export const addPlaceholderNavigationItem = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        placeholderPageContent: 'There is nothing here',
        itemBlankLabel: 'Blank',
    });

    builder.header.navigation.register(() => ({
        id: placeholderNavigationItemId,
        routePath: '/placeholder',
        routeComponent: () => <Text>{t('placeholderPageContent')}</Text>,
        useNavigationItem: () => {
            return {
                label: t('itemBlankLabel'),
                isInitialized: true,
                isAvailable: true,
            };
        },
    }));

    builder.header.navigation.config.add(placeholderNavigationItemId);
};
