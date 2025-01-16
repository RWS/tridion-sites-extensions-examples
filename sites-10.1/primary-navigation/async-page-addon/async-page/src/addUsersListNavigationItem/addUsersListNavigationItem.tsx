import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { UsersPage } from './UsersPage';

const usersListPageId = 'usersListPage';

/**
 * Registers primary navigation item that linked to Page with asynchronously loaded list of registered users in Tridion.
 * Example uses Extension API components - to style and format content, queries - to retrieve, cache and manage state of any OpenAPI data.
 * All the strings respect current language of Tridion Sites (as soon as it's one of [English, Spanish, Dutch]).
 */
export const addUsersListNavigationItem = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        usersListPageLabel: 'Users list',
        usersListHeaderLabel: 'Users list:',
        loadingMessage: 'Loading users...',
    });

    builder.translations.addTranslation('es', {
        usersListPageLabel: 'Lista de usuarios',
        usersListHeaderLabel: 'Lista de usuarios:',
        loadingMessage: 'Cargando usuarios...',
    });

    builder.translations.addTranslation('nl', {
        usersListPageLabel: 'Gebruikers lijst',
        usersListHeaderLabel: 'Gebruikers lijst:',
        loadingMessage: 'Gebruikers laden...',
    });

    builder.header.navigation.register(() => ({
        id: usersListPageId,
        routePath: '/users-list',
        routeComponent: UsersPage,
        useNavigationItem: () => {
            return {
                label: t('usersListPageLabel'),
                isAvailable: true,
            };
        },
    }));

    builder.header.navigation.config.add(usersListPageId);
};
