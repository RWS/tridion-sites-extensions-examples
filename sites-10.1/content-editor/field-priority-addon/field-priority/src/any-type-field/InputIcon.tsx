import { memo } from 'react';

import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const InputIcon = memo((props: CustomIconProps) => {
    return (
        <Icon {...props} viewBox="0 0 24 24">
            <path
                d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zM5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    );
});

InputIcon.displayName = 'InputIcon';
