import styled from "styled-components";

export const HaloLink = styled.a`
    border: none;
    background: none;
    color: inherit;
    &:hover, &:active, &:focus {
      background: rgba(255, 255, 255, 0.2);
      text-decoration: none;
    }
`;
