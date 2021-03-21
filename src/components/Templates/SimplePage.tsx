import * as React from "react";
import styled from "styled-components";
import { H1 } from "@src/components/Atoms/Heading";
import { IChildrenProps } from "@src/interfaces";
import { routes } from "@src/routes";
import { BREAKPOINTS } from "@src/styles/media";
import { GRID } from "@src/styles/variables";
import { Button } from "@src/components/Atoms/Button";
import { APP_TITLE } from "@src/utils/pageTitle";
import { ListInline } from "@src/components/Atoms/List/ListInline";
import { COLOURS } from "@src/styles/colours";
import { SiteLogo } from "@src/components/Atoms/Logos";
import { SIZES } from "@src/styles/typography";

export const SimplePage = ({ children, isHome, disablePlayButton }: IProps) => (
  <TemplateSimple>
    <WarningMessage>
      Under the <a href="/about/terms">terms</a>, this notices states that this game will
      be shutting down on 24th April 2021.
    </WarningMessage>
    <TemplateIntro>
      <IntroBits>
        <LogoLink href={routes.getHome()}>
          <Logo>
            <SiteLogo />
          </Logo>
          <StyledTitle as={isHome ? "h1" : "p"}>{APP_TITLE}</StyledTitle>
        </LogoLink>
        {!disablePlayButton && (
          <>
            <Button as="a" href={routes.getPlay()}>
              Go to game
            </Button>
          </>
        )}
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
            <a href="https://www.reddit.com/r/saxopholis/" target="_blank" rel="noopener">
              Reddit (r/saxopholis)
            </a>
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

interface IProps extends IChildrenProps {
  isHome?: boolean;
  disablePlayButton?: boolean;
}

const LogoLink = styled.a`
  color: inherit;
`;

const TemplateSimple = styled.div`
  position: relative;
  max-width: 80rem;
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

const IntroBits = styled.header`
  ${BREAKPOINTS.L`
    position: sticky;
    top: ${GRID.DOUBLE};
  `};
`;

const TemplateMain = styled.section`
  grid-column: main;
`;

const StyledTitle = styled(H1)`
  margin-top: -12px;
  margin-bottom: ${GRID.QUADRUPLE};
  text-shadow: 0 0 4px #000;
  ${BREAKPOINTS.L`
    font-size: 4rem;
  `};
`;

const Logo = styled.span`
  display: block;
  margin: 0 auto;
  width: 120px;
  color: #a5911c;
`;

const FooterPanel = styled.section`
  margin-top: ${GRID.UNIT};
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
  text-align: center;
`;

const WarningMessage = styled.div`
  display: block;
  grid-column: main;
  background: #a5911c;
  color: #000;
  ${SIZES.D};
  font-weight: bold;
  padding: ${GRID.UNIT};
  text-align: center;
  ${BREAKPOINTS.L`
    grid-column-start: intro;
    grid-column-end: edge-right;
  `}
  a {
    color: currentColor;
    text-decoration: underline;
  }
`;
