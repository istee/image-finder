import { TextField as MuiTextField } from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';

interface Props {
    fieldName: string;
    label: string;
    placeholder?: string;
    select?: boolean;
    children?: React.ReactNode;
}

export const TextField2 = ({ fieldName, children, ...others }: Props) => {
    return (
        <Field name={fieldName}>
            {({ input, meta }) => (
                <MuiTextField
                    {...input}
                    {...others}
                    variant="outlined"
                    fullWidth
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                >
                    {children}
                </MuiTextField>
            )}
        </Field>
    );
};
