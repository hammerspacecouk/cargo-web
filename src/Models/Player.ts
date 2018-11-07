import ActionTokenInterface from "../interfaces/ActionTokenInterface";
import RankStatusInterface from "../interfaces/RankStatusInterface";

export interface AcknowledgePromotionResponse {
  readonly rankStatus: RankStatusInterface;
}

export const acknowledgePromotion = (
  token: ActionTokenInterface
): Promise<AcknowledgePromotionResponse> => {
  return API.fetch(token.path, { token: token.token });
};
