import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { moveStartActivityBeforeAssignActivityAction } from './moveStartActivityBeforeAssignActivityAction';
import { removeExportAction } from './removeExportAction';
import { replaceFinishActivityWithExportAction } from './replaceFinishActivityWithExportAction';

export const registerActionsExtensions = (builder: ExtensionBuilder) => {
    moveStartActivityBeforeAssignActivityAction(builder);
    removeExportAction(builder);
    replaceFinishActivityWithExportAction(builder);
};
