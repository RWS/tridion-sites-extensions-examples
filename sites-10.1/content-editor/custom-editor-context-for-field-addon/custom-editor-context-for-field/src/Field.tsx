/**
 * Field.tsx
 *
 * A custom Content Editor form-field component registered via
 * builder.contentEditor.addFormField() (see registerCustomEditor.ts).
 *
 * Purpose:
 *   Renders a button next to every form field that, when clicked, pushes a
 *   randomly generated hex color up to the EditorContextProvider via the
 *   shared EditorContext.  The provider then updates the color bar at the top
 *   of the editor, demonstrating cross-component communication using React
 *   Context within a Tridion Sites extension.
 *
 * APIs & patterns used:
 *
 *   ContentEditorFormFieldExtensionProps  — @tridion-sites/extensions
 *     Props injected by the host into every form-field component registered
 *     via builder.contentEditor.addFormField().  Key prop:
 *       • renderField — The host's original field node.  Must be rendered so
 *                       the normal editing experience is preserved.
 *
 *   Button  — @tridion-sites/extensions
 *     A Tridion Sites design-system button primitive.
 *     Props used:
 *       • onClick — Handler called when the user clicks the button.
 *       • label   — Accessible button text; also shows the pending color code.
 *
 *   Flex  — @tridion-sites/extensions
 *     Layout primitive from the Tridion Sites design system.
 *     Props used:
 *       • direction  — "row" lays children out horizontally.
 *       • shouldFill — Causes the child Flex to expand and consume remaining space,
 *                      keeping the button pinned to the trailing edge.
 */
import { memo, useContext, useEffect, useState } from 'react';

import { Button, type ContentEditorFormFieldExtensionProps, Flex } from '@tridion-sites/extensions';

import { EditorContext } from './EditorContext';

export const Field = memo(({ renderField }: ContentEditorFormFieldExtensionProps) => {
    // Access the shared context so we can push color changes up to the editor wrapper.
    const context = useContext(EditorContext);

    // Local state: the color code that will be applied when the button is clicked.
    const [colorCode, setColorCode] = useState('#000000');

    /** Generates a random 6-digit hex color string, e.g. "#a3f0c2". */
    const randomHex = () =>
        `#${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, '0')}`;

    /** Sends the current pending color up to the EditorContextProvider. */
    const updateColor = () => {
        context?.setColorCode(colorCode);
    };

    // On mount, pick a random color so each field renders a unique proposal.
    useEffect(() => {
        setColorCode(randomHex());
    }, []);

    return (
        // Row layout: original field on the left (fills available space),
        // color-change button pinned to the right.
        <Flex direction="row">
            {/* Render the host's original field so editing remains functional. */}
            <Flex shouldFill={true}>{renderField}</Flex>
            {/* Button label previews the color code that will be applied. */}
            <Flex marginLeft="xs">
                <Button onClick={updateColor} label={`Change to ${colorCode}`} />
            </Flex>
        </Flex>
    );
});

// Explicit displayName improves readability in React DevTools.
Field.displayName = 'Field';
