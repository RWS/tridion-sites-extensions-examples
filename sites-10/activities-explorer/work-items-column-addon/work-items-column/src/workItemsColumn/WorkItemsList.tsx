import { memo } from 'react';

import { Stack } from '@tridion-sites/extensions';
import type { WorkItem } from '@tridion-sites/models';

import { ItemLink } from './ItemLink';

export interface WorkItemsListProps {
    items: ReadonlyArray<WorkItem>;
}

export const WorkItemsList = memo(({ items }: WorkItemsListProps) => {
    return (
        <Stack direction="column" itemGap="xs">
            {items.map(i => (i.subject ? <ItemLink key={i.id.asString} link={i.subject} /> : null))}
        </Stack>
    );
});

WorkItemsList.displayName = 'WorkItemsList';
