import * as React from "react";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { H3 } from "@src/components/Atoms/Heading";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { SocialAccounts } from "@src/components/Organisms/SocialAccounts";

export const Hint = ({ hint }: { hint: string }) => {
  const { authProviders } = useActiveShipContext();

  if (authProviders) {
    return <SocialAccounts isAnonymous={true} authProviders={authProviders} />;
  }

  return <StyledHint as="p">{hint}</StyledHint>;
};

const StyledHint = styled(H3)`
  padding: ${GRID.UNIT};
  font-style: italic;
  text-align: center;
  line-height: 1.5;
  opacity: 0.6;
`;
