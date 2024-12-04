import React, { useEffect, useState } from 'react';
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
import { PreferredTopicForm } from './PreferredTopicForm';
import { ImageReview } from './ImageReview';
import { Photo } from 'models/Photo';
import { useDispatch } from 'react-redux';
import { createCard } from 'store/topicCards/actionCreators';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    surname: string;
    topic: string;
    customTopic: string;
}

const topics = ['Travel', 'Cars', 'Wildlife', 'Technology', 'Other'];

const validate = (values: Partial<FormData>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: any = {};
    if (isEmptyOrUndefined(values.name)) {
        errors.name = 'Name is required';
    }
    if (isEmptyOrUndefined(values.surname)) {
        errors.surname = 'Surname is required';
    }
    if (isEmptyOrUndefined(values.topic)) {
        errors.topic = 'Preferred Topic is required';
    } else if (isPredefinedTopic(values.topic)) {
        errors.customTopic = 'required';
    }
    return errors;
};

const steps = ['Personal Info', 'Preferred Topic', 'Review'];

export const NewCardPage = () => {
    const dispatch = useDispatch();
    const [newCardId, setNewCardId] = useState<string>();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [personalInfo, setPersonalInfo] =
        useState<Pick<TopicCard, 'firstName' | 'surName'>>();
    const [preferredTopic, setPreferredTopic] =
        useState<Pick<TopicCard, 'topic'>>();

    const handleSubmitPersonalInfo = (
        values: Pick<TopicCard, 'firstName' | 'surName'>
    ) => {
        setPersonalInfo(values);
        setActiveStep(1);
    };

    const handleSubmitPreferredTopic = (values: Pick<TopicCard, 'topic'>) => {
        setPreferredTopic(values);
        setActiveStep(2);
    };

    const handleSubmitPhoto = (photo: Photo) => {
        if (!personalInfo) {
            setActiveStep(0);
            return;
        }
        if (!preferredTopic) {
            setActiveStep(1);
            return;
        }
        const id = uuid();
        dispatch(
            createCard({
                id,
                ...personalInfo,
                ...preferredTopic,
                image: photo.urls.regular,
            })
        );
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNewCardId(id);
    };

    const handleBackStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (newCardId) {
            const timeoutId = setTimeout(
                () => navigate(`/cards/${newCardId}`),
                5000
            );
            return () => clearTimeout(timeoutId);
        }
    }, [newCardId, navigate]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={4}>
                Create a New Card
            </Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === 0 && (
                <PersonalInfoForm onSubmit={handleSubmitPersonalInfo} />
            )}
            {activeStep === 1 && (
                <PreferredTopicForm
                    onSubmit={handleSubmitPreferredTopic}
                    onBackStep={handleBackStep}
                />
            )}
            {activeStep === 2 && (
                <ImageReview
                    topic={preferredTopic?.topic ?? ''}
                    onBackStep={handleBackStep}
                    onSubmit={handleSubmitPhoto}
                />
            )}
            {newCardId !== undefined && (
                <span>
                    Your card has been created. You will be redirected to the
                    card page in 5 seconds.
                </span>
            )}

            {/* <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField2
                                    fieldName="name"
                                    label="Name"
                                    placeholder="Enter your firstname"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField2
                                    fieldName="surname"
                                    label="Surname"
                                    placeholder="Enter your surname"
                                />
                            </Grid>
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
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={submitting}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            /> */}
            {
                <Box mt={4}>
                    <Typography variant="h6">Form Data</Typography>
                    <pre>{JSON.stringify(personalInfo, null, 2)}</pre>
                    <pre>{JSON.stringify(preferredTopic, null, 2)}</pre>
                </Box>
            }
        </Box>
    );
};
