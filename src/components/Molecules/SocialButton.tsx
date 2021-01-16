import * as React from "react";
import styled from "styled-components";
import { hexToRGBa } from "@src/styles/colours";
import { MONOSPACE_FONT, SIZES } from "@src/styles/typography";
import { GRID } from "@src/styles/variables";
import { Icon, SMALL_ICON } from "@src/components/Atoms/Icon";
import { FacebookLogo, GoogleLogo, MicrosoftLogo, RedditLogo, TwitterLogo } from "@src/components/Atoms/Logos";
import { IChildrenProps } from "@src/interfaces";
import { AnonIcon } from "@src/components/Icons/AnonIcon";

interface IProps extends Omit<React.HTMLProps<HTMLAnchorElement>, "ref" | "as"> {
  text?: string;
}

interface IButtonProps extends Omit<React.HTMLProps<HTMLAnchorElement>, "ref" | "as"> {
  icon: JSX.Element;
  text: string;
  colour: IColour;
}

interface IColour {
  bg: string;
  fg: string;
}

const StyledLink = styled.a<{ colour: IColour }>`
  display: flex;
  align-items: center;
  padding: 12px ${GRID.UNIT};
  ${SIZES.E};
  ${MONOSPACE_FONT};
  background: ${({ colour }) => hexToRGBa(colour.bg, 0.9)};
  border: solid 2px ${({ colour }) => colour.bg};
  color: ${({ colour }) => colour.fg};
  box-shadow: 0 0 16px ${({ colour }) => colour.bg}, 0 0 16px inset ${({ colour }) => colour.bg};
  border-radius: 4px;
  transition: all 0.15s linear;
  text-decoration: none;
  text-transform: uppercase;

  &[disabled] {
    opacity: 0.4;
  }
  &:not([disabled]) {
    &:hover,
    &:focus {
      background: ${({ colour }) => hexToRGBa(colour.bg, 1)};
      box-shadow: 0 0 32px ${({ colour }) => colour.bg}, 0 0 16px inset ${({ colour }) => colour.bg};
      text-decoration: none;
      color: currentColor;
    }
    &:active {
      background: ${({ colour }) => hexToRGBa(colour.bg, 1)};
      box-shadow: 0 0 16px ${({ colour }) => colour.bg}, 0 0 16px inset ${({ colour }) => colour.bg};
      transform: scale(0.98);
      text-decoration: none;
      color: currentColor;
    }
  }
`;

const StyledText = styled.span`
  flex: 1;
  margin-left: ${GRID.UNIT};
  text-align: left;
`;

const SocialButton = React.memo(({ icon, text, colour, ...rest }: IButtonProps) => (
  <StyledLink colour={colour} {...rest}>
    <Icon size={SMALL_ICON}>{icon}</Icon>
    <StyledText>{text}</StyledText>
  </StyledLink>
));

export const AnonymousButton = ({ children }: IChildrenProps) => (
  <StyledLink colour={{ bg: "#4B9876", fg: "#ffffff" }} as="button">
    <Icon size={SMALL_ICON}>{<AnonIcon />}</Icon>
    <StyledText>{children}</StyledText>
  </StyledLink>
);

export const FacebookButton = ({ href }: IProps) => (
  <SocialButton
    href={href}
    icon={<FacebookLogo />}
    text="Facebook"
    colour={{
      bg: "#3b5998",
      fg: "#ffffff",
    }}
  />
);

export const GoogleButton = ({ href }: IProps) => (
  <SocialButton
    href={href}
    icon={<GoogleLogo />}
    text="Google"
    colour={{
      bg: "#ffffff",
      fg: "#121212",
    }}
  />
);

export const MicrosoftButton = ({ href }: IProps) => (
  <SocialButton
    href={href}
    icon={<MicrosoftLogo />}
    text="Microsoft"
    colour={{
      bg: "#4f4f4f",
      fg: "#ffffff",
    }}
  />
);

export const TwitterButton = ({ text, ...rest }: IProps) => (
  <SocialButton
    icon={<TwitterLogo />}
    text={text || "Twitter"}
    colour={{
      bg: "#1da1f2",
      fg: "#ffffff",
    }}
    {...rest}
  />
);

export const RedditButton = ({ href }: IProps) => (
  <SocialButton
    href={href}
    icon={<RedditLogo />}
    text="Reddit"
    colour={{
      bg: "#ff4500",
      fg: "#ffffff",
    }}
  />
);
