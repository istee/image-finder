import { useCallback } from 'react';
import { Props as RenderProps } from './HomePageContentBox';
import { useDispatch } from 'react-redux';
import { mockedData } from 'store/mockedData';
import { createCard } from 'store/topicCards';

interface Props {
    render: (props: RenderProps) => JSX.Element;
}

export const GenerateTopicsRenderProps = ({ render }: Props) => {
    const dispatch = useDispatch();
    const navigateToTopicCards = useCallback(
        () =>
            mockedData.forEach((topicCard) => dispatch(createCard(topicCard))),
        [dispatch]
    );

    return render({
        title: 'Generate new users and topics',
        description:
            "Don't want to manually enter a new topic card? Click below to generate new users and topics",
        actionText: 'Generate',
        onActionClick: navigateToTopicCards,
    });
};
