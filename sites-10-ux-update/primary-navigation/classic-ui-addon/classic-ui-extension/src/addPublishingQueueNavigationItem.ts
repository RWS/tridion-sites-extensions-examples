import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { PublishingQueue } from './PublishingQueue';

/**
 *  This extension adds a new route to the application which will display the publishing queue from the Classic UI.
 */
export const addPublishingQueueNavigationItem = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        publishingQueueLabel: 'Publishing queue',
        publishingQueueTooltip: 'Classic publishing queue',
        publishingQueueTitle: 'Classic publishing queue',
    });

    /**
     * This registers the navigation extension, but it needs to be added to the config (see below) before it will
     * be visible to the user.
     */
    builder.header.navigation.register(() => ({
        id: 'classicPublishingQueue',
        /**
         * A user can access the extension either by clicking the link in the header, or navigating directly to it
         * through this URL.
         */
        routePath: '/classicPublishingQueue',
        /**
         * This is the content of the new route.
         */
        routeComponent: PublishingQueue,
        useNavigationItem: () => {
            return {
                label: t('publishingQueueLabel'),
                tooltip: t('publishingQueueTooltip'),
                isAvailable: true,
            };
        },
    }));

    /** Adds registered navigation item to the config to make it visible to the user. */
    builder.header.navigation.config.add('classicPublishingQueue');
};
