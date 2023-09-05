import { memo } from 'react';

import { t } from '@globals';
import { Center } from '@tridion-sites/extensions';

import { Circle } from './Circle';

interface CommonProps {
    id: string;
    title: string;
}

interface UnpublishedProps extends CommonProps {
    type: 'unpublished';
}

interface PublishedProps extends CommonProps {
    type: 'published';
    date: string;
    user: string;
    isUpToDate: boolean;
    isLastToPublish: boolean;
}

export type PublishingStatusProps = UnpublishedProps | PublishedProps;

const generateMultilineString = (dictionary: Record<string, string>) => {
    let result = '';

    Object.entries(dictionary).forEach(([key, value], index, items) => {
        const isLast = items.length - 1 === index;
        const newLine = isLast ? '' : '\n';

        result += `${key}: ${value}${newLine}`;
    });

    return result;
};

const formatDate = (date: string) => new Date(date).toLocaleString();

/**
 * This component displays the publishing status, derived from the provided publishing information.
 *
 * @remarks
 * Note, the backend extension will only return publish information corresponding to publish
 * transactions created while the extension is enabled.
 *
 * - A gray disc indicates that the item is not published to this target.
 * - A filled-in circle means that it was the last target to publish.
 * - A green dot indicates that the item has been successfully published to this target and is up-to-date.
 * - An orange dot indicates that the item has been successfully published to this target,
 * but there is a newer version that has not been published yet.
 */
export const PublishingStatus = memo((props: PublishingStatusProps) => {
    if (props.type === 'unpublished') {
        const tooltip = generateMultilineString({
            [t('tooltip.target')]: props.title,
        });

        return (
            <Center height={16} width={16}>
                <Circle tooltip={tooltip} size={12} backgroundColor="gray100" />
            </Center>
        );
    }

    const tooltip = generateMultilineString({
        [t('tooltip.target')]: props.title,
        [t('tooltip.published')]: formatDate(props.date),
        [t('tooltip.publishedBy')]: props.user,
    });
    return (
        <Center height={16} width={16}>
            <Circle size={16} tooltip={tooltip} backgroundColor={props.isUpToDate ? 'brandPrimary' : 'orange100'}>
                {!props.isLastToPublish && <Circle backgroundColor="gray0" size={8} />}
            </Circle>
        </Center>
    );
});

PublishingStatus.displayName = 'PublishingStatus';
