import { memo, useMemo } from 'react';

import { getConfiguration } from '@globals';
import type { TableColumnExtensionComponentProps } from '@tridion-sites/extensions';
import { Stack } from '@tridion-sites/extensions';
import type { RepositoryLocalObject } from '@tridion-sites/models';
import { type IdentifiableObject } from '@tridion-sites/models';

import { getItemPublishInfo } from './getItemPublishInfo';
import { groupPublishInfoByTargetTypeId } from './groupPublishInfoByTargetTypeId';
import { PublishingStatus } from './PublishingStatus';

type PublicationId = string;
interface PublishableTargetType {
    id: string;
    title: string;
}
interface PublishToColumnConfig {
    /**
     * It defines the available publishable target types and the order in which they are displayed for an item
     * based on the item's publication ID.
     */
    targetTypesPerPublication: Record<PublicationId, ReadonlyArray<PublishableTargetType>>;
}

export const PublishedToColumnCell = memo(({ item }: TableColumnExtensionComponentProps<IdentifiableObject>) => {
    const publishInfoByTargetTypeId = useMemo(() => {
        const itemPublishInfo = getItemPublishInfo(item);
        if (!itemPublishInfo) return undefined;

        return groupPublishInfoByTargetTypeId(itemPublishInfo);
    }, [item]);

    if (!publishInfoByTargetTypeId) {
        return null;
    }

    const configuration = getConfiguration<PublishToColumnConfig>();
    if (!configuration?.targetTypesPerPublication) return null;

    const publicationId = (item as RepositoryLocalObject).locationInfo?.contextRepository?.idRef;
    if (!publicationId) return null;

    const publishableTargetTypes = configuration.targetTypesPerPublication[publicationId.asString];

    if (!publishableTargetTypes || publishableTargetTypes.length === 0) {
        return null;
    }

    return (
        <Stack direction="row" itemGap="xs" verticalAlignment="center" horizontalAlignment="start">
            {publishableTargetTypes.map(targetType => {
                const publishInfo = publishInfoByTargetTypeId.get(targetType.id);

                if (publishInfo) {
                    return (
                        <PublishingStatus
                            type="published"
                            key={targetType.id}
                            id={targetType.id}
                            title={targetType.title}
                            user={publishInfo.user}
                            date={publishInfo.date}
                            isUpToDate={publishInfo.isUpToDate}
                            isLastToPublish={publishInfo.isLastToPublish}
                        />
                    );
                }
                return (
                    <PublishingStatus
                        type="unpublished"
                        key={targetType.id}
                        id={targetType.id}
                        title={targetType.title}
                    />
                );
            })}
        </Stack>
    );
});

PublishedToColumnCell.displayName = 'PublishedToColumnCell';
