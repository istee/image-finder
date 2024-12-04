import React from 'react';
import { Form } from 'react-final-form';
import { MenuItem, Button, Grid } from '@mui/material';
import { isEmptyOrUndefined } from 'utils/string';
import { TextField2 } from 'components/form/TextField';
import { isPredefinedTopic } from 'models/PredefinedTopic';
import { TopicCard } from 'models/TopicCard';

interface FormData {
    topic: string;
    customTopic: string;
}

type ErrorData = {
    [K in keyof FormData]?: string;
};

const topics = ['Travel', 'Cars', 'Wildlife', 'Technology', 'Other'];

const validate = (values: Partial<FormData>) => {
    const errors: ErrorData = {};
    if (isEmptyOrUndefined(values.topic)) {
        errors.topic = 'Preferred Topic is required';
    } else if (
        !isPredefinedTopic(values.topic) &&
        isEmptyOrUndefined(values.customTopic)
    ) {
        errors.customTopic = 'Custom Topic is required';
    }
    return errors;
};

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
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Button
                                    onClick={onBackStep}
                                    variant="contained"
                                    color="secondary"
                                    disabled={submitting}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
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
                    </Grid>
                </form>
            )}
        />
    );
};
