import * as React from "react";
import { withRouter } from "react-router-dom";
import { Loading } from "../../components/Atoms/Loading/Loading";
import { NotFound } from "../../components/Organisms/Error/NotFound";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import { ApiClient } from "../../util/ApiClient";
import { Travelling } from "./Travelling";
import { WarningModal } from "../../components/Organisms/WarningModal/WarningModal";
import { Hidden } from "../../components/Atoms/Hidden/Hidden";
import { useMounted } from "../../hooks/useMounted";

export interface IShipParams {
  match: {
    params: {
      shipId: string;
    };
  };
}

export const ShipPage = withRouter(({ match }: IShipParams) => {
  const { port, channel, ship, updateFullResponse, setWarningModalText, warningModalText } = useCurrentShipContext();
  const isMounted = useMounted();

  const getData = async () => {
    const data = await ApiClient.fetch(`/play/${match.params.shipId}`);
    if (isMounted()) {
      updateFullResponse(data);
    }
  };

  React.useEffect(() => {
    getData();
  }, [match.params.shipId]);

  if (ship === undefined) {
    return <Loading />; // todo - error state, and ensure login?
  }
  if (!ship) {
    return <NotFound message="You be making ship up" />;
  }

  let main = null;
  if (port) {
  } else if (channel) {
    main = <Travelling />;
  }

  return (
    <section>
      <Hidden as="h1">{ship.name}</Hidden>
      {main}
      <WarningModal text={warningModalText} closeModal={() => setWarningModalText(undefined)} />
    </section>
  );
});
