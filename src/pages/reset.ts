import { GetServerSideProps } from "next";
import { ResetPage } from "@src/components/Pages/ResetPage";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      token: query.token || null,
      ineligible: !!query.ineligible,
    },
  };
};

export default ResetPage;
