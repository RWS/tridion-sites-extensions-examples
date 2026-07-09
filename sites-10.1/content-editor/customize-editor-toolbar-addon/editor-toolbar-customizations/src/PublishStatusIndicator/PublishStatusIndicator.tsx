import { memo } from 'react';

import type { ContentEditorToolbarItemComponentProps } from '@tridion-sites/extensions';
import { Center } from '@tridion-sites/extensions';

import { HoverPopover } from './HoverPopover';
import { PublishStatusPieChart } from './PublishStatusPieChart';
import { PublishStatusPopoverContent } from './PublishStatusPopoverContent';
import { usePublishReadinessSummary } from './usePublishReadinessSummary';

export interface PublishStatusIndicatorProps extends ContentEditorToolbarItemComponentProps {}

export const PublishStatusIndicator = memo(({ itemId }: PublishStatusIndicatorProps) => {
    const { isEmpty, isError, isLoading, targets } = usePublishReadinessSummary(itemId);

    return (
        <HoverPopover
            reference={
                <Center height={32} width={32}>
                    <PublishStatusPieChart targets={targets} isEmpty={isEmpty} isLoading={isLoading} />
                </Center>
            }
        >
            <PublishStatusPopoverContent targets={targets} isError={isError} isLoading={isLoading} />
        </HoverPopover>
    );
});

PublishStatusIndicator.displayName = 'PublishStatusIndicator';
