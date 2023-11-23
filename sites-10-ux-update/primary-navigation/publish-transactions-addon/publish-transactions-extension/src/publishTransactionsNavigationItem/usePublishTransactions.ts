import { useEffect, useState } from 'react';

import { t } from '@globals';
import { useNotifications } from '@tridion-sites/extensions';
import type { PublishTransaction } from '@tridion-sites/open-api-client';
import { PublishingService } from '@tridion-sites/open-api-client';

export const usePublishTransactions = () => {
    const [transactions, setTransactions] = useState<ReadonlyArray<PublishTransaction>>();
    const [isLoading, setIsLoading] = useState(false);
    const { notify } = useNotifications();

    /**
     * https://react.dev/reference/react/useEffect#fetching-data-with-effects
     */
    useEffect(() => {
        let ignore = false;

        // Retreives the list of all publishing transactions using a direct API call.
        const fetchPublishTransactions = async () => {
            let result;

            try {
                setIsLoading(true);
                result = await PublishingService.getPublishTransactions({});
            } catch (error) {
                notify({
                    type: 'error',
                    title: t('requestErrorNotification.title'),
                    description: t('requestErrorNotification.description'),
                    showInMessageCenter: true,
                });
            }

            setIsLoading(false);

            if (!ignore) {
                setTransactions(result);
            }
        };

        void fetchPublishTransactions();

        return () => {
            ignore = true;
        };
    }, [notify]);

    return {
        isLoading,
        transactions,
    };
};
