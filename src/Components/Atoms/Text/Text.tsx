import styled from "styled-components";
import { ELEMENTS, SIZES } from "../../../styles/typography";
import { COLOURS } from "../../../styles/colours";

export const P = styled.p`
    ${ELEMENTS.P}
`;

export const TextA = styled.span`
    ${SIZES.A}
`;

export const TextB = styled.span`
    ${SIZES.B}
`;

export const TextC = styled.span`
    ${SIZES.C}
`;

export const TextD = styled.span`
    ${SIZES.D}
`;

export const TextE = styled.span`
    ${SIZES.E}
`;

export const TextF = styled.span`
    ${SIZES.F}
`;

export const TextDanger = styled.span`
    color: ${COLOURS.SEMANTIC.DANGER.KEY};
`;

export const TextWarning = styled.span`
    color: ${COLOURS.SEMANTIC.WARNING.KEY};
`;

export const TextOk = styled.span`
    color: ${COLOURS.SEMANTIC.OK.KEY};
`;

export const TextInfo = styled.span`
    color: ${COLOURS.SEMANTIC.INFO.KEY};
`;
