import * as React from "react";
import { SimplePage } from "./SimplePage";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { IChildrenProps } from "@src/interfaces";
import { TextCenter } from "@src/components/Atoms/Text";
import { Prose } from "@src/components/Atoms/Prose";

export const PurchaseLayout = (props: IChildrenProps) => {
  return (
    <SimplePage>
      <Panel>
        {props.children}
        <Prose>
          <hr />
          <TextCenter>
            <small>
              Secure payments are handled by{" "}
              <a href="https://stripe.com/" target="_blank" rel="noopener">
                Stripe
              </a>
              . Some personal information will be required by Stripe to facilitate payment. Please refer to Stripe's{" "}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener">
                Privacy Policy
              </a>
              .
            </small>
          </TextCenter>
          <TextCenter>
            <small>
              This will be a transaction with <a href="https://www.hammerspace.co.uk/">HAMMERSPACE LTD</a>, creators of
              Saxopholis
            </small>
          </TextCenter>
        </Prose>
      </Panel>
    </SimplePage>
  );
};

const Panel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
`;
