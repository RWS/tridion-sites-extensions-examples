import { memo } from 'react';

import { t } from '@globals';
import { Block, Center, Flex, getBorderRadius, getColorPalette, Stack, Text } from '@tridion-sites/extensions';

import type { PublishTargetStatus } from './buildTargetStatuses';

const formatDate = (date: string) => new Date(date).toLocaleString();

const StatusIndicator = memo(({ isPublished }: { isPublished: boolean }) => (
    <Center
        backgroundColor={isPublished ? 'brandPrimary' : 'gray100'}
        height={10}
        width={10}
        cssStyle={{ borderRadius: '50%', flexShrink: 0 }}
    />
));

StatusIndicator.displayName = 'StatusIndicator';

const PublishStatusTargetRow = memo(({ target }: { target: PublishTargetStatus }) => (
    <Flex direction="row" crossAxis="center">
        <StatusIndicator isPublished={target.isPublished} />
        <Stack direction="column" itemGap="xs" marginLeft="sm">
            <Text type="defaultBold">{target.targetTitle}</Text>
            {target.isPublished ? (
                <Flex>
                    <Text type="small" color="gray80">
                        {t('popup.publishedAt', {
                            date: target.publishedAt ? formatDate(target.publishedAt) : t('popup.unknownDate'),
                        })}
                    </Text>
                    <Text type="small" color="gray80">
                        {target.publishedBy ? `${t('popup.publishedBy', { user: target.publishedBy })}` : ''}
                    </Text>
                </Flex>
            ) : (
                <Text type="small" color="gray80">
                    {t('popup.notPublished')}
                </Text>
            )}
        </Stack>
    </Flex>
));

PublishStatusTargetRow.displayName = 'PublishStatusTargetRow';

export interface PublishStatusPopoverContentProps {
    targets: ReadonlyArray<PublishTargetStatus>;
    isError: boolean;
    isLoading: boolean;
}

export const PublishStatusPopoverContent = memo(({ targets, isError, isLoading }: PublishStatusPopoverContentProps) => {
    const colors = getColorPalette();
    const borderRadius = getBorderRadius();

    return (
        <Block
            backgroundColor="gray0"
            padding="sm"
            cssStyle={{
                borderRadius: borderRadius.small,
                border: `1px solid ${colors.gray100}`,
                maxWidth: 320,
            }}
        >
            {isLoading ? <Text color="gray80">{t('popup.loading')}</Text> : null}

            {isError ? <Text color="red100">{t('popup.error')}</Text> : null}

            {!isLoading && !isError && targets.length === 0 ? <Text color="gray80">{t('popup.noTargets')}</Text> : null}

            {!isLoading && !isError && targets.length > 0 ? (
                <Stack direction="column" itemGap="sm">
                    {targets.map(target => (
                        <PublishStatusTargetRow key={target.targetId} target={target} />
                    ))}
                </Stack>
            ) : null}
        </Block>
    );
});

PublishStatusPopoverContent.displayName = 'PublishStatusPopoverContent';
