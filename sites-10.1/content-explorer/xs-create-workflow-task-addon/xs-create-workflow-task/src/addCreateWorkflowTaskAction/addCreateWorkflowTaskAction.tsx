import { t } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';

import { IconActivityInstance } from './IconActivityInstance';
import { useCreateWorkflowTaskAction } from './useCreateWorkflowTaskAction';
import { addTranslations } from './addTranslations';

const CREATE_WORKFLOW_ACTIONS_GROUP_ID = 'xs-workflow-actions';
const CREATE_WORKFLOW_TASK_ACTION_ID = 'xs-create-workflow-task';

/**
 * Extension shows how to integrate reusable Modal component.
 * In this case we are using modal to gether input from the user before performing the action in Content Explorer.
 * Run this example, go inside any publication in Content Explorer. On the toolbar you should see Action button with Activity icon and tooltip that says "Start task"
 * When action is clicked - Modal is opened with a Form.
 */
export const addCreateWorkflowTaskAction = (builder: ExtensionBuilder) => {
    // Add labels for all languages
    addTranslations(builder);

    // Register new action for Content Explorer.
    builder.contentExplorer.addAction(() => {
        return {
            icon: <IconActivityInstance />,
            id: CREATE_WORKFLOW_TASK_ACTION_ID,
            label: t('actionTitle'),
            useAction: useCreateWorkflowTaskAction,
        };
    });

    // Make sure new action added to existing group or by adding new group in this case.
    builder.contentExplorer.table.toolbar.addGroup({
        actionIds: [CREATE_WORKFLOW_TASK_ACTION_ID],
        id: CREATE_WORKFLOW_ACTIONS_GROUP_ID,
        label: t('actionsLabel'),
    });
};
