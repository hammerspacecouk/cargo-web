import * as React from "react";
import { withRouter } from "react-router-dom";
import { H1 } from "../../components/Atoms/Heading/Heading";
import { Loading } from "../../components/Atoms/Loading/Loading";
import { NotFound } from "../../components/Organisms/Error/NotFound";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import { ApiClient } from "../../util/ApiClient";
import { Port } from "./Port";
import { Travelling } from "./Travelling";
import { WarningModal } from "../../components/Organisms/WarningModal/WarningModal";

export interface IShipParams {
  match: {
    params: {
      shipId: string;
    };
  };
}

export const ShipPage = withRouter(({ match }: IShipParams) => {
  const {
    port,
    channel,
    ship,
    updateFullResponse,
    setWarningModalText,
    warningModalText,
  } = useCurrentShipContext();
  const mounted = React.useRef(false);

  const getData = async () => {
    const data = await ApiClient.fetch(`/play/${match.params.shipId}`);
    if (mounted.current) {
      updateFullResponse(data);
    }
  };

  React.useEffect(() => {
    mounted.current = true;
    getData();
    return () => {
      mounted.current = false;
    };
  }, [match.params.shipId]);

  if (ship === undefined) {
    return <Loading />; // todo - error state, and ensure login?
  }
  if (!ship) {
    return <NotFound message="You be making ship up" />;
  }

  let main = null;
  if (port) {
    main = <Port />;
  } else if (channel) {
    main = <Travelling />;
  }

  return (
    <section>
      <H1 style={{ display: "none" }}>{ship.name}</H1>
      {main}
      <WarningModal
        text={warningModalText}
        closeModal={() => setWarningModalText(undefined)}
      />
    </section>
  );
});
