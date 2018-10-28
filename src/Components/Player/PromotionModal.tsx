import Loading from "../Navigation/Loading";
import Modal from "../Panel/Modal";
import PromotionContainer from "../../Containers/Player/PromotionContainer";
import TokenButton from "../../Containers/Button/TokenButton";
import * as React from "react";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { acknowledgePromotion } from "../../Models/Player";

export default () => {
  acknowledgePromotion = async (token: ActionTokenInterface) => {
    this.setState({
      acknowledgingPromotion: true
    });

    //make the API call
    try {
      const data = await acknowledgePromotion(token);
      this.setState({
        acknowledgingPromotion: false
      });
      // Updating rankStatus should remove the token and thus close the modal
      this.updateRankStatus(data.rankStatus);
    } catch (e) {
      this.setState({
        acknowledgingPromotion: true
      });
    }
  };

    if (!this.state.rankStatus || !this.state.rankStatus.acknowledgeToken) {
      return null;
    }
    let button;
    if (this.state.acknowledgingPromotion) {
      button = (
        <button className="button" type="submit" disabled>
          <Loading />
        </button>
      );
    } else {
      button = (
        <button className="button" type="submit">
          Ok
        </button>
      );
    }

    return (
      <Modal isOpen={true} title="Promotion">
        <PromotionContainer rankStatus={this.state.rankStatus} />
        <div className="text--center">
          <TokenButton
            token={this.state.rankStatus.acknowledgeToken}
            handler={this.acknowledgePromotion}
          >
            {button}
          </TokenButton>
        </div>
      </Modal>
    );
}
