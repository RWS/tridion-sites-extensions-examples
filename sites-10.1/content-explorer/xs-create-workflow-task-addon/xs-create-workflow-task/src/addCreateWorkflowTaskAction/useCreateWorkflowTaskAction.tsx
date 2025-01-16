import { useCallback, useMemo } from 'react';

import { t } from '@globals';
import type { ActionHook, ModalContentProps } from '@tridion-sites/extensions';
import { isItemNode, useContentExplorer, useModal, useNotifications } from '@tridion-sites/extensions';
import type { Link, TcmUri } from '@tridion-sites/models';
import { WorkflowService } from '@tridion-sites/open-api-client';

import { ModalContentComponent, type ModalResult } from './ModalContent';

/**
 * Function that will trigger start of the Workflow.
 * Uses `@tridion-sites/open-api-client` to make a call.
 */
const startWorkflow = async ({
    activityTitle,
    assignee,
    processDefinition,
    processInstanceTitle,
    publicationId,
    dueDate,
}: {
    publicationId: TcmUri;
    dueDate?: Date;
    assignee?: Link;
    processDefinition: Link;
    processInstanceTitle: string;
    activityTitle: string;
}) => {
    await WorkflowService.startWorkflow({
        escapedPublicationId: publicationId.asString,
        requestModel: {
            ActivityTitle: activityTitle,
            Assignee: assignee?.getInternalModel(),
            DueDate: dueDate?.toISOString(),
            ProcessDefinition: processDefinition.getInternalModel(),
            ProcessInstanceTitle: processInstanceTitle,
            WorkflowType: {
                $type: 'Link',
                IdRef: 'tcm:0-3-67584',
                Title: 'Task',
            },
        },
    });
};

export const useCreateWorkflowTaskAction: ActionHook = () => {
    // Content Explorer context is used to get location to determine which process definitions are available in this context repository.
    const { currentNode } = useContentExplorer();
    const { notify } = useNotifications();
    // Publication id can be retrieved from any item id.
    const contextPublicationId = isItemNode(currentNode) ? currentNode.data.item.id.getPublicationUri() : undefined;

    // Content component that Modal will render inside it.
    const content = useCallback(
        ({ onConfirm, onCancel }: ModalContentProps<ModalResult>) => {
            if (!contextPublicationId) return null;

            return (
                <ModalContentComponent publicationId={contextPublicationId} onConfirm={onConfirm} onCancel={onCancel} />
            );
        },
        [contextPublicationId],
    );

    /**
     * To open the modal you need to use `useModal()` hook.
     * It accepts parameters to customize look of it and returns asynchronous `open` callback to mount Modal into your viewport.
     */
    const { open } = useModal<ModalResult>({
        content,
        width: 400,
    });

    const execute = useCallback(async () => {
        /**
         * By calling `open()` you can show you Modal with `content` provided in it. When Modal is closed (either by clicking close or calling `onClose()`\`onCinfirm()`) Promise is resolved.
         * As a result of that promise you receive `status` and optional `result`, status tells you if your modal was confirmed or canceled
         * and using result you can receive data back from Modal content component.
         */
        const { result, status } = await open();

        if (!result || !contextPublicationId || status !== 'ok') return;

        const { activityTitle, assignee, processDefinition, processInstanceTitle, dueDate } = result;

        await startWorkflow({
            publicationId: contextPublicationId,
            activityTitle,
            assignee,
            processDefinition,
            processInstanceTitle,
            dueDate,
        });

        notify({
            title: t('actionTitle'),
            type: 'success',
            description: t('actionComplete'),
        });
    }, [contextPublicationId, notify, open]);

    const isAvailable = useMemo(() => {
        return !!contextPublicationId;
    }, [contextPublicationId]);

    return {
        execute: () => void execute(),
        isAvailable,
    };
};
