import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { PublishTransactionsPage } from './PublishTransactionsPage';

/**
 * Registers the primary navigation item that linked to Page with a direct request made to the API via OpenAPI client.
 * Translations functionality is utilized to provide localized strings in different languages.
 */
export const addPublishTransactionsNavigationItem = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        navigationItem: {
            label: 'Publish transactions',
            tooltip: 'Publish transactions',
        },
        tableColumnHeaders: {
            name: 'Name',
            target: 'Target',
            publication: 'Publication',
            action: 'Action',
            state: 'State',
            time: 'Time',
        },
        requestErrorNotification: {
            title: 'Error',
            description: 'Publish transactions request has failed.',
        },
    });

    builder.header.navigation.register(() => ({
        id: 'publishTransactions',
        routePath: '/publishTransactions',
        routeComponent: PublishTransactionsPage,
        useNavigationItem: () => {
            return {
                label: t('navigationItem.label'),
                tooltip: t('navigationItem.tooltip'),
                isAvailable: true,
            };
        },
    }));

    builder.header.navigation.config.add('publishTransactions');
};
