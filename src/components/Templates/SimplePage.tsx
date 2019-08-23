import * as React from "react";
import styled from "styled-components";
import { H1 } from "../Atoms/Heading";
import { IChildrenProps } from "../../interfaces";
import { routes } from "../../routes";
import { BREAKPOINTS } from "../../styles/media";
import { GRID } from "../../styles/variables";
import { Button } from "../Atoms/Button";
import { APP_TITLE } from "../../utils/pageTitle";
import { ListInline } from "../Atoms/List/ListInline";
import { COLOURS } from "../../styles/colours";

// todo - title prop to switch on/off <h1> and put in main panel
//  Allow children to be wrapped/unwrapped in main panel
export const SimplePage = ({ children }: IChildrenProps) => (
  <TemplateSimple>
    <TemplateIntro>
      <IntroBits>
        <LogoLink href={routes.getHome()}>
          <Logo>🎷</Logo>
          <StyledTitle>{APP_TITLE}</StyledTitle>
        </LogoLink>
        <Button as="a" href={routes.getPlay()}>
          Go to game
        </Button>
      </IntroBits>
    </TemplateIntro>
    <TemplateMain>
      {children}
      <FooterPanel>
        <ListInline lined>
          <li>
            <a href={routes.getAbout()}>About</a>
          </li>
          <li>
            <a href={routes.getAboutPolicies()}>Privacy Policy</a>
          </li>
          <li>
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://www.hammerspace.co.uk" target="_blank">
              Hammerspace LTD
            </a>
          </li>
        </ListInline>
      </FooterPanel>
    </TemplateMain>
  </TemplateSimple>
);

const LogoLink = styled.a`
  color: inherit;
`;

const TemplateSimple = styled.div`
  position: relative;
  max-width: 67rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: [main] 1fr [edge-right];
  grid-gap: ${GRID.UNIT};

  ${BREAKPOINTS.L`
    grid-template-columns: [intro] 300px [main] 1fr [edge-right] ${GRID.UNIT};
  `}
`;

const TemplateIntro = styled.div`
  padding: ${GRID.DOUBLE} ${GRID.UNIT} ${GRID.UNIT} ${GRID.UNIT};
  text-align: center;
  grid-column: main;
  ${BREAKPOINTS.L`
    grid-column: intro;
  `};
`;

const IntroBits = styled.div`
  ${BREAKPOINTS.L`
    position: sticky;
    top: ${GRID.DOUBLE};
  `};
`;

const TemplateMain = styled.section`
  grid-column: main;
`;

const StyledTitle = styled(H1)`
  margin-top: -48px;
  margin-bottom: ${GRID.QUADRUPLE};
  text-shadow: 0 0 4px #000;
  ${BREAKPOINTS.L`
    font-size: 4rem;
  `};
`;

const Logo = styled.span`
  display: block;
  text-align: center;
  font-size: 6rem;
`;

const FooterPanel = styled.section`
  margin-top: ${GRID.UNIT};
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
  text-align: center;
`;
