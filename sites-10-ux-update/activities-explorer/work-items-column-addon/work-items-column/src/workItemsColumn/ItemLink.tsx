import { memo } from 'react';

import { TextLink } from '@tridion-sites/extensions';
import type { Link } from '@tridion-sites/models';

export interface ItemLinkProps {
    link: Link;
}

export const ItemLink = memo(({ link }: ItemLinkProps) => {
    return <TextLink text={link.title || link.idRef.asString} to={`/explorer?item=${link.idRef.asString}`} />;
});

ItemLink.displayName = 'ItemLink';
