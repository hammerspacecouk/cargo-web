import * as React from "react";
import { IPlayer } from "@src/interfaces";
import { PlayerFlag } from "@src/components/Molecules/PlayerFlag";
import { Score } from "@src/components/Organisms/Score";
import { SimplePage } from "@src/components/Templates/SimplePage";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { H1 } from "@src/components/Atoms/Heading";
import Link from "next/link";
import { routes } from "@src/routes";
import Head from "next/head";
import { pageTitle } from "@src/utils/pageTitle";
import { DurationDetail } from "@src/components/Atoms/DurationDetail";

export interface IPlayersPageProps {
  players: IPlayer[];
  winners: {
    completionTime: number;
    player: IPlayer;
  }[];
}

export const Winner = ({ winner }: { winner: IPlayersPageProps["winners"][0] }) => (
  <Link {...routes.getPlayer(winner.player.id)} prefetch={false}>
    <Player href={`/players/${winner.player.id}`}>
      <FlagSpace>
        <PlayerFlag player={winner.player} />
      </FlagSpace>
      <Detail>
        <p>{winner.player.displayName}</p>
        <p>
          Time taken: <DurationDetail seconds={winner.completionTime} />
        </p>
      </Detail>
    </Player>
  </Link>
);

export const PlayerLink = ({ player }: { player: IPlayer }) => (
  <Link {...routes.getPlayer(player.id)} prefetch={false}>
    <Player href={`/players/${player.id}`}>
      <FlagSpace>
        <PlayerFlag player={player} />
      </FlagSpace>
      <Detail>
        <p>
          {player.rank.title} {player.displayName}
        </p>
        <Score score={player.score} />
      </Detail>
    </Player>
  </Link>
);

export const PlayersPage = ({ players, winners }: IPlayersPageProps) => (
  <SimplePage>
    <Head>
      <title>{pageTitle(`Players`)}</title>
    </Head>
    <Panel>
      <H1>Winners Board</H1>
      <p>These are the champions who have visited every planet and delivered a saxophone to Saxopholis</p>
      <ol>
        {winners.length ? (
          winners.map((winner) => (
            <ListItem key={`winner-${winner.player.id}`}>
              <Winner winner={winner} />
            </ListItem>
          ))
        ) : (
          <p>None yet</p>
        )}
      </ol>
    </Panel>
    <Panel>
      <H1>Top Players</H1>
      <ol>
        {players.map((player) => (
          <ListItem key={`player-${player.id}`}>
            <PlayerLink player={player} />
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
  text-align: left;
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
