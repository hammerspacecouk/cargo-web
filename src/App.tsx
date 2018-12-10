import * as React from "react";
import { Route, RouteProps, Switch } from "react-router-dom";

import SessionContextComponent from "./context/SessionContext";
import {Masthead} from "./components/Organisms/Masthead/Masthead";
import {NotFound} from "./components/Organisms/Error/NotFound";
import { ErrorInfo } from "react";
import Modal, { ModalActions } from "./components/Panel/Modal";
import { GlobalStyle } from "./styles/GlobalStyle";

interface Props {
  routes: RouteProps[];
  initialData?: any;
}

interface State {
  errorMessage: string | undefined;
}

// componentDidCatch not yet available via hooks
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  catchMessage = (error: PromiseRejectionEvent) => {
    this.setState({
      errorMessage: error.reason.message
    });
    console.error(error);
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      errorMessage: error.toString()
    });
    console.error(info);
  }

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.catchMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchMessage);
  }

  render() {
    const { routes, initialData } = this.props;

    let errorModal = null;
    if (this.state.errorMessage) {
      errorModal = (
        <Modal isOpen={true} title="An error occurred">
          <p>
            There was an error loading data. Please reload the page to try again
          </p>
          <p>Detail: {this.state.errorMessage}</p>
          <ModalActions>
            <a href={window.location.pathname}>Reload</a>
          </ModalActions>
        </Modal>
      );
    }

    return (
      <SessionContextComponent>
        <GlobalStyle />
        <Masthead />
        <main>
          <Switch>
            {routes.map(route => (
              <Route
                key={`${route.path}`}
                path={route.path}
                exact={route.exact}
                render={props =>
                  React.createElement(route.component, {
                    ...props,
                    initialData
                  })
                }
              />
            ))}
            <Route component={NotFound} />
          </Switch>
        </main>
        {errorModal}
      </SessionContextComponent>
    );
  }
}
