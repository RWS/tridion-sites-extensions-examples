import type { Draft } from 'immer';
import { produce } from 'immer';
import { memo, useCallback, useState } from 'react';

import { t } from '@globals';
import { TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { Flex, ModalContent, type ModalContentProps, ModalFooter, ModalHeader, Stack } from '@tridion-sites/extensions';
import type { Link, TcmUri } from '@tridion-sites/models';

import { AssigneeSelect } from './AssigneeSelect';
import { useTaskProcessDefinition } from './useTaskProcessDefinition';

export interface ModalResult {
    dueDate?: Date;
    assignee?: Link;
    processDefinition: Link;
    processInstanceTitle: string;
    activityTitle: string;
}

export interface ModalContentComponentProps extends ModalContentProps<ModalResult> {
    publicationId: TcmUri;
}

/**
 * This component will be rendered inside the Modal and always receive `onConfirm`, `onCancel` callbacks.
 * Use `onConfirm({ result })` to pass data back to where `open` was called with `ok` status.
 * Use `onCancel()` to give `cancel` status back to `open` Promise.
 */
export const ModalContentComponent = memo(({ publicationId, onConfirm, onCancel }: ModalContentComponentProps) => {
    const [result, setResult] = useState<Partial<ModalResult>>({});

    const updateResult = useCallback(
        (setter: (draft: Draft<ModalResult>) => void) => {
            setResult(produce(result, setter));
        },
        [result],
    );

    useTaskProcessDefinition({
        onSelect: link => {
            updateResult(draft => {
                draft.processDefinition = link;
            });
        },
        publicationId: publicationId,
        selectedProcessDefinition: result.processDefinition,
    });

    const handleConfirm = useCallback(() => {
        if (!result.activityTitle || !result.assignee || !result.processDefinition || !result.processInstanceTitle)
            return;

        onConfirm({
            activityTitle: result.activityTitle,
            assignee: result.assignee,
            dueDate: result.dueDate,
            processDefinition: result.processDefinition,
            processInstanceTitle: result.processInstanceTitle,
        });
    }, [
        onConfirm,
        result.activityTitle,
        result.assignee,
        result.dueDate,
        result.processDefinition,
        result.processInstanceTitle,
    ]);

    // Usage of `ModalHeader`, `ModalContent`, `ModalFooter` is optional, you can implement your own header and footer. Just make sure you called `onConfirm` or `onCancel` somewhere.
    return (
        <Flex shouldFill={true}>
            <ModalHeader title={t('actionTitle')} />
            <ModalContent padding="sm">
                <Stack direction="column" itemGap="xs">
                    <TextInput
                        value={result.processInstanceTitle}
                        onChange={event =>
                            updateResult(prevValue => {
                                prevValue.processInstanceTitle = event.currentTarget.value;
                            })
                        }
                        label="Subject"
                        withAsterisk={true}
                    />
                    <TextInput
                        value={result.activityTitle}
                        onChange={event =>
                            updateResult(prevValue => {
                                prevValue.activityTitle = event.currentTarget.value;
                            })
                        }
                        label="Action"
                        withAsterisk={true}
                    />
                    <AssigneeSelect
                        onSelect={link => {
                            updateResult(draft => {
                                draft.assignee = link;
                            });
                        }}
                        selectedUser={result.assignee}
                    />
                    <DateTimePicker
                        label="Due date"
                        placeholder="(None)"
                        onChange={link => {
                            updateResult(draft => {
                                if (link instanceof Date) {
                                    draft.dueDate = link;
                                }
                            });
                        }}
                        value={result.dueDate}
                        onPointerEnterCapture={() => undefined}
                        onPointerLeaveCapture={() => undefined}
                    />
                </Stack>
            </ModalContent>
            <ModalFooter
                onOk={handleConfirm}
                isOkButtonDisabled={
                    !result.activityTitle ||
                    !result.assignee ||
                    !result.processDefinition ||
                    !result.processInstanceTitle
                }
                onCancel={onCancel}
                okButtonLabel={t('okButton')}
                cancelButtonLabel={t('cancelButton')}
            />
        </Flex>
    );
});

ModalContentComponent.displayName = 'ModalContentComponent';
