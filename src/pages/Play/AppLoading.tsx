import * as React from "react";
import Loading from "../../components/Navigation/Loading";

export default function AppLoading() {
  return (
    <div>
      <div>
        <Loading />
      </div>
      <div className="text--center">
        To play will require JavaScript to be running successfully
      </div>
    </div>
  );
}
