import { memo, useCallback, useEffect, useState } from 'react';

import { getConfiguration, t } from '@globals';
import { type ContentEditorViewExtensionComponentProps, useConfirmation } from '@tridion-sites/extensions';
import type { Link } from '@tridion-sites/models';
import { parseItemUri, RepositoryLocalObject } from '@tridion-sites/models';

interface Configuration {
    ['archived-keyword']: string;
}

interface ComponentMetadataBase {
    contentState: Link;
}

export const ItemEditorWrapper = memo(
    ({ isReadonly, item, renderEditor }: ContentEditorViewExtensionComponentProps) => {
        const configuration = getConfiguration<Configuration>();
        const [isConfirmed, setIsConfirmed] = useState(false);

        const handleCancel = useCallback(() => {
            history.back();
        }, []);

        const handleConfirm = useCallback(() => {
            setIsConfirmed(true);
        }, []);

        const { open } = useConfirmation({
            title: t('confirmationDialog.title'),
            description: t('confirmationDialog.description'),
            onConfirm: handleConfirm,
            onCancel: handleCancel,
        });

        const checkAndWarn = useCallback(() => {
            if (!(item instanceof RepositoryLocalObject)) return;
            if (!item.metadata || !('contentState' in item.metadata)) return;

            const metadata = item.metadata as ComponentMetadataBase;

            const metadataKeywordId = metadata?.contentState?.idRef;
            const configurationTargetIdString = configuration?.['archived-keyword'];

            if (!metadataKeywordId || !configurationTargetIdString) return;

            const configurationTargetId = parseItemUri(configurationTargetIdString).getUriInPublication(
                metadataKeywordId.getPublicationUri(),
            );

            if (metadataKeywordId !== configurationTargetId) return;

            open();
        }, [configuration, item, open]);

        useEffect(() => {
            // This effect is called earlier than navigation performed to set default SubTab ('general.content'), as a result modal is closed.
            // By setting timeout we wait for navigation to be done and only then open confirmation Modal.
            if (!isReadonly) {
                setTimeout(checkAndWarn, 2000);
            }
        }, [checkAndWarn, isReadonly]);

        return <>{renderEditor}</>;
    },
);

ItemEditorWrapper.displayName = 'ItemEditorWrapper';
