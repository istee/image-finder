import { HeaderLink } from 'HeaderLink';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
    to: string;
    text: string | JSX.Element;
}

export const HeaderListItem = (props: Props) => {
    const location = useLocation();

    return location.pathname !== props.to ? (
        <li>
            <HeaderLink {...props} />
        </li>
    ) : null;
};
