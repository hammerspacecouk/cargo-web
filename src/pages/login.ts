import { Component, createElement } from "react";
import { ApiClient } from "../utils/ApiClient";
import { ILoginOptions } from "../interfaces";
import { LoginPage } from "../components/Pages/LoginPage";

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
