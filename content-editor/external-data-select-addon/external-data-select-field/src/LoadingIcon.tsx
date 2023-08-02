import { memo } from 'react';

import { Icon } from '@tridion-sites/extensions';

export const LoadingIcon = memo(() => {
    return (
        <Icon viewBox="0 0 16 16">
            <path d="M15.438 8.563c-0.311 0-0.563-0.252-0.563-0.563 0-0.928-0.181-1.828-0.541-2.677-0.365-0.85-0.862-1.575-1.473-2.186l-0-0c-0.61-0.612-1.336-1.11-2.142-1.456l-0.044-0.017c-0.847-0.358-1.747-0.539-2.675-0.539-0.311 0-0.563-0.252-0.563-0.563s0.252-0.563 0.563-0.563c1.080 0 2.128 0.211 3.114 0.63 0.953 0.402 1.808 0.98 2.542 1.714s1.311 1.591 1.714 2.542c0.417 0.986 0.628 2.034 0.628 3.114 0.002 0.311-0.25 0.563-0.561 0.563z">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 8 8"
                    to="360 8 8"
                    dur="1s"
                    repeatCount="indefinite"
                ></animateTransform>
            </path>
        </Icon>
    );
});

LoadingIcon.displayName = 'LoadingIcon';
