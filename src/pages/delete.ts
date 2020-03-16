import { DeletePage } from "../components/Pages/DeletePage";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const stage = parseInt((query.stage as string) || "1", 10);
  const token = query.token;

  if (stage < 1 || stage > 3) {
    res.writeHead(400);
    res.end("Invalid stage provided");
    return {};
  }

  return {
    props: {
      stage,
      token,
    },
  };
};

export default DeletePage;
