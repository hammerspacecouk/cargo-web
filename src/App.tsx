import * as React from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import {
  Modal,
  ModalActions,
  ModalType,
} from "./components/Molecules/Modal/Modal";
import { NotFound } from "./components/Organisms/Error/NotFound";
import { Masthead } from "./components/Organisms/Masthead/Masthead";
import { SessionContextComponent } from "./context/SessionContext";
import { GlobalStyle } from "./styles/GlobalStyle";

interface IProps {
  routes: RouteProps[];
  initialData?: any;
}

interface IState {
  errorMessage: string | undefined;
}

// componentDidCatch not yet available via hooks
export class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  public catchMessage = (error: PromiseRejectionEvent) => {
    this.setState({
      errorMessage: error.reason.message,
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
    const { routes, initialData } = this.props;

    let errorModal = null;
    if (this.state.errorMessage) {
      errorModal = (
        <Modal isOpen={true} title="An error occurred" type={ModalType.DANGER}>
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
                    initialData,
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
