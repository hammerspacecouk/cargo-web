import { createGlobalStyle } from "styled-components";
import { modalStyles } from "@src/components/Molecules/Modal";
import { base } from "./base";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    ${base}
    ${modalStyles}
`;
