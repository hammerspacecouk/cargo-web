import * as React from "react";
import { routes } from "../../../routes";
import { SimplePage } from "../SimplePage/SimplePage";

interface IProps {
  readonly title?: string;
  readonly children: any;
}

export const AboutLayout = (props: IProps) => {
  let crumbs = null;
  let title = "About Planet Cargo";
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
