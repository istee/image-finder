import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    to: string;
    text: string | JSX.Element;
}

export const HeaderLink = ({ to, text }: Props) => {
    return (
        <Button
            component={Link}
            to={to}
            color="inherit"
            sx={{ textTransform: 'none' }}
        >
            {text}
        </Button>
    );
};
