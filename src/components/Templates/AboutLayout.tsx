import * as React from "react";
import { SimplePage } from "./SimplePage";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { APP_TITLE } from "@src/utils/pageTitle";
import { CrumbTitle } from "@src/components/Molecules/CrumbTitle";
import { routes } from "@src/routes";

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
    <SimplePage>
      <Panel>
        <CrumbTitle crumbs={crumbs}>{title}</CrumbTitle>
        {props.children}
      </Panel>
    </SimplePage>
  );
};

const Panel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
`;
