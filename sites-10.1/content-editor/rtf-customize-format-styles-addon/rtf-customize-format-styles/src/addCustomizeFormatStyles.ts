import { useCallback } from 'react';
import type { RawEditorOptions } from 'tinymce';

import { getConfiguration } from '@globals';
import type { ExtensionBuilder } from '@tridion-sites/extensions';
import { useOptionalComponentEditor } from '@tridion-sites/extensions';
import { XhtmlFieldDefinition } from '@tridion-sites/models';

import { christmasFormats, contentStyle, easterFormats, stylesConfig, stylesForPreview } from './stylesConfig';

interface Configuration {
    ['christmas-styled-schema-id']: string;
    ['easter-styled-schema-id']: string;
}

/**
 * This example illustrates how to add custom styles to the TinyMCE rich text editor using
 * the content_style and style_formats properties.
 *
 * content_style
 * (see https://www.tiny.cloud/docs/tinymce/latest/add-css-options/#content_style)
 *
 * The content_style property allows implementers to define a set of CSS rules as a string,
 * and can be used to perform a similar role to the Classic UIs FormatAreaStyle.css file.
 * https://docs.rws.com/1099765/105174/tridion-sites-10-main-documentation/configuring-styles
 *
 * Any class names defined in the content_style property can be used to style the content.
 *
 * style_formats
 * (see https://www.tiny.cloud/docs/tinymce/latest/user-formatting-options/#style_formats)
 *
 * To make the class names available to editors in the UI (via the Styles dropdown in the
 * toolbar), the style_formats property should be used. This property associates a custom name
 * in the Styles dropdown with a CSS class name. In order for users to see the effect of a
 * class name in the editor, it should match one of the classes defined in the content_style
 * property.
 *
 * In addition to associating dropdown styles to class names, this property can also be used
 * for defining inline styles, and for customizing the structure of the dropdown options.
 *
 * formats
 * (see https://www.tiny.cloud/docs/tinymce/latest/content-formatting/#formats)
 * In addition to providing custom styles, rich text editor extensions could also overwrite
 * the default styles used for the various formatting options (e.g., bold, h1, p, etc.).
 *
 * This example shows how to configure custom formats, but if you only want to define custom
 * CSS styles, the code can be removed.
 */
export const addCustomizeFormatStyles = (builder: ExtensionBuilder) => {
    builder.contentEditor.richTextField.customize({
        id: 'customize-styles',
        useRichTextField: ({ fieldDefinition }) => {
            const componentEditor = useOptionalComponentEditor();
            const configuration = getConfiguration<Configuration>();
            const christmasStyledSchemaId = configuration ? configuration['christmas-styled-schema-id'] : undefined;
            const easterStyledSchemaId = configuration ? configuration['easter-styled-schema-id'] : undefined;

            const customize = useCallback(
                (config: RawEditorOptions) => {
                    const isChristmasStyledSchemaId = componentEditor?.schema?.id?.asString === christmasStyledSchemaId;
                    const isEasterStyledSchemaId = componentEditor?.schema?.id?.asString === easterStyledSchemaId;

                    if (isChristmasStyledSchemaId) {
                        config.formats = {
                            ...config.formats,
                            ...christmasFormats,
                        };
                    }
                    if (isEasterStyledSchemaId) {
                        config.formats = {
                            ...config.formats,
                            ...easterFormats,
                        };
                    }

                    if (stylesConfig.formats) {
                        config.formats = {
                            ...config.formats,
                            ...stylesConfig.formats,
                        };
                    }

                    if (stylesConfig.style_formats) {
                        for (const format of stylesConfig.style_formats) {
                            // Since some of the tinymce types and interfaces are not available for importing directly,
                            // properties which they include should be checked directly.
                            if (fieldDefinition instanceof XhtmlFieldDefinition && 'name' in format && format.name) {
                                // If field definition includes a style format name that is disallowed by the schema, skip it.
                                if (fieldDefinition.formattingFeatures?.disallowedStyles?.includes(format.name)) {
                                    continue;
                                }

                                // If current field is not based on a Christmas or Easter schema, theme-related style formats should not be added skipped.
                                if (!isChristmasStyledSchemaId && !isEasterStyledSchemaId) {
                                    if (format.name in christmasFormats || format.name in easterFormats) {
                                        continue;
                                    }
                                }
                            }

                            config.style_formats?.push(format);
                        }
                    }

                    for (const [name, style] of contentStyle) {
                        if (
                            fieldDefinition instanceof XhtmlFieldDefinition &&
                            !fieldDefinition.formattingFeatures?.disallowedStyles?.includes(name)
                        ) {
                            config.content_style += style;
                        }
                    }

                    config.preview_styles = stylesForPreview;
                },
                [christmasStyledSchemaId, componentEditor?.schema?.id?.asString, easterStyledSchemaId],
            );

            return {
                customize,
                isAvailable: true,
            };
        },
    });
};
