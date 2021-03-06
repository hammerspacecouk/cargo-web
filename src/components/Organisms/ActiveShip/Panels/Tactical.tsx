import * as React from "react";
import styled, { css } from "styled-components";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { TacticalEffect } from "@src/components/Molecules/TacticalEffect";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { IEffectPurchase } from "@src/interfaces";
import { EffectPurchase } from "@src/components/Molecules/EffectPurchase";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import { BREAKPOINTS } from "@src/styles/media";
import { JoinConvoyPane } from "@src/components/Molecules/JoinConvoyPane";
import { LeaveConvoyPane } from "@src/components/Molecules/LeaveConvoyPane";
import { useTutorial } from "@src/hooks/useTutorial";
import { TacticalTutorial } from "@src/components/Organisms/Tutorial/TacticalTutorial";

enum VIEWS {
  SHOP,
  INVENTORY,
}

export const Tactical = () => {
  const { effectsToPurchase, tacticalOptions, leaveConvoy, convoys, port } = useActiveShipContext();
  const { showReadyForConvoy } = useTutorial();
  const [visibleList, setVisibleList] = React.useState(VIEWS.INVENTORY);
  if (!tacticalOptions) {
    return null;
  }

  const hasTacticalList = tacticalOptions?.length || convoys?.length || leaveConvoy;

  return (
    <>
      {showReadyForConvoy && <TacticalTutorial />}
      <Intro>
        <li>
          <IntroButton disabled={visibleList === VIEWS.INVENTORY} onClick={() => setVisibleList(VIEWS.INVENTORY)}>
            Your
            <br />
            Inventory
          </IntroButton>
        </li>
        <li>
          <IntroButton disabled={visibleList === VIEWS.SHOP} onClick={() => setVisibleList(VIEWS.SHOP)}>
            {port.name}
            <br />
            Trading Post
          </IntroButton>
        </li>
      </Intro>

      {visibleList === VIEWS.SHOP && (
        <GridWrapper as="ul">
          {effectsToPurchase.map((option, i) => (
            <Option key={option.available ? (option as IEffectPurchase).detail.id : i}>
              <EffectPurchase option={option} />
            </Option>
          ))}
        </GridWrapper>
      )}
      {visibleList === VIEWS.INVENTORY &&
        (hasTacticalList ? (
          <GridWrapper as="ul">
            {leaveConvoy && (
              <Option key="leave-convoy">
                <LeaveConvoyPane />
              </Option>
            )}
            {convoys && (
              <Option key="join-convoy">
                <JoinConvoyPane />
              </Option>
            )}
            {tacticalOptions.map((option, i) => (
              <Option key={option.effect ? option.effect.id : i}>
                <TacticalEffect option={option} />
              </Option>
            ))}
          </GridWrapper>
        ) : (
          <p>You have no items</p>
        ))}
    </>
  );
};

const Intro = styled.ul`
  display: flex;
  align-items: stretch;
  margin-bottom: ${GRID.UNIT};
  > li {
    width: 50%;
    display: flex;
  }
  padding: ${GRID.HALF};
  border: solid 1px ${COLOURS.KEY_LINE};
  border-radius: 8px;
`;
const IntroButton = styled.button<{ disabled?: boolean }>`
  display: block;
  text-align: center;
  width: 100%;
  background: none;
  padding: ${GRID.HALF};
  border: none;
  border-radius: 4px;
  font-weight: bold;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${COLOURS.GREY.LIGHTER};
      color: ${COLOURS.BLACK.STANDARD};
    `}
`;

const Option = styled.li`
  width: 100%;
  ${BREAKPOINTS.XS`width: 50%;`}
`;
