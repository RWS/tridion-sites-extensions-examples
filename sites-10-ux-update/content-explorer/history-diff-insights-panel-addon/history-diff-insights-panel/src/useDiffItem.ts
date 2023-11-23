import { VersionedItem } from '@tridion-sites/models';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export const useDiffItem = (history: ReadonlyArray<VersionedItem>) => {
    const [itemId, setItemId] = useState<string | undefined>();

    const onItemIdInputChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setItemId(e.target.value);
    }, []);

    const item = useMemo(() => history.find(i => i.id.asString === itemId), [itemId, history]);

    return {
        item,
        onItemIdInputChange,
    };
};
