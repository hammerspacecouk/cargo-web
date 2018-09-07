import * as React from "react";
import { Link } from "react-router-dom";

interface Crumb {
  link: string;
  title: string;
}

export interface Props {
  crumbs?: Crumb[];
  children: any;
}

export default (props: Props) => {
  let crumbs = [
    {
      link: "/",
      title: "Home"
    },
    ...(props.crumbs || [])
  ];

  return (
    <div className="crumb-title">
      <ul className="crumb-title__crumbs">
        {crumbs.map((crumb: Crumb) => (
          <li key={crumb.link}>
            <Link to={crumb.link} className="crumb-title__link">
              {crumb.title}
            </Link>
          </li>
        ))}
      </ul>
      <h1 className="crumb-title__title">{props.children}</h1>
    </div>
  );
};
