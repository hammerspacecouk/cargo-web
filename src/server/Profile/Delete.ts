import { Component, createElement } from "react";
import { RouteProps, withRouter } from "react-router-dom";
import { DeletePage } from "../../pages/Profile/DeletePage";
import { withPlayer } from "../withPlayer";

class DeleteComponent extends Component<RouteProps, undefined> {
  public render() {
    return createElement(DeletePage, { query: this.props.location.search });
  }
}

export const Delete = withPlayer(withRouter(DeleteComponent as any));
