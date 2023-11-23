import { t } from '@globals';

const unsecuredCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error(t('unableToCopyMessage'), err);
    }

    document.body.removeChild(textArea);
};

/**
 * Solution: https://stackoverflow.com/a/71876238
 *
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available
 * Then uses standard clipboard API, otherwise uses fallback
 */
export const copyTextToClipboard = (text: string) => {
    if (window.isSecureContext && window.navigator.clipboard) {
        void window.navigator.clipboard.writeText(text);
    } else {
        unsecuredCopyToClipboard(text);
    }
};
