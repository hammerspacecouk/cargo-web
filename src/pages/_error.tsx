import React from 'react';
import { NextPageContext } from "next";

class Error extends React.Component<IProps, undefined> {
  static getInitialProps({ res, err }: NextPageContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  // todo - design this
  render() {
    if (this.props.statusCode && this.props.statusCode === 404) {
      return (
        <h1>No such page</h1>
      );
    }

    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}

export default Error;

interface IProps {
  statusCode: number;
}
