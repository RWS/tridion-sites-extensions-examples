import { memo } from 'react';

import type { TableColumnExtensionComponentProps } from '@tridion-sites/extensions';
import { Flex, TextLink } from '@tridion-sites/extensions';
import type { IdentifiableObject } from '@tridion-sites/models';
import { Folder } from '@tridion-sites/models';

import { LockIcon } from './LockIcon';

export const LinkedSchemaCell = memo(({ item }: TableColumnExtensionComponentProps<IdentifiableObject>) => {
    if (!(item instanceof Folder) || !item.linkedSchema) {
        return null;
    }

    return (
        <Flex direction="row">
            {item.isLinkedSchemaMandatory && (
                <Flex marginRight="nano">
                    <LockIcon />
                </Flex>
            )}

            <TextLink
                to={`/explorer?item=${item.linkedSchema.idRef.asString}`}
                text={item.linkedSchema.title}
                tooltip={`${item.linkedSchema.title} (${item.linkedSchema.idRef.asString})`}
            />
        </Flex>
    );
});

LinkedSchemaCell.displayName = 'LinkedSchemaCell';
