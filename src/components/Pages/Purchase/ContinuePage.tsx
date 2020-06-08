import * as React from "react";
import { Prose } from "@src/components/Atoms/Prose";
import { PurchaseLayout } from "@src/components/Templates/PurchaseLayout";
import { H1, H2 } from "@src/components/Atoms/Heading";
import { TextCenter } from "@src/components/Atoms/Text";
import { ActionButton } from "@src/components/Atoms/Button";
import { loadStripe } from "@stripe/stripe-js";
import { Environment } from "@src/utils/environment";
import { ApiClient } from "@src/utils/ApiClient";
import { useButtonsDisabled } from "@src/hooks/useButtonsDisabled";
import { MessageError } from "@src/components/Molecules/Message";

const stripePromise = loadStripe(Environment.stripePublicKey);

export const ContinuePage = () => {
  const { buttonsDisabled, disableButtons } = useButtonsDisabled();
  const [error, setError] = React.useState<string>();

  const handleCheckoutClick = async () => {
    disableButtons();
    const stripeSession = await ApiClient.fetch("/purchase/continue");
    if (stripeSession) {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout(stripeSession);
      if (error) {
        setError(error.message);
      }
    } else {
      setError("You cannot purchase this item");
    }
  };

  return (
    <PurchaseLayout>
      <Prose>
        <H1>Continue Game</H1>
        {error && <MessageError>{error}</MessageError>}
        <p>
          A Reticulum Shuttle is required to complete the game. If yours has been destroyed, you can purchase a new one
          to continue without losing progress.
        </p>
        <p>
          You can also <a href="/reset">Start over</a> for free
        </p>
        <hr />
        <TextCenter>
          <H2 as="span">£2.99</H2>
        </TextCenter>
        <TextCenter>
          <ActionButton disabled={buttonsDisabled} onClick={handleCheckoutClick}>
            Checkout
          </ActionButton>
        </TextCenter>
        <TextCenter>Accepts Apple Pay, Google Pay & most major cards</TextCenter>
      </Prose>
    </PurchaseLayout>
  );
};
