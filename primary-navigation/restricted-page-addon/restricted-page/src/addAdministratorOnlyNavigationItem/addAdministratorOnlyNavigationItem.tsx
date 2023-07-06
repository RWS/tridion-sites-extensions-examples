import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useUserProfile } from '@tridion-sites/extensions';

import { AdministratorOnlyPage } from './AdministratorOnlyPage';

const administratorOnlyPageLabelId = 'administratorOnlyPageLabel';

/**
 * Adds primary navigation item to a Page that is shown only to Publication or System administrators.
 * Example uses `useUserProfile` hook that gives information about current User profile. Based on that we can define whether current user is an Administrator.
 */
export const addAdministratorOnlyNavigationItem = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        administratorOnlyPageLabel: 'Administrator only',
        bodyMessage: 'You can see this page because you are an administrator.',
        // String templates can be used to combine variable data with translatable text. Make sure your keys match when passing data.
        hiUserMessage: 'Hi, {{userName}}!',
    });

    builder.translations.addTranslation('es', {
        administratorOnlyPageLabel: 'Solo administrador(a)',
        bodyMessage: 'Puedes ver esta página porque eres administrador.',
        hiUserMessage: 'Hola, {{userName}}!',
    });

    builder.translations.addTranslation('nl', {
        administratorOnlyPageLabel: 'Alleen beheerder',
        bodyMessage: 'U kunt deze pagina zien omdat u een beheerder bent.',
        hiUserMessage: 'Hoi, {{userName}}!',
    });

    builder.header.navigation.register(() => ({
        id: administratorOnlyPageLabelId,
        routePath: '/administrator-only',
        routeComponent: AdministratorOnlyPage,
        useNavigationItem: () => {
            const { userProfile } = useUserProfile();

            return {
                label: t('administratorOnlyPageLabel'),
                isInitialized: true,
                isAvailable: !!userProfile.runtime?.isAdministrator,
            };
        },
    }));

    builder.header.navigation.config.add(administratorOnlyPageLabelId);
};
