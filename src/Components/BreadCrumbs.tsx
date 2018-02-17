import * as React from 'react';
import {Link} from 'react-router-dom';

interface Crumb {
    link: string;
    title: string;
}

interface Props {
    crumbs: Crumb[];
}

export default (props: Props) => (
    <ul className="breadcrumb">
        {props.crumbs.map((crumb: Crumb, i: number) => (
            <li className="breadcrumb__item" key={i}>
                <Link to={crumb.link} className="breadcrumb__link">{crumb.title}</Link>
            </li>
        ))}
        <li className="breadcrumb__play">
            <Link to="/play" className="breadcrumb__play-link">Play now</Link>
        </li>
    </ul>
)
