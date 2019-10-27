import { Component, createElement } from "react";
import { ApiClient } from "../utils/ApiClient";
import { ILoginOptions } from "../interfaces";
import { LoginPage } from "../components/Pages/LoginPage";
import {NextPageContext} from "next";

export default class extends Component<IProps, undefined> {
  public static async getInitialProps({req}: NextPageContext) {
    const loginOptions = await ApiClient.fetch('/login', undefined, req);
    // todo - query parameters
    return {
      loginOptions
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
