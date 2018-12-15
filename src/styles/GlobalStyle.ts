import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { base } from "./base";
import { modalStyles } from "../components/Panel/Modal";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    ${base}
    ${modalStyles}
`;
