import styled from "styled-components";

export const LARGE = 'large';
export const SMALL = 'small';
export const NORMAL = 'normal';


const getSize = (size: string) => {
  switch (size) {
    case LARGE:
      return '64px';
    case SMALL:
      return '16px';
    case NORMAL:
    default:
      return '32px';
  }
};

export default styled.div<{size?: string}>`
    display: inline-block;
    line-height: 0;
    height: ${({size}) => getSize(size)};
    width: ${({size}) => getSize(size)};
`;
