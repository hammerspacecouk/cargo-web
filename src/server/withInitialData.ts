import { Request } from "express";
import { Component, ComponentClass, createElement } from "react";
import { match } from "react-router-dom";

export interface IInitialDataComponent extends ComponentClass {
  getInitialData?: (match: match, request?: Request) => any;
}

interface IState {
  data: any;
}

interface IProps {
  initialData?: any;
  match: match;
}

// This is a Higher Order Component that abstracts duplicated data fetching
// on the server and client.
export const withInitialData = (Page: IInitialDataComponent) => {
  return class WithInitialData extends Component<IProps, IState> {
    public static async getInitialData(routeMatch: match, request?: Request) {
      // Need to call the wrapped components getInitialData if it exists
      if (Page.getInitialData) {
        return Page.getInitialData(routeMatch, request);
      }
      return null;
    }
    public ignoreLastFetch = false;

    constructor(props: IProps) {
      super(props);
      this.state = {
        data: props.initialData,
      };
    }

    public componentDidMount() {
      if (!this.state.data) {
        this.fetchData();
      }
    }

    public componentWillUnmount() {
      this.ignoreLastFetch = true;
    }

    public fetchData = async () => {
      // if this.state.data is null, that means that the we are on the client.
      // To get the data we need, we just call getInitialData again on mount.
      if (!this.ignoreLastFetch) {
        const data = await WithInitialData.getInitialData(this.props.match);
        if (!this.ignoreLastFetch) {
          this.setState({ data });
        }
      }
    };

    public render() {
      // Flatten out all the props.
      const { initialData, ...rest } = this.props;

      //  todo - what about this
      //  if we wanted to create an app-wide error component,
      //  we could also do that here using <HTTPStatus />. However, it is
      //  more flexible to leave this up to the Routes themselves.
      //
      // if (rest.error && rest.error.code) {
      //   <HttpStatus statusCode={rest.error.code || 500}>
      //     {/* cool error screen based on status code */}
      //   </HttpStatus>
      // }

      return createElement(Page, {
        ...rest,
        ...this.state.data,
      });
    }
  };
};
