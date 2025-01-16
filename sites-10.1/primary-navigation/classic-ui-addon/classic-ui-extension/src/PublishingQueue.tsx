import { memo } from 'react';

import { t } from '@globals';

/**
 * This gives the user access to the publishing queue from the Tridion Sites Classic UI.
 *
 * In order to load the classic UI (which in this example is the contents of the iframe),
 * you need to add your localhost URL to the list of allowed redirect URLs for Tridion Sites Classic in the
 * Applications tab of Access Manager. (For reference, it should already be added to the allowed redirects
 * of Tridion Sites Experience Space.)
 */
export const PublishingQueue = memo(() => {
    return (
        <iframe
            width="100%"
            height="100%"
            src={`${window.location.origin}/WebUI/Editors/CME/Views/Popups/PublishQueue/PublishQueue.aspx`}
            title={t('publishingQueueTitle')}
        />
    );
});

PublishingQueue.displayName = 'PublishingQueue';
