import { Tabs, Tab, Box, Container, Typography } from '@mui/material';
import { GroupedUserTopicCardList } from 'components/GroupedUserTopicCardList';
import { UserTopicCardList } from 'components/UserTopicCardList';
import React, { useState } from 'react';
import { RootState } from 'store/store';

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
                        groupSelector={(state: RootState) =>
                            Array.from(
                                new Set(
                                    state.topicCards.allIds.map(
                                        (id) =>
                                            `${state.topicCards.byId[id].firstName} ${state.topicCards.byId[id].surName}`
                                    )
                                )
                            )
                        }
                        idSelectorByGroup={(state: RootState, group: string) =>
                            state.topicCards.allIds.filter(
                                (id) =>
                                    group ===
                                    `${state.topicCards.byId[id].firstName} ${state.topicCards.byId[id].surName}`
                            )
                        }
                    />
                )}
                {tabValue === 2 && (
                    <GroupedUserTopicCardList
                        hideTopic
                        groupSelector={(state: RootState) =>
                            Array.from(
                                new Set(
                                    state.topicCards.allIds.map(
                                        (id) => state.topicCards.byId[id].topic
                                    )
                                )
                            )
                        }
                        idSelectorByGroup={(state: RootState, group: string) =>
                            state.topicCards.allIds.filter(
                                (id) =>
                                    group === state.topicCards.byId[id].topic
                            )
                        }
                    />
                )}
            </Box>
        </Container>
    );
};
