import type { ChangeEvent } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { t } from '@globals';
import type { SelectItem } from '@mantine/core';
import { NativeSelect } from '@mantine/core';
import { type Link, mapToModels, parseItemUri, type ProcessDefinition, type TcmUri } from '@tridion-sites/models';
import { WorkflowService } from '@tridion-sites/open-api-client';

const getProcessDefinitions = async (publicationId: TcmUri) => {
    return await WorkflowService.getProcessDefinitions({ escapedPublicationId: publicationId.asString });
};

export interface ProcessDefinitionSelectProps {
    selectedProcessDefinition: Link | undefined;
    publicationId: TcmUri;
    onSelect: (selectedProcessDefinition: Link) => void;
}

export const useTaskProcessDefinition = ({
    selectedProcessDefinition,
    publicationId,
    onSelect,
}: ProcessDefinitionSelectProps) => {
    const [processDefinitions, setProcessDefinitions] = useState<ReadonlyArray<ProcessDefinition>>();

    const loadProcessDefinitions = useCallback(async () => {
        if (processDefinitions) return;

        const list = await getProcessDefinitions(publicationId);

        setProcessDefinitions(mapToModels<ProcessDefinition>(list));
    }, [processDefinitions, publicationId]);

    useEffect(() => {
        void loadProcessDefinitions();
    }, [loadProcessDefinitions]);

    useEffect(() => {
        if (selectedProcessDefinition) return;

        const taskDefinition = processDefinitions?.find(definition => definition.title === 'Task Process');

        if (!taskDefinition) return;

        onSelect(taskDefinition.getLinkToItem());
    }, [processDefinitions, selectedProcessDefinition, onSelect]);
};
