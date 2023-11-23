import { memo } from 'react';

import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const PercentIcon = memo((props: CustomIconProps) => {
    return (
        <Icon {...props} viewBox="0 0 24 24">
            <path
                d="M17 19a2 2 0 110-4 2 2 0 010 4zM7 9a2 2 0 110-4 2 2 0 010 4zM19 5L5 19"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    );
});

PercentIcon.displayName = 'PercentIcon';
