import { memo, useCallback, useState } from 'react';

import { ActionIcon, Popover } from '@mantine/core';
import { useItemQuery } from '@tridion-sites/extensions';
import type { ActivityInstance, ItemUri } from '@tridion-sites/models';

import { EyeIcon } from './EyeIcon';
import { LoadingIndicator } from './LoadingIndicator';
import { WorkItemsList } from './WorkItemsList';

export interface WorkItemsPopoverProps {
    activityId: ItemUri;
}

// In this Popover component we demonstrate how you can utilize a third-party library,
// which is in this case - Mantine (https://mantine.dev/)
// In addition to this, we are loading data on opening of the popover and show loading indication.
export const WorkItemsPopover = memo(({ activityId }: WorkItemsPopoverProps) => {
    const [isOpened, setIsOpened] = useState(false);

    // We have to request an individual item rather than using one from the cell (see `WorkItemsColumnCell`)
    // because it doesn't contain full information for performance reasons (as it comes from a list).
    // Requesting an individual item would get you full information about the item.
    // Note that we requesting this information only on opening of the popover (`enabled` property)
    const { data: activity, isLoading } = useItemQuery<ActivityInstance>({ itemId: activityId }, { enabled: isOpened });

    const handleOpen = useCallback(() => setIsOpened(true), []);

    return (
        <Popover position="bottom" withArrow={true} shadow="md" onOpen={handleOpen}>
            <Popover.Target>
                <ActionIcon>
                    <EyeIcon />
                </ActionIcon>
            </Popover.Target>

            <Popover.Dropdown>
                <LoadingIndicator isLoading={isLoading}>
                    {activity?.workItems && <WorkItemsList items={activity.workItems} />}
                </LoadingIndicator>
            </Popover.Dropdown>
        </Popover>
    );
});

WorkItemsPopover.displayName = 'WorkItemsListPopover';
