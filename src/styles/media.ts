import { css } from "styled-components";

type TaggedTemplateFunction = (literals: TemplateStringsArray, ...placeholders: string[]) => any;

interface ISizeFunctions {
  XS: TaggedTemplateFunction;
  S: TaggedTemplateFunction;
  M: TaggedTemplateFunction;
  L: TaggedTemplateFunction;
  XL: TaggedTemplateFunction;
  XXL: TaggedTemplateFunction;
  MAX: TaggedTemplateFunction;
}

const makeFunction = (size: number): TaggedTemplateFunction => {
  return (...args) => css`
    @media (min-width: ${size / 16}em) {
      ${css(...args)};
    }
  `;
};

// tslint:disable:object-literal-sort-keys
export const BREAKPOINTS: ISizeFunctions = {
  XS: makeFunction(480),
  S: makeFunction(600),
  M: makeFunction(768),
  L: makeFunction(912),
  XL: makeFunction(1008),
  XXL: makeFunction(1280),
  MAX: makeFunction(1600),
};
// tslint:enable:object-literal-sort-keys
