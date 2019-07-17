import { Component, createElement } from "react";
import { ApiClient } from "../src/utils/ApiClient";
import { ILoginOptions } from "../src/interfaces";
import { LoginPage } from "../src/components/Pages/LoginPage";

export default class extends Component<IProps, undefined> {
  public static async getInitialProps({req}) {
    const loginOptions = await ApiClient.fetch('/login', undefined, req);
    // todo - query parameters
    return {
      loginOptions,
      query: null
    }
  }

  public render() {
    return createElement(LoginPage, this.props);
  }
}

interface IProps {
  loginOptions: ILoginOptions,
  query?: string
}
