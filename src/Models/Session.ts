import PlayerInterface from "../interfaces/PlayerInterface";
import RankStatusInterface from "../interfaces/RankStatusInterface";

export interface SessionResponseInterface {
  readonly isLoggedIn: boolean;
  readonly hasProfileNotification: boolean;
  readonly player?: PlayerInterface;
  readonly rankStatus?: RankStatusInterface;
}
