import type { ReactNode } from 'react';
import { memo, useState } from 'react';

import {
    autoUpdate,
    flip,
    FloatingPortal,
    offset,
    safePolygon,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';

export interface HoverPopoverProps {
    reference: ReactNode;
    children: ReactNode;
}

// Demonstrates using Floating UI (https://floating-ui.com/) for positioned hover popups
// instead of the native browser tooltip.
export const HoverPopover = memo(({ reference, children }: HoverPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom',
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), flip(), shift({ padding: 8 })],
    });

    const hover = useHover(context, {
        move: false,
        delay: { open: 150, close: 100 },
        handleClose: safePolygon(),
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

    return (
        <>
            <span ref={refs.setReference} {...getReferenceProps()} style={{ display: 'inline-flex' }}>
                {reference}
            </span>
            {isOpen ? (
                <FloatingPortal>
                    <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 10000 }} {...getFloatingProps()}>
                        {children}
                    </div>
                </FloatingPortal>
            ) : null}
        </>
    );
});

HoverPopover.displayName = 'HoverPopover';
