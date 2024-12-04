import { useCallback } from 'react';
import { Props as RenderProps } from './HomePageContentBox';
import { uniqueTopicSelector } from 'store/selectors/uniqueTopicSelector';
import { useSelector } from 'react-redux';
import { uniqueNameSelector } from 'store/selectors/uniqueNameSelector';
import { useNavigate } from 'react-router-dom';
import { topicCardIdSelector } from 'store/selectors/topicCardIdSelector';

interface Props {
    render: (props: RenderProps) => JSX.Element;
}

export const CurrentCardsRenderProps = ({ render }: Props) => {
    const topics = useSelector(uniqueTopicSelector);
    const users = useSelector(uniqueNameSelector);
    const ids = useSelector(topicCardIdSelector);
    const navigate = useNavigate();
    const navigateToTopicCards = useCallback(
        () => navigate('/cards'),
        [navigate]
    );

    return render({
        title: 'Existing topic cards',
        description:
            topics.length > 0 && users.length > 0
                ? `There are ${topics.length} unique topics from ${users.length} unique users. Total of ${ids.length} cards.`
                : 'No topics or users',
        actionText: 'View Cards',
        onActionClick: navigateToTopicCards,
    });
};
