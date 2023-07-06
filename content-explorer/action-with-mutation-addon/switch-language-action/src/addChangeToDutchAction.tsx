import { useCallback, useMemo } from 'react';

import { t } from '@globals';
import type {
    ExtensionBuilder} from '@tridion-sites/extensions';
import {
    useChangeUserLanguageMutation,
    useNotifications,
    useUserProfile,
} from '@tridion-sites/extensions';

import { NlFlagIcon } from './icons';

const DUTCH_LANGUAGE_ID = 1043;

export const addChangeToDutchAction = (builder: ExtensionBuilder) => {
    builder.contentExplorer.addAction(() => ({
        id: 'langToNl',
        icon: <NlFlagIcon />,
        label: t('nl.buttonTitle'),
        useAction: () => {
            const { notify } = useNotifications();
            const { userProfile } = useUserProfile();
            const { mutateAsync } = useChangeUserLanguageMutation();

            const isAvailable = useMemo(() => {
                if (!userProfile?.user?.id) return false;
                if (userProfile.user.languageId === DUTCH_LANGUAGE_ID) return false;

                return true;
            }, [userProfile.user?.id, userProfile.user?.languageId]);

            const execute = useCallback(async () => {
                if (!userProfile?.user?.id) return;

                try {
                    await mutateAsync({ languageId: DUTCH_LANGUAGE_ID, userId: userProfile?.user?.id });
                    notify({
                        type: 'info',
                        title: t('nl.notification.title'),
                        description: t('nl.notification.description'),
                        showInMessageCenter: true,
                    });
                } catch (error) {
                    console.error(error);
                    notify({
                        title: t('errorTitle'),
                        type: 'error',
                    });
                }
            }, [mutateAsync, notify, userProfile?.user?.id]);

            return {
                isAvailable,
                execute,
            };
        },
    }));
};
