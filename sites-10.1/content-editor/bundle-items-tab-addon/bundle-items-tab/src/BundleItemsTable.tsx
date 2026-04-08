import { memo } from 'react';

import { t } from '@globals';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Flex, getColorPalette, Text } from '@tridion-sites/extensions';
import type { RepositoryLocalObject } from '@tridion-sites/models';
import { ComponentBase } from '@tridion-sites/models';

interface BundleItemsTableProps {
    items: ReadonlyArray<RepositoryLocalObject>;
    selectedIds: ReadonlySet<string>;
    onRowClick: (id: string) => void;
}
const colorPalette = getColorPalette();

export const BundleItemsTable = memo(({ items, selectedIds, onRowClick }: BundleItemsTableProps) => {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight: '100%' }}>
            <Table stickyHeader={true} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Text type="defaultBold">{t('table.titleColumn')}</Text>
                        </TableCell>
                        <TableCell>
                            <Text type="defaultBold">{t('table.schemaColumn')}</Text>
                        </TableCell>
                        <TableCell>
                            <Text type="defaultBold">{t('table.owningPublicationColumn')}</Text>
                        </TableCell>
                        <TableCell>
                            <Text type="defaultBold">{t('table.isLocalColumn')}</Text>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => {
                        const schema = item instanceof ComponentBase ? item.schema : undefined;
                        const schemaTooltip = schema ? `${schema.title} (${schema.idRef.asString})` : '-';
                        const owningRepo = item.blueprintInfo?.owningRepository;
                        const owningPublicationTooltip = owningRepo
                            ? `${owningRepo.title} (${owningRepo.idRef.asString})`
                            : '-';
                        const isLocalized = item.blueprintInfo?.isLocalized;
                        const itemTooltip = `${item.title} (${item.id.asString})`;

                        return (
                            <TableRow
                                key={item.id.asString}
                                hover={true}
                                selected={selectedIds.has(item.id.asString)}
                                onClick={() => onRowClick(item.id.asString)}
                                sx={{
                                    cursor: 'pointer',
                                    '&.Mui-selected': { backgroundColor: colorPalette.brandLight },
                                    '&.Mui-selected:hover': { backgroundColor: colorPalette.brandLight },
                                }}
                            >
                                <TableCell>
                                    <Flex maxWidth={400} shouldFill={true}>
                                        <Text tooltip={itemTooltip}>{item.title ?? '-'}</Text>
                                    </Flex>
                                </TableCell>
                                <TableCell>
                                    <Text tooltip={schemaTooltip}>{schema?.title ?? '-'}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text tooltip={owningPublicationTooltip}>{owningRepo?.title}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {isLocalized !== undefined
                                            ? t(isLocalized ? 'isLocal.yes' : 'isLocal.no')
                                            : '-'}
                                    </Text>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

BundleItemsTable.displayName = 'BundleItemsTable';
