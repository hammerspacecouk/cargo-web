import styled, { keyframes } from "styled-components";
import { colours } from "../../../GlobalStyle";

const frames = keyframes`
    0% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0.2;
    }
`;

export default styled.div`
    display: block;
    background: ${colours.gray[7]};
    opacity: 0.2;
    animation: ${frames} 2s ease-in-out;
    border-radius: 2px;
`;
