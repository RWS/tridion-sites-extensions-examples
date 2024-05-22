import { memo } from 'react';

import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const AddToFavoritesIcon = memo((props: CustomIconProps) => {
    return (
        <Icon {...props} viewBox="0 0 16 16">
            <path
                fill="#758099"
                d="M7.142.557L5.189 4.694l-4.37.665C.036 5.478-.278 6.487.29 7.065l3.161 3.218-.747 4.547c-.135.822.693 1.437 1.387 1.053L8 13.736l3.909 2.147c.694.381 1.522-.231 1.387-1.053l-.747-4.546 3.16-3.219c.57-.578.255-1.587-.528-1.706l-4.37-.665L8.858.557a.94.94 0 00-1.716 0z"
            />
        </Icon>
    );
});

AddToFavoritesIcon.displayName = 'AddToFavoritesIcon';
