import type { ChangeEvent } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';

import { t } from '@globals';
import type { SelectItem } from '@mantine/core';
import { NativeSelect } from '@mantine/core';
import { useUsersQuery } from '@tridion-sites/extensions';
import { type Link, parseItemUri } from '@tridion-sites/models';

export interface AssigneeSelectProps {
    selectedUser: Link | undefined;
    onSelect: (selectedUser: Link | undefined) => void;
}

export const AssigneeSelect = memo(({ selectedUser, onSelect }: AssigneeSelectProps) => {
    const { data: users } = useUsersQuery();
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const usersOptions = useMemo<SelectItem[]>(() => {
        const options = [{ value: 'none', label: '(None)' }];

        users?.forEach(user =>
            options.push({
                value: user.id.asString,
                label: `${user.description} (${user.id.asString})`,
            }),
        );

        return options;
    }, [users]);

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            setIsDirty(true);

            if (event.currentTarget.value === 'none') {
                onSelect(undefined);
                return;
            }

            const selectedId = parseItemUri(event.currentTarget.value);

            const _selectedProcessDefinition = users?.find(user => user.id === selectedId);

            if (!_selectedProcessDefinition) return;

            onSelect(_selectedProcessDefinition.getLinkToItem());
        },
        [onSelect, users],
    );

    return (
        <NativeSelect
            data={usersOptions}
            label="Assignee"
            withAsterisk={true}
            error={!selectedUser && isDirty ? t('requiredFieldMessage') : undefined}
            onChange={handleChange}
            value={selectedUser?.idRef.asString || 'none'}
        />
    );
});

AssigneeSelect.displayName = 'AssigneeSelect';
