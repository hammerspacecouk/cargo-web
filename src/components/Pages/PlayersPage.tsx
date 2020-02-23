import * as React from "react";
import { IPlayer } from "../../interfaces";
import { PlayerFlag } from "../Molecules/PlayerFlag";
import { Score } from "../Organisms/Score";
import { SimplePage } from "../Templates/SimplePage";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { H1 } from "../Atoms/Heading";
import Link from "next/link";
import { routes } from "../../routes";
import Head from "next/head";
import { pageTitle } from "../../utils/pageTitle";
import {DurationDetail} from "../Atoms/DurationDetail";

export interface IPlayersPageProps {
  players: IPlayer[];
  winners: {
    completionTime: number;
    player: IPlayer;
  }[]
}

export const PlayersPage = ({ players, winners }: IPlayersPageProps) => (
  <SimplePage>
    <Head>
      <title>{pageTitle(`Players`)}</title>
    </Head>
    <Panel>
      <H1>Winners Board</H1>
      <ol>
        {winners.map(winner => (
          <ListItem key={`winner-${winner.player.id}`}>
            <Link {...routes.getPlayer(winner.player.id)} prefetch={false}>
              <Player href={`/players/${winner.player.id}`}>
                <FlagSpace>
                  <PlayerFlag player={winner.player} />
                </FlagSpace>
                <Detail>
                  <p>{winner.player.displayName}</p>
                  <p>Time taken: <DurationDetail seconds={winner.completionTime} /></p>
                </Detail>
              </Player>
            </Link>
          </ListItem>
        ))}
      </ol>
    </Panel>
    <Panel>
      <H1>Top Players</H1>
      <ol>
        {players.map(player => (
          <ListItem key={`player-${player.id}`}>
            <Link {...routes.getPlayer(player.id)} prefetch={false}>
              <Player href={`/players/${player.id}`}>
                <FlagSpace>
                  <PlayerFlag player={player} />
                </FlagSpace>
                <Detail>
                  <p>{player.rank.title} {player.displayName}</p>
                  <Score score={player.score} />
                </Detail>
              </Player>
            </Link>
          </ListItem>
        ))}
      </ol>
    </Panel>
  </SimplePage>
);

const Panel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
`;

const ListItem = styled.li`
  margin-top: ${GRID.UNIT};
`;

const Player = styled.a`
  display: flex;
  align-items: center;
  color: ${COLOURS.BODY.TEXT};
  background: ${COLOURS.GREY.DARKEST};
  padding: ${GRID.HALF};
  &:hover {
    background: ${COLOURS.GREY.DARK};
  }
`;
const FlagSpace = styled.div`
  width: 64px;
  height: 64px;
  margin-right: ${GRID.UNIT};
  border-radius: 64px;
  border: solid 4px ${COLOURS.BODY.TEXT};
`;
const Detail = styled.div`
  flex: 1;
`;
