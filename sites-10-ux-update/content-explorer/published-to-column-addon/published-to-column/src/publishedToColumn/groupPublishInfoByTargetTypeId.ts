import type { PublishInfo } from './extensionProperties';

export interface TargetPublishInfo {
    /**
     * TargetType ID.
     */
    id: string;
    /**
     * TargetType title.
     */
    title: string;
    /**
     * The user who performed the publishing action.
     */
    user: string;
    /**
     * The date when the item was published.
     */
    date: string;
    /**
     * If set to `true`, the item has not been modified since it was last published.
     */
    isUpToDate: boolean;
    /**
     * Indicates whether the item was most recently published to this target type.
     */
    isLastToPublish: boolean;
}

const getTimestamp = (date: string) => new Date(date).getTime();

/**
 * Accepts an array of PublishInfo and determines the most recent date an item was published to any of the targets.
 */
const findLastTargetToPublishDate = (publishInfoItems: ReadonlyArray<PublishInfo>) => {
    if (publishInfoItems.length === 0) return undefined;

    let lastTargetToPublishDate = publishInfoItems[0].Date;
    for (const publishInfo of publishInfoItems) {
        if (getTimestamp(publishInfo.Date) > getTimestamp(lastTargetToPublishDate)) {
            lastTargetToPublishDate = publishInfo.Date;
        }
    }
    return lastTargetToPublishDate;
};

/**
 * Gathers all publishing information and groups it by target type ID.
 * Additionally, it indicates the target type the item was published to most recently.
 */
export const groupPublishInfoByTargetTypeId = (
    publishInfoItems: ReadonlyArray<PublishInfo>,
): Map<string, TargetPublishInfo> => {
    if (publishInfoItems.length === 0) return new Map();

    const lastTargetToPublishDate = findLastTargetToPublishDate(publishInfoItems);

    const result = new Map<string, TargetPublishInfo>();
    for (const publishInfoForTarget of publishInfoItems) {
        result.set(publishInfoForTarget.Id, {
            id: publishInfoForTarget.Id,
            title: publishInfoForTarget.Title,
            user: publishInfoForTarget.User,
            date: publishInfoForTarget.Date,
            isUpToDate: publishInfoForTarget.UpToDate,
            isLastToPublish: publishInfoForTarget.Date === lastTargetToPublishDate,
        });
    }
    return result;
};
