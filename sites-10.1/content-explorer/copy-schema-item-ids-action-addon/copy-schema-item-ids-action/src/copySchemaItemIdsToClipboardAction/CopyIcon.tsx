import type { CustomIconProps } from '@tridion-sites/extensions';
import { Icon } from '@tridion-sites/extensions';

export const CopyIcon = (props: CustomIconProps): JSX.Element => (
    <Icon {...props} viewBox="0 0 14 16">
        <path d="M13.56 2.06L11.94.44A1.5 1.5 0 0 0 10.878 0H5.5A1.5 1.5 0 0 0 4 1.5V3H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h7a1.5 1.5 0 0 0 1.5-1.5V13h2.5a1.5 1.5 0 0 0 1.5-1.5V3.121a1.5 1.5 0 0 0-.44-1.06zM11 1.016a.496.496 0 0 1 .232.131l1.622 1.622c.064.064.109.144.13.232H11V1.015zM9 14.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H4v7.5A1.5 1.5 0 0 0 5.5 13H9v1.5zm4-3a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H10v2.25c0 .413.338.75.75.75H13v7.5z" />
    </Icon>
);
