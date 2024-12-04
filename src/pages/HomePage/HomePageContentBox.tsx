import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

export interface Props {
    title: string;
    description: string;
    actionText: string;
    onActionClick: () => void;
}

export const HomePageContentBox = ({
    title,
    description,
    actionText,
    onActionClick,
}: Props) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Box
                sx={{
                    borderColor: 'primary.main',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '250px',
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    {description}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 'auto' }}
                    onClick={onActionClick}
                >
                    {actionText}
                </Button>
            </Box>
        </Grid>
    );
};
