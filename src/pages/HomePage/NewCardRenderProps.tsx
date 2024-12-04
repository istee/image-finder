import { useCallback } from 'react';
import { Props as RenderProps } from './HomePageContentBox';
import { useNavigate } from 'react-router-dom';

interface Props {
    render: (props: RenderProps) => JSX.Element;
}

export const NewCardRenderProps = ({ render }: Props) => {
    const navigate = useNavigate();
    const navigateToNewCard = useCallback(
        () => navigate('/cards/new'),
        [navigate]
    );

    return render({
        title: 'Create a new topic card',
        description: 'Enter your name and a topic to create a new topic card',
        actionText: 'New topic card',
        onActionClick: navigateToNewCard,
    });
};
