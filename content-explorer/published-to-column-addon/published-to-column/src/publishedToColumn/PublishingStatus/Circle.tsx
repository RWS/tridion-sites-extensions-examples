import type { ReactNode } from 'react';
import { memo } from 'react';
import styled from 'styled-components';

import type { Color } from '@tridion-sites/extensions';
import { Center } from '@tridion-sites/extensions';

export interface CircleProps {
    backgroundColor: Color;
    size: number;
    children?: ReactNode;
    tooltip?: string;
}

const CircleBase = styled(Center)`
    border-radius: 50%;
`;

export const Circle = memo(({ backgroundColor, size, children, tooltip }: CircleProps) => {
    return (
        <CircleBase backgroundColor={backgroundColor} height={size} width={size} tooltip={tooltip}>
            {children}
        </CircleBase>
    );
});

Circle.displayName = 'Circle';
