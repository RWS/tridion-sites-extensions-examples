import type { ReactNode } from 'react';
import { memo } from 'react';

import { t } from '@globals';
import { Text } from '@tridion-sites/extensions';

export interface LoadingIndicatorProps {
    children: ReactNode;
    isLoading: boolean;
}

export const LoadingIndicator = memo(({ children, isLoading }: LoadingIndicatorProps) => {
    if (isLoading) {
        return <Text>{t('loadingMessage')}</Text>;
    }

    return <>{children}</>;
});

LoadingIndicator.displayName = 'LoadingIndicator';
