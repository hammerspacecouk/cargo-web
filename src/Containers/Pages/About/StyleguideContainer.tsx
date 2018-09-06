import * as React from "react";
import CrumbTitle from "../../../Components/CrumbTitle";
import {
  MessageError,
  MessageInfo,
  MessageOk,
  MessageWarning
} from "../../../Components/Messages";
import CreditsIcon from "../../../Components/Icons/CreditsIcon";
import WarningIcon from "../../../Components/Icons/WarningIcon";
import TickIcon from "../../../Components/Icons/TickIcon";
import ProfileIcon from "../../../Components/Icons/ProfileIcon";
import MenuIcon from "../../../Components/Icons/MenuIcon";
import InfoIcon from "../../../Components/Icons/InfoIcon";
import HomeIcon from "../../../Components/Icons/HomeIcon";
import ErrorIcon from "../../../Components/Icons/ErrorIcon";
import EditIcon from "../../../Components/Icons/EditIcon";
import ChevronLeftIcon from "../../../Components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../Components/Icons/ChevronRightIcon";
import ShieldIcon from "../../../Components/Icons/ShieldIcon";

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
          </div>

          <h2 className="unit">Icons</h2>
          <ul className="unit m-box-list m-box-list--icons">
            <li>
              <h3 className="m-box-list__title">ChevronLeftIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <ChevronLeftIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">ChevronRightIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <ChevronRightIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">CreditsIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <CreditsIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">EditIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <EditIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">ErrorIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <ErrorIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">HomeIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <HomeIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">InfoIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <InfoIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">MenuIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <MenuIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">ProfileIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <ProfileIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">ShieldIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <ShieldIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">TickIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <TickIcon />
              </div>
            </li>
            <li>
              <h3 className="m-box-list__title">WarningIcon</h3>
              <div className="m-box-list__item m-box-list__item--icon">
                <WarningIcon />
              </div>
            </li>
          </ul>

          <div className="text--prose">
            <h2>Core</h2>
            <h2>Atoms</h2>

            <h3>Buttons</h3>

            <p>
              <button className="button">Standard button</button>
            </p>
            <p>
              <button className="button button--confirm">Confirm</button>
            </p>
            <p>
              <button className="button button--danger">Reject</button>
            </p>
            <p>
              <button className="button button--soft-danger">
                Soft Reject
              </button>
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
