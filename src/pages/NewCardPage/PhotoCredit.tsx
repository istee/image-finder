import { Typography } from '@mui/material';
import { Photo } from 'models/Photo';
import React from 'react';

interface Props {
    photo: Photo;
}

export const PhotoCredit = ({ photo }: Props) => {
    return (
        <Typography
            variant="body2"
            sx={{
                textAlign: 'center',
                mt: 1,
                fontSize: '0.8rem',
                color: 'text.secondary',
            }}
        >
            Photo by{' '}
            <a
                href={`https://unsplash.com/@${photo.user.username}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {photo.user.name}
            </a>{' '}
            on{' '}
            <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Unsplash
            </a>
        </Typography>
    );
};
