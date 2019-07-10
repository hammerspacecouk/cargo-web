import * as React from "react";
import { routes } from "../../routes";
import { SimplePage } from "./SimplePage";
import { APP_TITLE } from "../../utils/pageTitle";

interface IProps {
  readonly title?: string;
  readonly children: any;
}

export const AboutLayout = (props: IProps) => {
  let crumbs = null;
  let title = `About ${APP_TITLE}`;
  if (props.title) {
    crumbs = [
      {
        link: routes.getAbout(),
        title,
      },
    ];
    title = props.title;
  }

  return (
    <SimplePage title={title} crumbs={crumbs}>
      {props.children}
    </SimplePage>
  );
};
