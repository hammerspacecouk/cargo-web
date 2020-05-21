import { GetServerSideProps } from "next";
import { ApiClient } from "@src/utils/ApiClient";
import { PlayersPage } from "@src/components/Pages/PlayersPage";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await ApiClient.fetch(`/players`, undefined, req);
  return {
    props: data,
  };
};

export default PlayersPage;
