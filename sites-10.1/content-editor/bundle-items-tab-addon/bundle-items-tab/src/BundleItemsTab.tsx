import { memo } from 'react';

import { t } from '@globals';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Button, type EditorExtensionPanelComponentProps, Flex } from '@tridion-sites/extensions';
import { type Bundle } from '@tridion-sites/models';

import { BundleItemsTable } from './BundleItemsTable';
import { useBundleItemsTabState } from './useBundleItemsTabState';

function capitalizeFirstLetter(type: string) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

export const BundleItemsTab = memo((props: EditorExtensionPanelComponentProps<Bundle>) => {
    const {
        filteredItems,
        isLoading,
        items,
        isError,
        itemTypeFilter,
        availableItemTypes,
        selectedIds,
        onFilterChange,
        toggleSelection,
        removeWithConfirmation,
    } = useBundleItemsTabState();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography>{t('error')}</Typography>
            </Box>
        );
    }

    if (!items?.length) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography>{t('noItems')}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <Flex direction="row" marginBottom="sm" marginTop="xs">
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel id="bundle-items-type-filter-label">{t('filter.label')}</InputLabel>
                    <Select<string>
                        labelId="bundle-items-type-filter-label"
                        label={t('filter.label')}
                        value={itemTypeFilter}
                        onChange={onFilterChange}
                        sx={{ backgroundColor: 'white' }}
                    >
                        <MenuItem value="">{t('filter.all')}</MenuItem>
                        {availableItemTypes.map(type => (
                            <MenuItem key={type} value={type}>
                                {capitalizeFirstLetter(type)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedIds.size > 0 && (
                    <Flex marginLeft="xs" direction="row" inline={true}>
                        <Button label={t('remove')} onClick={removeWithConfirmation} />
                    </Flex>
                )}
            </Flex>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {filteredItems.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                        <Typography>{t('noMatchingItems')}</Typography>
                    </Box>
                ) : (
                    <BundleItemsTable items={filteredItems} selectedIds={selectedIds} onRowClick={toggleSelection} />
                )}
            </Box>
        </Box>
    );
});

BundleItemsTab.displayName = 'BundleItemsTab';
