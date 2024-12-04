import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { UserTopicCard, Props as UserTopicCardProps } from './UserTopicCard';
import { Typography, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';

export interface Props<T extends string | undefined>
    extends Omit<UserTopicCardProps, 'id'> {
    group: T;
    idSelector?: (state: RootState, group: T) => string[];
}

export const UserTopicCardList = <T extends string | undefined>({
    group,
    idSelector = (state: RootState) => state.topicCards.allIds,
    ...others
}: Props<T>) => {
    const ids = useSelector((state: RootState) => idSelector(state, group));
    return (
        <Box sx={{ padding: 2 }}>
            {group !== undefined && (
                <>
                    <Typography variant="h6" gutterBottom>
                        {group}
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                </>
            )}
            <Grid container spacing={1} direction="row" wrap="wrap">
                {ids.map((id) => (
                    <Grid key={id} item xs={12} sm={6} md={3} lg={2}>
                        <UserTopicCard id={id} {...others} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
