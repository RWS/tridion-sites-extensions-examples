import type { PublishInfo, TargetType } from '@tridion-sites/models';

export interface PublishTargetStatus {
    targetId: string;
    targetTitle: string;
    isPublished: boolean;
    publishedAt?: string;
    publishedBy?: string;
}

const mapPublishedTargets = (publishedTo: ReadonlyArray<PublishInfo>): ReadonlyArray<PublishTargetStatus> =>
    publishedTo.flatMap(publishInfo => {
        const targetType = publishInfo.targetType;
        if (!targetType) return [];

        return [
            {
                targetId: targetType.idRef.asString,
                targetTitle: targetType.title ?? targetType.idRef.asString,
                isPublished: true,
                publishedAt: publishInfo.publishedAt,
                publishedBy: publishInfo.user?.title,
            },
        ];
    });

export const buildTargetStatuses = (
    targetTypes: ReadonlyArray<TargetType> | undefined,
    publishedTo: ReadonlyArray<PublishInfo> | undefined,
): ReadonlyArray<PublishTargetStatus> => {
    const publishedItems = publishedTo ?? [];

    if (targetTypes?.length) {
        const publishedByTargetId = new Map(
            publishedItems.flatMap(publishInfo => {
                const targetType = publishInfo.targetType;
                if (!targetType) return [];

                return [[targetType.idRef.asString, publishInfo] as const];
            }),
        );

        return targetTypes.map(targetType => {
            const publishInfo = publishedByTargetId.get(targetType.id.asString);

            return {
                targetId: targetType.id.asString,
                targetTitle: targetType.title ?? targetType.id.asString,
                isPublished: !!publishInfo,
                publishedAt: publishInfo?.publishedAt,
                publishedBy: publishInfo?.user?.title,
            };
        });
    }

    if (publishedItems.length) {
        return mapPublishedTargets(publishedItems);
    }

    return [];
};
