import * as React from "react";
import { Route, RouteProps, Switch } from "react-router-dom";

import SessionContextComponent from "./context/SessionContext";
import Masthead from "./components/Navigation/Masthead";
import NotFound from "./components/Error/NotFound";
import { ErrorInfo } from "react";
import Modal from "./components/Panel/Modal";

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
    console.log("I caught something via listener");
    this.setState({
      errorMessage: error.reason.message
    });
    console.error(error);
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("I caught something");
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
          <div className="modal__action">
            <a href={window.location.pathname}>Reload</a>
          </div>
        </Modal>
      );
    }

    return (
      <SessionContextComponent>
        <Masthead />
        <main>
          <div className="main">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
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
          </div>
        </main>
        {errorModal}
      </SessionContextComponent>
    );
  }
}
