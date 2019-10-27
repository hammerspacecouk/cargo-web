import React from "react";
import Head from "next/head";
import App from "next/app";
import { Modal, ModalType } from "../components/Molecules/Modal";
import { P } from "../components/Atoms/Text";
import { GlobalStyle } from "../styles/GlobalStyle";
import { pageTitle } from "../utils/pageTitle";
import { ButtonRow } from "../components/Molecules/ButtonRow";

interface IState {
  errorMessage: string | undefined;
}

interface IProps {}

export default class extends App<IProps, IState> {
  state: IState = { errorMessage: undefined };

  public catchMessage = (error: PromiseRejectionEvent) => {
    this.setState({
      errorMessage: error.reason.message.toString(),
    });
    console.error(error);
  };

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      errorMessage: error.toString(),
    });
    console.error(info);
  }

  public componentDidMount() {
    window.addEventListener("unhandledrejection", this.catchMessage);
  }

  public componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchMessage);
  }

  public render() {
    const { Component, pageProps } = this.props;

    let errorModal = null;
    if (this.state.errorMessage) {
      errorModal = (
        <Modal isOpen={true} title="An error occurred" type={ModalType.DANGER}>
          <P>There was an error loading data. Please reload the page to try again</P>
          <P>Detail: {this.state.errorMessage}</P>
          <ButtonRow>
            <a href={window.location.pathname}>Reload</a>
          </ButtonRow>
        </Modal>
      );
    }

    return (
      <>
        <GlobalStyle />
        <Head>
          <title>{pageTitle()}</title>
        </Head>
        <Component {...pageProps} />
        {errorModal}
      </>
    );
  }
}
