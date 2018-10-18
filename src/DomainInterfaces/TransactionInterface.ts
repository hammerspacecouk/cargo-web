import ActionTokenInterface from "./ActionTokenInterface";

export default interface TransactionInterface {
  actionToken: ActionTokenInterface;
  cost: number;
  currentCount: number;
};
