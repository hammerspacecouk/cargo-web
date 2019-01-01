import * as React from "react";
import styled from "styled-components";
import { Icon, SMALL_ICON } from "../../Atoms/Icon/Icon";
import {
  FacebookLogo,
  GoogleLogo,
  MicrosoftLogo,
  TwitterLogo
} from "../../Atoms/Logos/Logos";
import { SIZES } from "../../../styles/typography";
import { GRID } from "../../../styles/variables";
import { hexToRGBa } from "../../../styles/colours";

interface PropsInterface {
  href: string;
}

interface ButtonPropsInterface {
  href: string;
  icon: JSX.Element;
  text: string;
  colour: ColourInterface;
}

interface ColourInterface {
  bg: string;
  fg: string;
}

const StyledLink = styled.a<{ colour: ColourInterface }>`
  display: flex;
  align-items: center;
  padding: 12px ${GRID.UNIT};
  ${SIZES.E};
  background: ${({ colour }) => hexToRGBa(colour.bg, 0.9)};
  border: solid 2px ${({ colour }) => colour.bg};
  color: ${({ colour }) => colour.fg};
  box-shadow: 0 0 16px ${({ colour }) => colour.bg},
    0 0 16px inset ${({ colour }) => colour.bg};
  border-radius: 4px;
  transition: all 0.15s linear;
  text-decoration: none;

  &[disabled] {
    opacity: 0.4;
  }
  &:not([disabled]) {
    &:hover,
    &:focus {
      background: ${({ colour }) => hexToRGBa(colour.bg, 1)};
      box-shadow: 0 0 32px ${({ colour }) => colour.bg},
        0 0 16px inset ${({ colour }) => colour.bg};
      text-decoration: none;
    }
    &:active {
      background: ${({ colour }) => hexToRGBa(colour.bg, 1)};
      box-shadow: 0 0 16px ${({ colour }) => colour.bg},
        0 0 16px inset ${({ colour }) => colour.bg};
      transform: scale(0.98);
      text-decoration: none;
    }
  }
`;

const StyledText = styled.span`
  flex: 1;
  margin-left: ${GRID.UNIT};
`;

const SocialButton = ({ href, icon, text, colour }: ButtonPropsInterface) => (
  <StyledLink colour={colour} href={href}>
    <Icon size={SMALL_ICON}>{icon}</Icon>
    <StyledText>{text}</StyledText>
  </StyledLink>
);

export const FacebookButton = ({ href }: PropsInterface) => (
  <SocialButton
    href={href}
    icon={<FacebookLogo />}
    text="Facebook"
    colour={{
      bg: "#3b5998",
      fg: "#ffffff"
    }}
  />
);

export const GoogleButton = ({ href }: PropsInterface) => (
  <SocialButton
    href={href}
    icon={<GoogleLogo />}
    text="Google"
    colour={{
      bg: "#ffffff",
      fg: "#121212"
    }}
  />
);

export const MicrosoftButton = ({ href }: PropsInterface) => (
  <SocialButton
    href={href}
    icon={<MicrosoftLogo />}
    text="Microsoft"
    colour={{
      bg: "#4f4f4f",
      fg: "#ffffff"
    }}
  />
);

export const TwitterButton = ({ href }: PropsInterface) => (
  <SocialButton
    href={href}
    icon={<TwitterLogo />}
    text="Twitter"
    colour={{
      bg: "#1da1f2",
      fg: "#ffffff"
    }}
  />
);
