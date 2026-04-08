import { memo, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { Button, type ContentEditorMultivalueFormFieldExtensionProps, Flex } from '@tridion-sites/extensions';
import { MultimediaLinkFieldDefinition } from '@tridion-sites/models';
import type { Link } from '@tridion-sites/open-api-client';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const Field = memo(
    ({
        fieldDefinition,
        isDisabled,
        isReadOnly,
        setValues,
        values,
    }: ContentEditorMultivalueFormFieldExtensionProps<Link>) => {
        const label = fieldDefinition.description;
        const defaultValue =
            fieldDefinition instanceof MultimediaLinkFieldDefinition ? fieldDefinition.defaultValue : undefined;

        const onClear = useCallback(() => {
            setValues(defaultValue ? [defaultValue.getInternalModel()] : []);
        }, [defaultValue, setValues]);

        return (
            <Flex direction="row">
                <FormControl sx={{ m: 1, width: 300, flexGrow: 1 }} disabled={isDisabled || isReadOnly}>
                    <Select
                        id="multiselect-field"
                        open={false} // Disable the default dropdown, as we will use a custom item selector
                        multiple={true}
                        value={values ?? []}
                        disabled={isDisabled || isReadOnly}
                        input={
                            <OutlinedInput
                                id="select-multiple-chip"
                                label={label}
                                notched={false}
                                sx={{
                                    backgroundColor: '#fff',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#758099',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#007373',
                                        boxShadow: 'inset 0 0 0 1px #007373',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#758099',
                                    },
                                }}
                            />
                        }
                        renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected ?? []).map(value => {
                                    return <Chip key={value.IdRef} label={value.Title} />;
                                })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    ></Select>
                </FormControl>
                {!isReadOnly && (
                    <>
                        <Button onClick={() => alert('Your Item selector opened')} label="Select" />
                        <Flex marginLeft="xs">
                            <Button onClick={onClear} label="Reset to default" />
                        </Flex>
                    </>
                )}
            </Flex>
        );
    },
);

Field.displayName = 'Field';
