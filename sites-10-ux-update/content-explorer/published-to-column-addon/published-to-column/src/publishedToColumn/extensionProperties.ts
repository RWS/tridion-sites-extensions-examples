/**
 * Extension properties for publishing information that are configured by the data extenders.
 */
export interface PublishInfo {
    Id: string;
    Title: string;
    User: string;
    Date: string;
    UpToDate: boolean;
}

/**
 * It gathers all the properties that are configured by the data extenders.
 * It is always represented as a dictionary of strings. Consumers should parse it on their side.
 */
export interface ExtensionProperties {
    PublishInfo?: string;
}
