import { useMemo } from 'react';

import { useItemPublishedToQuery, useItemQuery, usePublishableTargetTypesQuery } from '@tridion-sites/extensions';
import type { Page, Publication } from '@tridion-sites/models';
import type { ItemUri } from '@tridion-sites/models';

import { buildTargetStatuses } from './buildTargetStatuses';

export const usePublishReadinessSummary = (itemId: ItemUri) => {
    const { data: page, isLoading: isPageLoading } = useItemQuery<Page>({ itemId });
    const publicationId = page?.locationInfo?.contextRepository?.idRef;

    const {
        data: publishedToFromQuery,
        isLoading: isPublishedToLoading,
        isError: isPublishedToError,
    } = useItemPublishedToQuery({ itemId });

    const {
        data: publication,
        isLoading: isPublicationLoading,
        isError: isPublicationError,
    } = useItemQuery<Publication>(publicationId ? { itemId: publicationId } : undefined, {
        enabled: !!publicationId,
    });

    const businessProcessTypeId = publication?.businessProcessType?.idRef;

    const {
        data: targetTypes,
        isLoading: isTargetTypesLoading,
        isError: isTargetTypesError,
    } = usePublishableTargetTypesQuery(
        businessProcessTypeId ? { businessProcessTypeId } : undefined,
        { enabled: !!businessProcessTypeId },
    );

    const targets = useMemo(
        () => buildTargetStatuses(targetTypes, publishedToFromQuery),
        [publishedToFromQuery, targetTypes],
    );

    const isLoading = isPageLoading || isPublishedToLoading || isPublicationLoading || isTargetTypesLoading;
    const isError = isPublishedToError || isPublicationError || isTargetTypesError;
    const isEmpty = !isLoading && !isError && targets.length === 0;

    return {
        isEmpty,
        isError,
        isLoading,
        targets,
    };
};
