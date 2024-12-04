import { Grid, Typography } from '@mui/material';
import { UserTopicCard } from 'components/UserTopicCard';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const CardPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    useEffect(() => {
        if (id === '0') {
            navigate('/');
        }
    }, [id, navigate]);
    if (id === undefined) {
        return null;
    }
    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Card with id: {id}
            </Typography>

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ maxWidth: 1200, margin: '0 auto' }}
            >
                <Grid item xs={12} md={6} lg={4}>
                    <UserTopicCard id={id} />
                </Grid>
            </Grid>
        </div>
    );
};
