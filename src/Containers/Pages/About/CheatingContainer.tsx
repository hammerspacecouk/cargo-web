import * as React from "react";
import CrumbTitle from "../../../Components/CrumbTitle";

class CheatingContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle
            crumbs={[{ link: "/about", title: "About Planet Cargo" }]}
          >
            Cheating
          </CrumbTitle>
        </div>
        <div className="t-doc__main text--prose">
          <p>Not cool dawg...</p>
        </div>
      </div>
    );
  }
}

export default CheatingContainer;
