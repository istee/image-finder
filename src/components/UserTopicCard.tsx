import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    CardMedia,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { topicCardByIdSelector } from 'store/selectors/topicCardByIdSelector';
import { useParametricSelector } from 'store/selectors/useParametricSelector';

export interface Props {
    id: string;
    hideUserInfo?: boolean;
    hideTopic?: boolean;
}

export const UserTopicCard = React.memo(function MemoizedCard({
    id,
    hideUserInfo = false,
    hideTopic = false,
}: Props) {
    const topicCard = useParametricSelector(topicCardByIdSelector, id);
    if (!topicCard) {
        return null;
    }
    const { firstName, surName, topic, image } = topicCard;
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <Link to={`/cards/${id}`} style={{ textDecoration: 'none' }}>
                <Box sx={{ position: 'relative', height: 240 }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={image}
                        alt={topic || 'Image'}
                        loading="lazy"
                        sx={{
                            objectFit: 'cover',
                            display: 'block',
                            backgroundColor: '#f0f0f0',
                        }}
                    />
                </Box>
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
});
