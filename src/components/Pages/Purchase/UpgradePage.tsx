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

export const UpgradePage = () => {
  const { buttonsDisabled, disableButtons } = useButtonsDisabled();
  const [error, setError] = React.useState<string>();

  const handleCheckoutClick = async () => {
    disableButtons();
    const stripeSession = await ApiClient.fetch("/purchase/upgrade");
    if (stripeSession) {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout(stripeSession);
      if (error) {
        setError(error.message);
      }
    } else {
      setError("You cannot purchase this item more than once");
    }
  };

  return (
    <PurchaseLayout>
      <Prose>
        <H1>Upgrade Account</H1>
        {error && <MessageError>{error}</MessageError>}
        <p>You can play up to 25% of the game for free. To unlock the other 75% you must upgrade your account.</p>

        <p>Upgrade your account to be able to play the remaining 75% of the game beyond the trial period.</p>
        <p>
          This is a one-time cost for your account. You will not have to pay again if you choose to start your game
          over.
        </p>
        <hr />
        <TextCenter>
          <H2 as="span">£7.99</H2>
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
