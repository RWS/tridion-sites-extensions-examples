import { t } from '@globals';
import { ContentExplorerTableColumnExtensionComponentProps } from '@tridion-sites/extensions';
import { Text } from '@tridion-sites/extensions';
import { Schema, SchemaPurpose } from '@tridion-sites/models';
import styled, { css } from 'styled-components';

const getSchemaPurposeColor = (schemaPurpose: SchemaPurpose) => {
    switch (schemaPurpose) {
        case 'bundle':
            return '#f94144';
        case 'component':
            return '#f3722c';
        case 'embedded':
            return '#f8961e';
        case 'metadata':
            return '#f9844a';
        case 'multimedia':
            return '#f9c74f';
        case 'protocol':
            return '#90be6d';
        case 'region':
            return '#43aa8b';
        case 'templateParameters':
            return '#4d908e';
        case 'virtualFolderType':
            return '#577590';
    }

    return undefined;
};

const getSchemaPurposeTitle = (schemaPurpose: SchemaPurpose) => {
    switch (schemaPurpose) {
        case 'bundle':
            return t('schemaPurpose.bundle');
        case 'component':
            return t('schemaPurpose.component');
        case 'embedded':
            return t('schemaPurpose.embedded');
        case 'metadata':
            return t('schemaPurpose.metadata');
        case 'multimedia':
            return t('schemaPurpose.multimedia');
        case 'protocol':
            return t('schemaPurpose.protocol');
        case 'region':
            return t('schemaPurpose.region');
        case 'templateParameters':
            return t('schemaPurpose.templateParameters');
        case 'virtualFolderType':
            return t('schemaPurpose.virtualFolderType');
    }

    return undefined;
};

const ColorPatch = styled.div<{ color?: string }>`
    flex-shrink: 0;
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px;
    ${props => css`
        background-color: ${props.color};
    `}
`;

const CellContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const SchemaPurposeColumn = ({ item }: ContentExplorerTableColumnExtensionComponentProps) => {
    if (item instanceof Schema && item.purpose) {
        return (
            <CellContainer>
                <ColorPatch color={getSchemaPurposeColor(item.purpose)} />
                <Text>{getSchemaPurposeTitle(item.purpose)}</Text>
            </CellContainer>
        );
    }

    return null;
};
