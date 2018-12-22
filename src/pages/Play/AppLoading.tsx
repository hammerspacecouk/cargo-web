import * as React from "react";
import { Loading } from "../../components/Atoms/Loading/Loading";
import { TextCenter } from "../../components/Atoms/Text/Text";

export default function AppLoading() {
  return (
    <div>
      <div>
        <Loading />
      </div>
      <TextCenter>
        To play will require JavaScript to be running successfully
      </TextCenter>
    </div>
  );
}
