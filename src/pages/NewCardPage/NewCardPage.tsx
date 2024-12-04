import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Stepper, Step, StepLabel } from '@mui/material';
import { TopicCard } from 'models/TopicCard';
import { PersonalInfoForm } from './PersonalInfoForm';
import { PreferredTopicForm } from './PreferredTopicForm';
import { ImageReview } from './ImageReview';
import { Photo } from 'models/Photo';
import { useDispatch } from 'react-redux';
import { createCard } from 'store/topicCards/actionCreators';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

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
        <Grid container justifyContent="center">
            <Grid item sx={{ p: 4 }} lg={8}>
                <Typography variant="h4" mb={4} align="center">
                    Create a New Card
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mb: 4 }}>
                    {activeStep === 0 && (
                        <PersonalInfoForm
                            onSubmit={handleSubmitPersonalInfo}
                            personalInfo={personalInfo}
                        />
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
                </Box>

                {newCardId !== undefined && (
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="body1">
                            Your card has been created. You will be redirected
                            to the card page in 5 seconds.
                        </Typography>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};
