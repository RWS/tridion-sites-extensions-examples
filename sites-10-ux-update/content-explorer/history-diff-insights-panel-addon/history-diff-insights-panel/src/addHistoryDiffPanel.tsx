import { useCallback, useEffect } from 'react';

import { t } from '@globals';
import { CodeMergeIcon } from './CodeMergeIcon';
import { DiffEditor } from '@monaco-editor/react';
import {
    type ExtensionBuilder,
    contentExplorerPanelId,
    Flex,
    Text,
    useItemHistoryQuery,
    useNotifications,
} from '@tridion-sites/extensions';
import type { IdentifiableObject, VersionedItem } from '@tridion-sites/models';
import { useDiffItem } from './useDiffItem';

const panelExtensionId = 'historyDiff';

interface HistoryDiffPanelProps {
    item: IdentifiableObject;
}

const getVersionLabel = (item: VersionedItem): string => {
    if (item.versionInfo) {
        const majorVersion = item.versionInfo.version || '0';
        const minorVersion = item.versionInfo.revision || '0';
        return `${majorVersion}.${minorVersion}`;
    }

    return '';
};

const Component = ({ item }: HistoryDiffPanelProps) => {
    const handleItemHistoryQueryError = useCallback(() => {
        notify({
            type: 'error',
            title: t('historyDiff.notification.title'),
            description: t('historyDiff.notification.description'),
            showInMessageCenter: true,
        });
    }, []);

    const { data: history, isInitialLoading } = useItemHistoryQuery(item && { itemId: item.id }, {
        onError: handleItemHistoryQueryError,
    });
    const { notify } = useNotifications();

    const { item: originalItem, onItemIdInputChange: onOriginalItemIdChange } = useDiffItem(history || []);
    const { item: modifiedItem, onItemIdInputChange: onModifiedItemIdChange } = useDiffItem(history || []);

    if (isInitialLoading) {
        return (
            <Flex shouldFill={true} mainAxis="center" crossAxis="center">
                <progress />
            </Flex>
        );
    }

    if (history?.length === 1) {
        return <Text>{t('historyDiff.singleVersion')}</Text>;
    }

    return (
        <Flex shouldFill={true}>
            <Flex direction="row">
                <select style={{ width: '100%' }} onChange={onOriginalItemIdChange}>
                    <option key="empty" value={undefined}>
                        {t('historyDiff.select')}
                    </option>
                    {history
                        ?.filter(i => i.id.asString !== modifiedItem?.id.asString)
                        .map(item => (
                            <option key={item.id.asString} value={item.id.asString}>
                                {getVersionLabel(item)}
                            </option>
                        ))}
                </select>
                <select style={{ width: '100%' }} onChange={onModifiedItemIdChange}>
                    <option key="empty" value={undefined}>
                        {t('historyDiff.select')}
                    </option>
                    {history
                        ?.filter(i => i.id.asString !== originalItem?.id.asString)
                        .map(item => (
                            <option key={item.id.asString} value={item.id.asString}>
                                {getVersionLabel(item)}
                            </option>
                        ))}
                </select>
            </Flex>
            {originalItem && modifiedItem && (
                <DiffEditor
                    original={JSON.stringify(originalItem, null, 2)}
                    modified={JSON.stringify(modifiedItem, null, 2)}
                    options={{ readOnly: true }}
                />
            )}
        </Flex>
    );
};

/**
 * Panel that displays a difference between two versions of the same versioned item.
 */
export const addHistoryDiffPanel = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        historyDiff: {
            title: 'Version diff panel',
            select: 'Select a version of the item',
            singleVersion: 'There is only one history record in this item.',
            notification: {
                title: 'Error',
                description: 'An error occurred during loading item versions. Try again.',
            },
        },
    });

    builder.contentExplorer.insightsPanels.register(() => ({
        id: panelExtensionId,
        component: Component,
        usePanel: ({ item }) => {
            const isAvailable = item?.hasListLink('history') || false;
            return {
                title: t('historyDiff.title'),
                icon: <CodeMergeIcon />,
                isAvailable,
            };
        },
    }));

    builder.contentExplorer.insightsPanels.config.add(panelExtensionId, contentExplorerPanelId.history);
};
