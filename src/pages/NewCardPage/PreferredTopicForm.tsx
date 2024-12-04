import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
    Select,
    MenuItem,
    Button,
    Box,
    Typography,
    Grid,
    TextField,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import { isEmptyOrUndefined } from 'utils/string';
import { TextField2 } from 'components/form/TextField';
import { isPredefinedTopic, PredefinedTopic } from 'models/PredefinedTopic';
import { TopicCard } from 'models/TopicCard';
import { PersonalInfoForm } from './PersonalInfoForm';

interface FormData {
    topic: string;
    customTopic: string;
}

const topics = ['Travel', 'Cars', 'Wildlife', 'Technology', 'Other'];

const validate = (values: Partial<FormData>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: any = {};
    // if (isEmptyOrUndefined(values.topic)) {
    //     errors.topic = 'Preferred Topic is required';
    // } else if (isPredefinedTopic(values.topic)) {
    //     errors.customTopic = 'required';
    // }
    return errors;
};

const steps = ['Personal Info', 'Preferred Topic', 'Review'];

interface Props {
    onBackStep: () => void;
    onSubmit: (values: Pick<TopicCard, 'topic'>) => void;
}

export const PreferredTopicForm = ({ onBackStep, onSubmit }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmitCallback = (values: FormData) => {
        onSubmit({ topic: values.customTopic ?? values.topic });
    };

    return (
        <Form
            onSubmit={handleSubmitCallback}
            validate={validate}
            render={({ handleSubmit, submitting, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField2
                                fieldName="topic"
                                label="Preferred Topic"
                                select
                            >
                                {topics.map((topic) => (
                                    <MenuItem key={topic} value={topic}>
                                        {topic}
                                    </MenuItem>
                                ))}
                            </TextField2>
                        </Grid>
                        {values.topic === 'Other' && (
                            <Grid item xs={12}>
                                <TextField2
                                    fieldName="customTopic"
                                    label="Custom Topic"
                                    placeholder="Enter your custom topic"
                                />
                            </Grid>
                        )}
                        <Grid item xs={4}>
                            <Button
                                onClick={onBackStep}
                                variant="contained"
                                color="secondary"
                                disabled={submitting}
                            >
                                Back
                            </Button>
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
