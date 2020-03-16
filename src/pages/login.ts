import { GetServerSideProps } from "next";
import { ApiClient } from "../utils/ApiClient";
import { LoginPage } from "../components/Pages/LoginPage";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const loginOptions = await ApiClient.fetch("/login", undefined, req);
  // todo - query parameters
  return {
    props: {
      loginOptions,
      query,
    },
  };
};

export default LoginPage;
