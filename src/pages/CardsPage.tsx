import { Tabs, Tab, Box, Container, Typography } from '@mui/material';
import { GroupedUserTopicCardList } from 'components/GroupedUserTopicCardList';
import { UserTopicCardList } from 'components/UserTopicCardList';
import React, { useState } from 'react';
import { cardsByNameSelector } from 'store/selectors/cardsByNameSelector';
import { cardsByTopicSelector } from 'store/selectors/cardsByTopicSelector';
import { uniqueNameSelector } from 'store/selectors/uniqueNameSelector';
import { uniqueTopicSelector } from 'store/selectors/uniqueTopicSelector';

export const CardsPage = () => {
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <Container maxWidth="lg" sx={{ paddingY: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                All Cards
            </Typography>

            <Box sx={{ mb: 6 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="Grouping options"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Default" value={0} />
                    <Tab label="Group by Username" value={1} />
                    <Tab label="Group by Topic" value={2} />
                </Tabs>
            </Box>

            <Box>
                {tabValue === 0 && <UserTopicCardList group={undefined} />}
                {tabValue === 1 && (
                    <GroupedUserTopicCardList
                        hideUserInfo
                        groupSelector={uniqueNameSelector}
                        idSelectorByGroup={cardsByNameSelector}
                    />
                )}
                {tabValue === 2 && (
                    <GroupedUserTopicCardList
                        hideTopic
                        groupSelector={uniqueTopicSelector}
                        idSelectorByGroup={cardsByTopicSelector}
                    />
                )}
            </Box>
        </Container>
    );
};
