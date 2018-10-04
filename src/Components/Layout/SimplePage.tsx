import * as React from "react";
import CrumbTitle, { Crumb } from "../Navigation/CrumbTitle";

interface PropsInterface {
  readonly title: string;
  readonly children: any;
  readonly crumbs?: Crumb[];
}

export default (props: PropsInterface) => (
  <div className="t-doc">
    <div className="t-doc__title">
      <CrumbTitle crumbs={props.crumbs}>{props.title}</CrumbTitle>
    </div>
    <div className="t-doc__main">{props.children}</div>
  </div>
);
