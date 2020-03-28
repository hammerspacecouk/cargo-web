import styled from "styled-components";

export const LARGE_ICON = "64px";
export const SMALL_ICON = "24px";
export const TINY_ICON = "16px";
export const NORMAL_ICON = "32px";
export const TEXT_ICON = "1em";

interface IProps {
  size?: string;
}

export const Icon = styled.span<IProps>`
  display: inline-block;
  line-height: 0;
  height: ${({ size = NORMAL_ICON }) => size};
  width: ${({ size = NORMAL_ICON }) => size};
`;

export const InlineIcon = styled(Icon)`
  vertical-align: text-top;
`;
