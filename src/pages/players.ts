import { GetServerSideProps } from "next";
import { ApiClient } from "../utils/ApiClient";
import { PlayersPage } from "../components/Pages/PlayersPage";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await ApiClient.fetch(`/players`, undefined, req);
  return {
    props: data,
  };
};

export default PlayersPage;
