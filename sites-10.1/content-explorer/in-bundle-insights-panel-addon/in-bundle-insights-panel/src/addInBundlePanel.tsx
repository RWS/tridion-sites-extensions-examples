import { t } from '@globals';
import { type ExtensionBuilder, contentExplorerPanelId, Flex, Text, useNotifications } from '@tridion-sites/extensions';
import { type IdentifiableObject } from '@tridion-sites/models';

import { BundleIcon } from './BundleIcon';
import { useInBundleQuery } from './useInBundleQuery';

const panelExtensionId = 'inBundle';

interface InBundlePanelProps {
    item: IdentifiableObject;
}

const Component = ({ item }: InBundlePanelProps) => {
    // API call initiated with this custom hook is not being cached like the one made with react-query
    const { bundles, isLoading } = useInBundleQuery({ item });

    if (isLoading) {
        return (
            <Flex shouldFill={true} mainAxis="center" crossAxis="center">
                <progress />
            </Flex>
        );
    }

    if (!bundles?.length) {
        return <Text>{t('inBundle.noBundle')}</Text>;
    }

    return (
        <Flex shouldFill={true}>
            <ul>
                {bundles.map(bundle => (
                    <li key={bundle.id.asString}>
                        {bundle.title} ({bundle.id.asString})
                    </li>
                ))}
            </ul>
        </Flex>
    );
};

/**
 * Panel which displays the list of bundles which contain the selected item.
 */
export const addInBundlePanel = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        notification: {
            title: 'Error',
            description: 'An error occurred during bundles loading. Try again.',
        },
        inBundle: {
            title: 'In bundle',
            noBundle: 'There are no bundles which contain this item.',
        },
    });

    builder.contentExplorer.insightsPanels.register(() => ({
        id: panelExtensionId,
        component: Component,
        usePanel: () => {
            return {
                title: t('inBundle.title'),
                icon: <BundleIcon />,
                isAvailable: true,
            };
        },
    }));

    builder.contentExplorer.insightsPanels.config.add(panelExtensionId, contentExplorerPanelId.history);
};
