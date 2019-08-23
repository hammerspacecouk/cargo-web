import * as React from "react";
import { SimplePage } from "./SimplePage";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { H1 } from "../Atoms/Heading";

interface IProps {
  readonly title?: string;
  readonly children: any;
}

export const AboutLayout = (props: IProps) => {
  // let crumbs = null;
  // let title = `About ${APP_TITLE}`;
  // if (props.title) {
  //   crumbs = [
  //     {
  //       link: routes.getAbout(),
  //       title,
  //     },
  //   ];
  //   title = props.title;
  // }

  return (
    <SimplePage>
      <Panel>
        <PanelHeading>About</PanelHeading>
        {props.children}
      </Panel>
    </SimplePage>
  );
};

const Panel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
`;

const PanelHeading = styled(H1)`
  margin-bottom: ${GRID.UNIT};
`;
