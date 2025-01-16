import { useEffect, useMemo, useState } from 'react';

import { t } from '@globals';
import { useNotifications } from '@tridion-sites/extensions';
import type { Bundle, IdentifiableObject } from '@tridion-sites/models';
import { getItemType, mapToModel } from '@tridion-sites/models';
import { OrganizationalItemsService } from '@tridion-sites/open-api-client';

interface InBundleHookProps {
    item: IdentifiableObject;
}

// Checks if an item is valid for being included into the bundle
export const isBundleAllowedItemType = (item: IdentifiableObject) => {
    switch (getItemType(item)) {
        case 'businessProcessType':
        case 'keywordCategory':
        case 'componentTemplate':
        case 'component':
        case 'folder':
        case 'keyword':
        case 'pageTemplate':
        case 'page':
        case 'schema':
        case 'structureGroup':
        case 'targetGroup':
        case 'templateBuildingBlock':
        case 'virtualFolder':
        case 'abstractKeyword':
        case 'bundle':
        case 'abstractExternalKeyword':
        case 'externalKeywordCategory':
        case 'externalKeyword':
        case 'externalMultimediaComponent':
        case 'multimediaComponent':
        case 'multimediaSchema':
        case 'searchFolder':
            return true;
    }
    return false;
};

/**
 * Allows to make a request to get the list of bundles which an item is a part of.
 * The result object can be used to track the results, loading and error statuses of the query.
 */
export const useInBundleQuery = ({ item }: InBundleHookProps) => {
    const [bundles, setBundles] = useState<ReadonlyArray<Bundle> | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const { notify } = useNotifications();

    const shouldFetchInBundles = useMemo(() => isBundleAllowedItemType(item), [item]);

    /**
     * https://react.dev/reference/react/useEffect#fetching-data-with-effects
     */
    useEffect(() => {
        let ignore = false;

        // Retreives the list of all bundles which contain the item, using a direct API call.
        const fetchInBundle = async () => {
            let result;

            try {
                setIsLoading(true);
                if (shouldFetchInBundles) {
                    result = await OrganizationalItemsService.getInBundles({ escapedItemId: item.id.asString });
                }
            } catch (error) {
                notify({
                    type: 'error',
                    title: t('notification.title'),
                    description: t('notification.description'),
                    showInMessageCenter: true,
                });
            }

            setIsLoading(false);

            if (!ignore) {
                const bundles = result?.map<Bundle>(mapToModel);
                setBundles(bundles);
            }
        };

        void fetchInBundle();

        return () => {
            ignore = true;
        };
    }, [item.id.asString, notify, shouldFetchInBundles]);

    return {
        bundles,
        isLoading,
    };
};
