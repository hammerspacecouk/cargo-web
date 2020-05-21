import { ApiClient } from "@src/utils/ApiClient";
import { HomePage } from "@src/components/Pages/HomePage";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await ApiClient.fetch("/", undefined, req);
  return {
    props: {
      events: data.events,
      goalCrateLocation: data.goalCrateLocation,
    },
  };
};

export default HomePage;
