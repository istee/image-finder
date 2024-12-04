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
            <h1>Card with id: {id}</h1>
            <UserTopicCard id={id} />
        </div>
    );
};
