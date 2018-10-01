import * as React from "react";
import EnsureLoggedIn from "../../Containers/Login/EnsureLoggedIn";

class UpgradesContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <EnsureLoggedIn>
        <main className="t-play__content-contain">
          <h1>Upgrades</h1>
          <p>This page should show what you have as well as what you can buy</p>
        </main>
      </EnsureLoggedIn>
    );
  }
}

export default UpgradesContainer;
