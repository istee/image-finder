import {
    TextField as MuiTextField,
    StandardTextFieldProps,
} from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';

interface Props extends StandardTextFieldProps {
    fieldName: string;
    select?: boolean;
    children?: React.ReactNode;
}

export const TextField = ({
    fieldName,
    children,
    fullWidth = true,
    ...others
}: Props) => {
    return (
        <Field name={fieldName}>
            {({ input, meta }) => (
                <MuiTextField
                    {...input}
                    {...others}
                    variant="outlined"
                    fullWidth={fullWidth}
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                >
                    {children}
                </MuiTextField>
            )}
        </Field>
    );
};
