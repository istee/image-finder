import React from 'react';
import { Form } from 'react-final-form';
import { Button, Grid } from '@mui/material';
import { isEmptyOrUndefined } from 'utils/string';
import { TextField2 } from 'components/form/TextField';
import { TopicCard } from 'models/TopicCard';

const validate = (values: Pick<TopicCard, 'firstName' | 'surName'>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: any = {};
    if (isEmptyOrUndefined(values.firstName)) {
        errors.firstName = 'Name is required';
    }
    if (isEmptyOrUndefined(values.surName)) {
        errors.surName = 'Surname is required';
    }
    return errors;
};

interface Props {
    onSubmit: (values: Pick<TopicCard, 'firstName' | 'surName'>) => void;
}

export const PersonalInfoForm = ({ onSubmit }: Props) => {
    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField2
                                fieldName="firstName"
                                label="Name"
                                placeholder="Enter your firstname"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField2
                                fieldName="surName"
                                label="Surname"
                                placeholder="Enter your surname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
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
