import { memo, useCallback, useMemo, useState } from 'react';

import { t } from '@globals';
import { Select } from '@mantine/core';
import type { ContentEditorFormFieldExtensionProps } from '@tridion-sites/extensions';

import type { Specie } from './fetchSpeciesList';
import { fetchSpeciesList } from './fetchSpeciesList';
import { LoadingIcon } from './LoadingIcon';

export const ExternalSelectField = memo(
    ({ value, setValue, isReadOnly, renderField }: ContentEditorFormFieldExtensionProps) => {
        const [data, setData] = useState<ReadonlyArray<Specie>>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [error, setError] = useState<string>();

        /**
         * Callback that triggers data loading from external API.
         */
        const loadPage = useCallback(() => {
            if (data.length) return;

            const fetchAndSetSpeciesList = async () => {
                setIsLoading(true);
                const list = await fetchSpeciesList();
                setIsLoading(false);
                setData(list);
            };

            try {
                void fetchAndSetSpeciesList();
            } catch (error) {
                setError(t('errorMessage'));
            }
        }, [data.length]);

        /**
         * Mapping backend data to the format that Select component accepts.
         */
        const list = useMemo(() => {
            if (!data.length) {
                return typeof value === 'string' ? [value] : [];
            }

            return data
                .map(i => ({ value: i.name, label: i.name, group: i.classification }))
                .sort((a, b) => a.label.localeCompare(b.label));
        }, [data, value]);

        if (isReadOnly) return <>{renderField}</>;

        return (
            <Select
                color="red"
                data={list}
                error={error}
                onChange={setValue}
                onDropdownOpen={loadPage}
                searchable={true}
                value={value as string}
                icon={isLoading ? <LoadingIcon /> : undefined}
            />
        );
    },
);

ExternalSelectField.displayName = 'ExternalSelectField';
