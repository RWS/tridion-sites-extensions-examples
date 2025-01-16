import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { moveWorkflowGroupToTheEnd } from './moveWorkflowGroupToTheEnd';
import { removeRefreshingGroup } from './removeRefreshingGroup';
import { replaceExportingGroup } from './replaceExportingGroup';

export const registerActionGroupsExtensions = (builder: ExtensionBuilder) => {
    moveWorkflowGroupToTheEnd(builder);
    removeRefreshingGroup(builder);
    replaceExportingGroup(builder);
};
