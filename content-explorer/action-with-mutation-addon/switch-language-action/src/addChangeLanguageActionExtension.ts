import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { addChangeToDutchAction } from './addChangeToDutchAction';
import { addChangeToEnglishAction } from './addChangeToEnglishAction';

export const addChangeLanguageActionExtension = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        groupTitle: 'Languages',
        errorTitle: 'Error occurred while trying to switch the language',
        en: {
            buttonTitle: 'Switch language to EN',
            notification: {
                title: `Language change`,
                description: `Your language is set to EN, please refresh the page.`,
            },
        },
        nl: {
            buttonTitle: 'Switch language to NL',
            notification: {
                title: `Language change`,
                description: `Your language is set to NL, please refresh the page.`,
            },
        },
    });

    builder.translations.addTranslation('nl', {
        groupTitle: 'Talen',
        errorTitle: 'Er is een fout opgetreden bij het wisselen van taal',
        en: {
            buttonTitle: 'Schakel taal naar EN',
            notification: {
                title: `Taal verandering`,
                description: `Uw taal is ingesteld op EN, ververs de pagina.`,
            },
        },
        nl: {
            buttonTitle: 'Schakel taal naar NL',
            notification: {
                title: `Taal verandering`,
                description: `Uw taal is ingesteld op NL, ververs de pagina.`,
            },
        },
    });

    addChangeToDutchAction(builder);
    addChangeToEnglishAction(builder);

    const newActionGroup = {
        id: 'languages',
        label: t('groupTitle'),
        actionIds: ['langToNl', 'langToEn'],
    };

    builder.contentExplorer.table.toolbar.addGroup(newActionGroup);
};
