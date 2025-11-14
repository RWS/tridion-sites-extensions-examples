import { type ExtensionBuilder, itemCommandId, useUserProfile } from '@tridion-sites/extensions';
import type { IdentifiableObject } from '@tridion-sites/models';
import { Folder, StructureGroup } from '@tridion-sites/models';

const isItemApplicableForPublishing = (item: IdentifiableObject) => {
    // Prevent publishing\unpublishing if the item is a StructureGroup OR a Folder
    return !(item instanceof StructureGroup) && !(item instanceof Folder);
};

export const registerAccessControlExtensions = (builder: ExtensionBuilder) => {
    // Add a command right restriction to control access to specific commands
    builder.accessControl.addCommandRight(() => {
        return {
            // All supported command IDs are now available in itemCommandId.
            // In this example, we target the "publish items" command specifically; unpublish will be handled separately.
            commandId: itemCommandId.publishItems,
            // Define the command behavior and restrictions.
            // The hook returns two properties:
            // • isItemApplicable: determines whether the command should apply to a given item.
            // • isCommandAvailable: determines whether the command should be available in general, regardless of item data
            // (e.g., based on third-party data or application state).
            // Both values are combined with the built-in system logic (logical AND). This means the command is only available
            // if both the system and the extension return true.
            useCommand: () => {
                const { userProfile } = useUserProfile();

                return {
                    // Determine if the publish command should be available for a given item.
                    // In our case we want to allow publishing for all items if the user is an administrator or publication administrator.
                    isItemApplicable:
                        userProfile?.runtime?.isAdministrator || userProfile?.runtime?.isPublicationAdministrator
                            ? () => true
                            : isItemApplicableForPublishing,
                    isCommandAvailable: true,
                };
            },
        };
    });

    builder.accessControl.addCommandRight(() => {
        return {
            // Now we need to handle the same for unpublish command
            commandId: itemCommandId.unpublishItems,
            useCommand: () => {
                const { userProfile } = useUserProfile();

                return {
                    // Determine if the unpublish command should be available for a given item
                    isItemApplicable:
                        userProfile?.runtime?.isAdministrator || userProfile?.runtime?.isPublicationAdministrator
                            ? () => true
                            : isItemApplicableForPublishing,
                    isCommandAvailable: true,
                };
            },
        };
    });
};
