import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { H1 } from "../Atoms/Heading";
import { ListInline } from "../Atoms/List/ListInline";

export interface ICrumb {
  link: string;
  title: string;
}

interface IProps {
  crumbs?: ICrumb[];
  children: any;
}

const StyledCrumbTitle = styled.div`
  display: block;
`;

const Crumb = styled.li`
  margin-right: ${GRID.HALF};
  &:after {
    content: "/";
    display: inline-block;
    margin-left: ${GRID.HALF};
  }
`;

const CrumbLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;

const CrumbTitleH1 = styled(H1)`
  display: block;
  margin-top: ${GRID.HALF};
`;

export const CrumbTitle = React.memo((props: IProps) => {
  const crumbs = [
    {
      link: "/",
      title: "Home",
    },
    ...(props.crumbs || []),
  ];

  return (
    <StyledCrumbTitle>
      <ListInline>
        {crumbs.map((crumb: ICrumb) => (
          <Crumb key={crumb.link}>
            <CrumbLink href={crumb.link}>{crumb.title}</CrumbLink>
          </Crumb>
        ))}
      </ListInline>
      <CrumbTitleH1>{props.children}</CrumbTitleH1>
    </StyledCrumbTitle>
  );
});
