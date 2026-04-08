import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { t } from '@globals';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useConfirmation, useEditor, useItemsQuery, useOptionalBundleEditor } from '@tridion-sites/extensions';
import type { RepositoryLocalObject } from '@tridion-sites/models';
import { getItemType, mapToModel } from '@tridion-sites/models';
import type { Link } from '@tridion-sites/open-api-client';

export interface BundleItemsTabStateResult {
    filteredItems: ReadonlyArray<RepositoryLocalObject>;
    items: ReadonlyArray<RepositoryLocalObject> | undefined;
    isLoading: boolean;
    isError: boolean;
    itemTypeFilter: string;
    onFilterChange: (event: SelectChangeEvent<string>) => void;
    availableItemTypes: ReadonlyArray<string>;
    selectedIds: ReadonlySet<string>;
    toggleSelection: (id: string) => void;
    removeWithConfirmation: () => void;
}

export const useBundleItemsTabState = (): BundleItemsTabStateResult => {
    const [itemTypeFilter, setItemTypeFilter] = useState<string>('');
    const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());

    const editorState = useEditor();
    const bundleEditor = useOptionalBundleEditor();
    const currentItemRef = useRef(bundleEditor?.bundle);

    const removeSelectedItems = useCallback(() => {
        const newAddedItems: Link[] = [];

        for (const item of currentItemRef.current?.items ?? []) {
            if (selectedIds.has(item.idRef.asString)) continue;

            newAddedItems.push(item.getInternalModel());
        }

        if (!newAddedItems.length) return;

        editorState.updateItem(
            mapToModel({
                ...currentItemRef.current?.getInternalModel(),
                Items: newAddedItems,
            }),
        );
    }, [editorState, selectedIds]);

    const { open: removeWithConfirmation } = useConfirmation({
        title: t('removeConfirmationTitle'),
        description: t('removeConfirmationMessage', { count: selectedIds.size }),
        onConfirm: removeSelectedItems,
    });

    useEffect(() => {
        currentItemRef.current = bundleEditor?.bundle;
    }, [bundleEditor?.bundle]);

    const toggleSelection = useCallback(
        (id: string) =>
            setSelectedIds(prev => {
                const next = new Set(prev);
                if (next.has(id)) {
                    next.delete(id);
                } else {
                    next.add(id);
                }
                return next;
            }),
        [],
    );

    const itemIds = useMemo(() => bundleEditor?.bundle?.items?.map(i => i.idRef) ?? [], [bundleEditor?.bundle]);
    const {
        data: items,
        isLoading,
        isError,
    } = useItemsQuery<RepositoryLocalObject>(itemIds.length ? { itemIds } : undefined, { enabled: itemIds.length > 0 });

    const filteredItems = useMemo(() => {
        if (!itemTypeFilter) return items ?? [];

        return (items ?? []).filter(i => (getItemType(i) as string) === itemTypeFilter);
    }, [items, itemTypeFilter]);

    const availableItemTypes = useMemo(
        () => ([...new Set((items ?? []).map(i => getItemType(i)))] as string[]).sort(),
        [items],
    );

    const onFilterChange = useCallback((event: SelectChangeEvent<string>) => {
        setItemTypeFilter(event.target.value);
        setSelectedIds(new Set());
    }, []);

    return {
        availableItemTypes,
        filteredItems,
        items,
        isError,
        isLoading,
        itemTypeFilter,
        selectedIds,
        onFilterChange,
        removeWithConfirmation,
        toggleSelection,
    };
};
