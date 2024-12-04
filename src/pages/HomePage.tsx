import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from 'store/topicCards/actionCreators';
import { mockedData } from 'store/mockedData';
import { RootState } from 'store/store';

export const HomePage = () => {
    const topicCards = useSelector((state: RootState) => state.topicCards);
    const dispatch = useDispatch();
    return (
        <div>
            <span>HomePage</span>
            <span>{JSON.stringify(topicCards)}</span>
            {topicCards.allIds.length === 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        mockedData.forEach((topicCard) =>
                            dispatch(createCard(topicCard))
                        )
                    }
                >
                    Add some cards
                </Button>
            )}
        </div>
    );
};
