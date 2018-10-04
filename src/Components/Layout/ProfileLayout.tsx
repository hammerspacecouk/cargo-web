import * as React from "react";
import routes from "../../routes";
import SimplePage from "./SimplePage";

interface PropsInterface {
  readonly title?: string;
  readonly children: any;
}

export default (props: PropsInterface) => {
  let crumbs = null;
  let title = "Profile";
  if (props.title) {
    crumbs = [
      {
        link: routes.getProfile(),
        title
      }
    ];
    title = props.title;
  }

  return (
    <SimplePage title={title} crumbs={crumbs}>
      {props.children}
    </SimplePage>
  );
};
