import { Tabs, Tab } from '@mui/material';
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
        <>
            <h1>All cards</h1>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Grouping options"
            >
                <Tab label="Default" value={0} />
                <Tab label="Group by Username" value={1} />
                <Tab label="Group by Topic" value={2} />
            </Tabs>
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
                            (id) => group === state.topicCards.byId[id].topic
                        )
                    }
                />
            )}
        </>
    );
};
