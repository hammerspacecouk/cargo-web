import styled, { css } from "styled-components";

export const hiddenCss = css`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

export const Hidden = styled.span`
  ${hiddenCss};
`;
