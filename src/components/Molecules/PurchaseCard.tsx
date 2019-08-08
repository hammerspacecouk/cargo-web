import styled from "styled-components";
import * as React from "react";
import { NumberBadge } from "../Atoms/NumberBadge";
import { GRID } from "../../styles/variables";
import { H4 } from "../Atoms/Heading";
import { IChildrenProps } from "../../interfaces";
import { BREAKPOINTS } from "../../styles/media";

interface IPurchaseCardImageProps extends IChildrenProps {
  className?: string;
  notificationCount?: number;
}

const StyledPurchaseCardImage = styled.div`
  position: relative;
  width: 112px;
  margin: 0 auto ${GRID.UNIT} auto;
  ${BREAKPOINTS.M`
    margin: 0 ${GRID.UNIT} 0 0;
  `};
`;
const BadgePosition = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

// Exports

export const PurchaseCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: column-reverse;
  ${BREAKPOINTS.M`
    flex-direction: row-reverse;
  `};
`;

export const PurchaseCardTitle = ({ children }: IChildrenProps) => <H4 as="h3">{children}</H4>;

export const PurchaseCardDetail = styled.div`
  flex: 1;
`;

export const LockedPurchaseCardDetail = styled(PurchaseCardDetail)`
  display: flex;
  justify-content: center;
  align-self: center;
`;

export const PurchaseCardDescription = styled.div`
  opacity: 0.6;
  margin: ${GRID.HALF} 0 ${GRID.UNIT};
`;

export const PurchaseCardImage = React.memo(({ className, children, notificationCount }: IPurchaseCardImageProps) => {
  let countElement = null;
  if (notificationCount) {
    countElement = (
      <BadgePosition>
        <NumberBadge value={notificationCount} />
      </BadgePosition>
    );
  }

  return (
    <StyledPurchaseCardImage className={className}>
      {children}
      {countElement}
    </StyledPurchaseCardImage>
  );
});
