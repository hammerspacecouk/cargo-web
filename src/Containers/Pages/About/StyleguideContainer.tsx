import * as React from "react";
import CrumbTitle from "../../../Components/CrumbTitle";
import {
  MessageError,
  MessageInfo,
  MessageOk,
  MessageWarning
} from "../../../Components/Messages";

const colourTable = (colourNames: string[]) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      {colourNames.map(color => (
        <tr key={color}>
          <th>
            <code>$color-{color}</code>
          </th>
          <td className={`color-${color}`} />
        </tr>
      ))}
    </tbody>
  </table>
);

class StyleguideContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle
            crumbs={[{ link: "/about", title: "About Planet Cargo" }]}
          >
            Styleguide
          </CrumbTitle>
        </div>
        <div className="t-doc__main">
          <div className="text--prose">
            <p>
              This is a collection of elements to demonstrate the overall design
              of the application.
            </p>

            <h2>Colours</h2>
            <p>
              These are all the colours available to the application, in a few
              different group types
            </p>

            <h3>Greys</h3>
            {colourTable([
              "black",
              "grey-darkest",
              "grey-dark",
              "grey-mid",
              "grey-light",
              "grey-lightest",
              "white"
            ])}

            <h3>Brand Colours</h3>
            {colourTable([
              "main-black-dark",
              "main-black",
              "main-black-light",
              "off-black-dark",
              "off-black",
              "off-black-light",
              "primary-dark",
              "primary",
              "primary-light",
              "secondary-dark",
              "secondary",
              "secondary-light",
              "tertiary-dark",
              "tertiary",
              "tertiary-light"
            ])}

            <h3>Meaningful Colours</h3>
            <p>These are colours that imply a meaning</p>
            {colourTable(["info", "ok", "danger", "warning"])}

            <h2>Core</h2>
            <h2>Atoms</h2>

            <h3>Buttons</h3>

            <p>
              <button className="btn">Standard button</button>
            </p>
            <p>
              <button className="btn btn--confirm">Confirm</button>
            </p>
            <p>
              <button className="btn btn--danger">Reject</button>
            </p>
            <p>
              <button className="btn btn--soft-danger">Soft Reject</button>
            </p>

            <h2>Molecules</h2>

            <h3>Messages</h3>

            <MessageInfo>
              Default message (<code>info</code>)
            </MessageInfo>
            <MessageOk>
              Success message (<code>ok</code>)
            </MessageOk>
            <MessageWarning>
              Warning message (<code>warning</code>)
            </MessageWarning>
            <MessageError>
              Error message (<code>error</code>). <br />
              This one has a lot of text to demo some lines. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed feugiat ligula id enim
              feugiat posuere. Vestibulum feugiat dui eget lorem dictum
              bibendum. In ultrices sed felis non accumsan. Cras vel accumsan
              lectus, vitae elementum velit. Nunc facilisis quam nec tincidunt
              suscipit. Nunc metus dolor, feugiat nec ante quis, consectetur
              egestas lacus. Nullam interdum nunc ut pellentesque malesuada.
              Vestibulum mattis ex at finibus mollis. Vivamus vitae rutrum nisl.
              Nam facilisis vitae velit id mollis. Nam congue ante et ultricies
              ultrices. Etiam lacinia dolor eu metus condimentum vehicula id
              quis purus. Praesent blandit ipsum non eros tempus interdum.
            </MessageError>

            <h2>Organisms</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default StyleguideContainer;
