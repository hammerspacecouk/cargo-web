import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import API from "../Infrastructure/API";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";

export interface AcknowledgePromotionResponse {
  readonly rankStatus: RankStatusInterface;
}

export const acknowledgePromotion = (
  token: ActionTokenInterface
): Promise<AcknowledgePromotionResponse> => {
  return API.fetch(token.path, { token: token.token });
};
