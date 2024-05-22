import { memo } from 'react';

import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const IconTrash = memo((props: CustomIconProps) => {
    return (
        <Icon {...props} viewBox="0 0 14 16">
            <path d="M13.75 2H10.5L9.45.6a1.5 1.5 0 0 0-1.2-.6h-2.5a1.5 1.5 0 0 0-1.2.6L3.5 2H.25a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.59l1.038 11.634A1.5 1.5 0 0 0 3.372 16h7.256a1.5 1.5 0 0 0 1.494-1.366L13.159 3h.591a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zm-8.4-.8a.503.503 0 0 1 .4-.2h2.5c.157 0 .305.074.4.2l.6.8h-4.5l.6-.8zm5.775 13.344a.497.497 0 0 1-.497.456H3.372a.497.497 0 0 1-.497-.456L1.844 3h10.312l-1.031 11.544z" />
        </Icon>
    );
});

IconTrash.displayName = 'IconTrash';
