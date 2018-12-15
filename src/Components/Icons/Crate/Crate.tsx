import * as React from "react";

interface PropsInterface {
  colour?: string;
}

export const Crate = ({colour = '#ffffff'}: PropsInterface) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970.2 647.23">
      <path fill={colour}
            d="M966.54 560.33l-313.25 86.24c-4.16 1.14-7.59-3.3-7.59-9.87v-625c0-6.58 3.43-10.78 7.59-9.35l313.25 107.71c2 .7 3.66 5 3.66 9.52v431.48c0 4.54-1.64 8.71-3.66 9.27zM607.68.28l-1.36.28C599.36 2 593.7 8.45 593.7 15v3.3l-546.78 91-38.92-9c-4.4-1-8 2-8 6.69v447.56A7.89 7.89 0 0 0 .75 558c.94 2.62 2.68 4.55 4.67 4.83l604.14 84.33c6 .83 10.94-3.88 10.94-10.48V9.66c0-6.6-5.79-10.81-12.82-9.38z"/>
    </svg>
  );
};
