import type { Formats, RawEditorOptions } from 'tinymce';

export const stylesForPreview = 'font-size background-color font-style text-decoration color';

interface DynamicFormats {
    themedParagraph: Formats.Format;
    themedSpan: Formats.Format;
    themedHeader: Formats.Format;
}

export const stylesConfig: RawEditorOptions = {
    formats: {
        strikethrough: { inline: 'del' },
    },
    style_formats: [
        { title: 'Strikethrough', format: 'strikethrough' },
        { title: 'Blue header', block: 'h1', classes: 'blueText' },
        { name: 'blueText', title: 'Blue text', classes: 'blueText', inline: 'span' },
        { name: 'customStyle', title: 'Custom text', classes: 'customStyle', inline: 'span' },
        { name: 'themedParagraph', title: 'Themed paragraph', format: 'themedParagraph' },
        { name: 'themedSpan', title: 'Themed span', format: 'themedSpan' },
        { name: 'themedHeader', title: 'Themed header', format: 'themedHeader' },
    ],
};

export const contentStyle = new Map([
    ['customStyle', '.customStyle { color: #008f00; font-size: 20px; }'],
    ['blueText', '.blueText { color: #0050ff; }'],
]);

export const christmasFormats: DynamicFormats = {
    themedParagraph: { block: 'p', styles: { color: '#7f0000', fontSize: '20px' } },
    themedSpan: { inline: 'span', styles: { color: '#008f00', fontSize: '20px' } },
    themedHeader: { block: 'h1', styles: { backgroundColor: '#f7d514', color: '#ffffff' } },
};

export const easterFormats: DynamicFormats = {
    themedParagraph: { block: 'p', styles: { color: '#d3a7c1', fontSize: '20px' } },
    themedSpan: { inline: 'span', styles: { color: '#03d7fc', fontSize: '20px' } },
    themedHeader: { block: 'h1', styles: { backgroundColor: '#f0b133', color: '#ffffff' } },
};
