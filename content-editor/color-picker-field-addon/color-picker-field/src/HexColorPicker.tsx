import { memo } from 'react';
import { HexColorPicker as HexColorPickerBase } from 'react-colorful';
import styled, { css } from 'styled-components';

import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';
import { Flex, getBorderRadius } from '@tridion-sites/extensions';

interface ColorPatchProps {
    color: string;
}

const ColorPatch = styled(Flex)<ColorPatchProps>`
    border-radius: ${getBorderRadius().small}px;
    ${props => css`
        background-color: ${props.color};
    `}
`;

export const HexColorPicker = memo(({ value, isReadOnly, setValue }: ContentEditorFormFieldExtensionProps<string>) => {
    if (isReadOnly) {
        return <ColorPatch width={40} height={40} color={value} />;
    }

    return <HexColorPickerBase color={value || '#fff'} onChange={setValue} />;
});

HexColorPicker.displayName = 'HexColorPicker';
