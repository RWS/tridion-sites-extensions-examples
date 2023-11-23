import type { IdentifiableObject } from '@tridion-sites/models';
import { ComponentBase, Page } from '@tridion-sites/models';

import type { ExtensionProperties, PublishInfo } from './extensionProperties';

const parsePublishInfo = (publishInfo: string) => {
    try {
        const result = JSON.parse(publishInfo) as ReadonlyArray<PublishInfo>;
        return result;
    } catch (error) {
        console.warn(`It failed while parsing data from ExtensionProperties: ${publishInfo}`);
        return undefined;
    }
};

/**
 * Retrieves the PublishInfo from an item's ExtensionProperties and then parses it.
 * Because ExtensionProperties is consistently a dictionary of strings, parsing is necessary to obtain the "PublishInfo".
 */
export const getItemPublishInfo = (item: IdentifiableObject) => {
    const extensionProperties = item.extensionProperties as ExtensionProperties;
    const publishInfo = extensionProperties?.PublishInfo;

    if (!publishInfo) {
        if (item instanceof ComponentBase || item instanceof Page) {
            console.warn(`[${item.title || item.id.asString}] has not been provided with PublishInfo`);
        }
        return undefined;
    }

    return parsePublishInfo(publishInfo);
};
