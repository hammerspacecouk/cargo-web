import * as React from "react";
import { pageTitle } from "../../../utils/pageTitle";
import Head from "next-server/head";
import styled from "styled-components";
import { Intro } from "../../../animation/Intro";
import { useAnimationScene } from "../../../hooks/useAnimationScene";

export const IntroPage = () => {
  const canvasRef = useAnimationScene<HTMLDivElement>(Intro);
  return (
    <>
      <Head>
        <title>{pageTitle("It begins...")}</title>
      </Head>
      <Container ref={canvasRef} />
    </>
  );
};

const Container = styled.div`
  height: 100%;
`;
