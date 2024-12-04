import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    CardMedia,
    Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Link } from 'react-router-dom';

export interface Props {
    id: string;
    hideUserInfo?: boolean;
    hideTopic?: boolean;
}

export const UserTopicCard = ({
    id,
    hideUserInfo = false,
    hideTopic = false,
}: Props) => {
    const topicCard = useSelector(
        (state: RootState) => state.topicCards.byId[id]
    );
    const { firstName, surName, topic, image } = topicCard;
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <Link to={`/cards/${id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={image}
                    alt={topic}
                />
                <CardContent>
                    {!hideUserInfo && (
                        <Typography variant="h5" component="div">
                            {firstName} {surName}
                        </Typography>
                    )}
                    {!hideTopic && (
                        <Box mt={1}>
                            <Chip label={topic} color="primary" />
                        </Box>
                    )}
                </CardContent>
            </Link>
        </Card>
    );
};
