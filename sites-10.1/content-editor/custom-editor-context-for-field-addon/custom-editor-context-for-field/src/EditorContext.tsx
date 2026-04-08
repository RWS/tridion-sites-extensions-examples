/**
 * EditorContext.tsx
 *
 * Defines a React Context that allows child components (most notably the custom
 * Field component) to push state changes up to the editor wrapper without
 * prop drilling through the host's rendering tree.
 *
 * The context carries a single action — `setColorCode` — which lets any
 * descendant update the background color of the color-bar rendered at the
 * top of the editor.
 *
 * APIs & patterns used:
 *
 *   Flex  — @tridion-sites/extensions
 *     A layout primitive from the Tridion Sites design system.  Used here to
 *     render a thin decorative color bar above the editor content.
 *     Props used:
 *       • cssStyle  — Inline style overrides (sets backgroundColor dynamically).
 *       • height    — Shorthand height utility (8 = 8 px in the design token scale).
 */
import { createContext, memo, useState } from 'react';

import { type ContentEditorViewExtensionComponentProps, Flex } from '@tridion-sites/extensions';

/**
 * The value shape exposed through EditorContext.
 * `setColorCode` is the only shared action — it allows Field components to
 * change the color displayed in the editor's color bar.
 */
interface EditorContextValue {
    setColorCode: (colorCode: string) => void;
}

/**
 * EditorContext — shared React Context for this extension.
 * Defaults to `undefined`; consumers should guard against this case to handle
 * scenarios where a field is rendered without the EditorContextProvider above it.
 */
export const EditorContext = createContext<EditorContextValue | undefined>(undefined);

/**
 * EditorContextProvider
 *
 * Registered as a Content Editor item-editor wrapper (see registerCustomEditor.ts).
 * Responsibilities:
 *   1. Holds the current `colorCode` state.
 *   2. Exposes `setColorCode` through EditorContext to all descendants.
 *   3. Renders a thin color bar that reflects the current colorCode.
 *   4. Renders `renderEditor` — the host's original editor — inside the provider
 *      so the full Content Editor UI remains functional.
 */
export const EditorContextProvider = memo(({ renderEditor }: ContentEditorViewExtensionComponentProps) => {
    // Local state for the color bar.  Updated by Field components via context.
    const [colorCode, setColorCode] = useState('#000000');

    return (
        // Provide `setColorCode` to all descendant components.
        <EditorContext.Provider value={{ setColorCode }}>
            {/* Thin decorative bar whose background color reflects the current value. */}
            <Flex cssStyle={{ backgroundColor: colorCode }} height={8}></Flex>
            {/* Render the host's original Content Editor view below the color bar. */}
            {renderEditor}
        </EditorContext.Provider>
    );
});

// Explicit displayName improves readability in React DevTools.
EditorContextProvider.displayName = 'EditorContextProvider';
