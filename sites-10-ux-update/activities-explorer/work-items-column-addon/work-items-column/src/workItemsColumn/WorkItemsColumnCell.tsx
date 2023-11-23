import { memo } from 'react';

import type { TableColumnExtensionComponentProps } from '@tridion-sites/extensions';
import { Flex } from '@tridion-sites/extensions';
import type { ActivityInstance } from '@tridion-sites/models';

import { ItemLink } from './ItemLink';
import { WorkItemsPopover } from './WorkItemsPopover';

export const WorkItemsColumnCell = memo(({ item }: TableColumnExtensionComponentProps<ActivityInstance>) => {
    if (!item.primarySubject?.idRef) return null;

    return (
        <Flex direction="row">
            <ItemLink link={item.primarySubject} />
            <Flex marginLeft="nano">
                <WorkItemsPopover activityId={item.id} />
            </Flex>
        </Flex>
    );
});

WorkItemsColumnCell.displayName = 'WorkItemsColumnCell';
