import React from 'react';
import { Form } from 'react-final-form';
import { Button, Grid } from '@mui/material';
import { isEmptyOrUndefined } from 'utils/string';
import { TextField } from 'components/form/TextField';
import { TopicCard } from 'models/TopicCard';

type FormData = Pick<TopicCard, 'firstName' | 'surName'>;

type ErrorData = {
    [K in keyof FormData]?: string;
};

const validate = (values: FormData) => {
    const errors: ErrorData = {};
    if (isEmptyOrUndefined(values.firstName)) {
        errors.firstName = 'Name is required';
    }
    if (isEmptyOrUndefined(values.surName)) {
        errors.surName = 'Surname is required';
    }
    return errors;
};

interface Props {
    onSubmit: (values: FormData) => void;
    personalInfo?: FormData;
}

export const PersonalInfoForm = ({ onSubmit, personalInfo }: Props) => {
    return (
        <Form
            initialValues={personalInfo}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fieldName="firstName"
                                label="Name"
                                placeholder="Enter your firstname"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fieldName="surName"
                                label="Surname"
                                placeholder="Enter your surname"
                            />
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={submitting}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        />
    );
};
