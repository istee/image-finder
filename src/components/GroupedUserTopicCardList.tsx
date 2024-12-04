import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
    UserTopicCardList,
    Props as UserTopicCardListProps,
} from './UserTopicCardList';

interface Props
    extends Pick<UserTopicCardListProps<string>, 'hideUserInfo' | 'hideTopic'> {
    groupSelector: (state: RootState) => string[];
    idSelectorByGroup: (state: RootState, group: string) => string[];
}

export const GroupedUserTopicCardList = ({
    groupSelector,
    idSelectorByGroup,
    ...others
}: Props) => {
    const groups = useSelector((state: RootState) => groupSelector(state));
    return (
        <>
            {groups.map((group) => (
                <UserTopicCardList
                    key={group}
                    group={group}
                    idSelector={idSelectorByGroup}
                    {...others}
                />
            ))}
        </>
    );
};
