import React from "react";
import { ApiClient } from "@src/utils/ApiClient";
import { GetServerSideProps, NextPage } from "next";
import { IPlayerPageProps, PlayerPage } from "@src/components/Pages/Players/PlayerPage";
import { pageTitle } from "@src/utils/pageTitle";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const data = await ApiClient.fetch(`/players/${query.player}`, undefined, req);
  return {
    props: data,
  };
};

const Page: NextPage<IPlayerPageProps> = (props) => (
  <>
    <Head>
      <title>{pageTitle(`${props.player.displayName}`)}</title>
    </Head>
    <PlayerPage {...props} />
  </>
);

export default Page;
