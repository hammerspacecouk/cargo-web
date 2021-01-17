import * as React from "react";
import { Button } from "@src/components/Atoms/Button";
import { Loading } from "@src/components/Atoms/Loading";
import { TextCenter } from "@src/components/Atoms/Text";
import { Modal } from "@src/components/Molecules/Modal";
import { Promotion } from "./Promotion";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { CurrentMissions } from "@src/components/Molecules/CurrentMissions";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { H3 } from "@src/components/Atoms/Heading";
import { SliderGroup } from "@src/components/Molecules/SliderGroup";
import { Environment } from "@src/utils/environment";
import { clientPath } from "@src/utils/runtime";
import { TwitterLogo } from "@src/components/Atoms/Logos";
import { RedditButton, TwitterButton } from "@src/components/Molecules/SocialButton";

export const PromotionModal = () => {
  const { rankStatus, currentMissions } = useGameSessionContext();
  const [acknowledging, setAcknowledging] = React.useState(false);

  if (!rankStatus || !rankStatus.acknowledgeToken) {
    return null;
  }

  let button;
  if (acknowledging) {
    button = (
      <Button type="submit" disabled={true}>
        <Loading />
      </Button>
    );
  } else {
    button = (
      <Button type="submit" title="Accept and Continue">
        Continue
      </Button>
    );
  }

  return (
    <Modal isOpen={true} title="Promotion">
      <Promotion rankStatus={rankStatus} />
      <SocialButtons>
        <TwitterButton
          href={`https://twitter.com/intent/tweet?text=I was promoted to ${rankStatus.currentRank.title} while playing https://www.saxopholis.com`}
          text="Tweet"
          target="_blank"
          rel="noopener"
        />
        <RedditButton href="https://www.reddit.com/r/saxopholis/" text="Reddit" target="_blank" rel="noopener" />
      </SocialButtons>
      {currentMissions.length > 0 && (
        <NewMission>
          <Heading>New Mission</Heading>
          <CurrentMissions />
        </NewMission>
      )}

      <form
        action={`${Environment.clientApiHostname}/profile/acknowledge-promotion`}
        method="POST"
        onSubmit={() => setAcknowledging(true)}
      >
        <input type="hidden" name="token" value={rankStatus.acknowledgeToken} />
        <input type="hidden" name="returnPath" value={clientPath} />
        {rankStatus.market && rankStatus.availableCredits !== undefined && (
          <Sliders
            sliders={[
              {
                title: "History",
                current: rankStatus.market.history,
                name: "set_history",
              },
              {
                title: "Discovery",
                current: rankStatus.market.discovery,
                name: "set_discovery",
              },
              {
                title: "Economy",
                current: rankStatus.market.economy,
                name: "set_economy",
              },
              {
                title: "Military",
                current: rankStatus.market.military,
                name: "set_military",
              },
            ]}
            maxTotal={rankStatus.availableCredits}
          />
        )}
        <TextCenter as="div">{button}</TextCenter>
      </form>
    </Modal>
  );
};

const NewMission = styled.div`
  padding: ${GRID.UNIT};
  border-top: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
  border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
  margin-bottom: ${GRID.UNIT};
`;
const Heading = styled(H3)`
  text-align: center;
  margin-bottom: ${GRID.UNIT};
`;
const Sliders = styled(SliderGroup)`
  margin-bottom: ${GRID.DOUBLE};
`;
const SocialButtons = styled.div`
  display: block;
  text-align: center;
  margin-bottom: ${GRID.UNIT};
  > a {
    display: inline-flex;
    margin: 0 ${GRID.HALF};
  }
`;
