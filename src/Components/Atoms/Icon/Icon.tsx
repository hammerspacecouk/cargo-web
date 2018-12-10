import styled from "styled-components";

export const LARGE_ICON = "64px";
export const SMALL_ICON = "24px";
export const TINY_ICON = "16px";
export const NORMAL_ICON = "32px";

interface PropsInterface {
  size?: string;
}

export default styled.div<PropsInterface>`
    display: inline-block;
    line-height: 0;
    height: ${({ size = NORMAL_ICON }) => size};
    width: ${({ size = NORMAL_ICON }) => size};
`;
