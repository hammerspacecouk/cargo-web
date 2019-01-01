import { Component, ComponentClass, createElement } from "react";
import { match } from "react-router";
import { Request } from "express";

export interface InitialDataComponent extends ComponentClass {
  getInitialData?: (match: match, request?: Request) => any;
}

interface State {
  data: any;
}

interface Props {
  initialData?: any;
  match: match;
}

// This is a Higher Order Component that abstracts duplicated data fetching
// on the server and client.
export const withInitialData = (Page: InitialDataComponent) => {
  return class WithInitialData extends Component<Props, State> {
    ignoreLastFetch = false;

    static async getInitialData(match: match, request?: Request) {
      // Need to call the wrapped components getInitialData if it exists
      if (Page.getInitialData) {
        return Page.getInitialData(match, request);
      }
      return null;
    }

    constructor(props: Props) {
      super(props);
      this.state = {
        data: props.initialData
      };
    }

    componentDidMount() {
      if (!this.state.data) {
        this.fetchData();
      }
    }

    componentWillUnmount() {
      this.ignoreLastFetch = true;
    }

    fetchData = async () => {
      // if this.state.data is null, that means that the we are on the client.
      // To get the data we need, we just call getInitialData again on mount.
      if (!this.ignoreLastFetch) {
        const data = await WithInitialData.getInitialData(this.props.match);
        if (!this.ignoreLastFetch) {
          this.setState({ data });
        }
      }
    };

    render() {
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
        ...this.state.data
      });
    }
  };
};
