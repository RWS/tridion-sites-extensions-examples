import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const CodeMergeIcon = (props: CustomIconProps): JSX.Element => (
    <Icon {...props} viewBox="0 0 14 16">
        <path d="M11.5 6c-1.303 0-2.375 1-2.49 2.275-.788-.04-1.926-.247-2.776-.99C5.6 6.727 5.21 5.94 5.063 4.937A2.5 2.5 0 004.5.004 2.497 2.497 0 002 2.5c0 1.21.86 2.219 2 2.45v6.1a2.501 2.501 0 101 0V7.419c.172.225.366.434.581.622 1.138.99 2.603 1.212 3.544 1.24A2.5 2.5 0 1011.5 6zM3 2.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm3 11a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5.5-3.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </Icon>
);
