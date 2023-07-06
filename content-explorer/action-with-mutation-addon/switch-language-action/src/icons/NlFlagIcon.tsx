import { memo } from 'react';

import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const NlFlagIcon = memo((props: CustomIconProps) => {
    return (
        <Icon {...props} viewBox="0 0 16 16">
            <g transform="scale(0.026)">
                <path fill="#21468b" d="M0 0h640v480H0z" />
                <path fill="#fff" d="M0 0h640v320H0z" />
                <path fill="#ae1c28" d="M0 0h640v160H0z" />
            </g>
        </Icon>
    );
});

NlFlagIcon.displayName = 'NlFlagIcon';
