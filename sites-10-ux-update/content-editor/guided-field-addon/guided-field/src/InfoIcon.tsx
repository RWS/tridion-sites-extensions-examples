import { memo } from 'react';

import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const InfoIcon = memo((props: CustomIconProps) => (
    <Icon {...props} viewBox="0 0 16 16">
        <path d="M8 0a8.001 8.001 0 000 16A8.001 8.001 0 008 0z" fill="rgb(117, 128, 153)"></path>
        <path
            d="M9.42 12.129a.387.387 0 00.386-.387v-.774a.387.387 0 00-.387-.387h-.387V7.355a.387.387 0 00-.387-.387H6.581a.387.387 0 00-.387.387v.774c0 .214.173.387.387.387h.387v2.065H6.58a.387.387 0 00-.387.387v.774c0 .214.173.387.387.387h2.838zM9.355 4.903a1.355 1.355 0 10-2.71 0 1.355 1.355 0 002.71 0z"
            fill="#ffffff"
        ></path>
    </Icon>
));

InfoIcon.displayName = 'InfoIcon';
