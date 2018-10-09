import * as React from "react";
import { MessageOk } from "../../Components/Panel/Messages";
import AboutLayout from "../../Components/Layout/AboutLayout";

class PoliciesContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <AboutLayout title="Policies">
        <div className="text--prose">
          <h2>Human readable</h2>
          <div className="unit">
            <MessageOk>We store NO personal data</MessageOk>
          </div>
          <h3>Security</h3>
          <p>
            We don't ask for a password, so we don't have to store your password. We rely on alternative means of
            authentication using your account on third party services, or an e-mail to your inbox.
          </p>
          <h3>Your data</h3>
          <p>
            It is necessary to have a piece of information unique to you in order to allow you to log in and keep
            playing the same game. We use your e-mail address. However we don't store the e-mail address itself. We
            scramble it through a one-way process to get an unpredictable code, and we store that instead.
          </p>
          <div className="m-hash-demo">
            <div className="m-hash-demo__email">name@example.com</div>
            <div className="m-hash-demo__code">
              a96b5a8bf6bacf4e56e5091eafb8607f483617eb690ea52c827c93cde4e09173
            </div>
          </div>
          <p>
            We have no way of restoring your e-mail address back from this code. We cannot e-mail you from this data so
            you will not hear from us. There is no personally identifying data in our system. We also do not store
            which third-party account you used to tell us your e-mail address. We do not have any further access to
            those third party accounts and we cannot post as you.
          </p>
          <p>
            Any e-mails we send rely on the e-mail address being provided at that point.<br/>
            If somebody sends you an invite we will email you once, and not store your address. We will not be able to
            contact you again even if we wanted to.<br/>
            When you request to log in via e-mail we send to the e-mail address you provide. It is not stored once
            sent.
          </p>
          <p>
            We offer a delete account option, and we mean it. The <a
            href="https://en.wikipedia.org/wiki/The_Entire_History_of_You"
            target="_blank"
            rel="noopener"
          > entire history of you </a> is deleted immediately if you use this option and it cannot be recovered.
          </p>
          <h3>Tracking</h3>
          <p>
            This site does not use <strong>any</strong> third party tracking services. There are no analytics platforms
            tracking you or sending data about you to other companies. When you're using this website,
            you're <strong>only</strong> using this website. TODO - What about payments? This
            site <strong>only</strong> uses two cookies. These are
          </p>
          <table className="table table--striped">
            <thead>
            <tr>
              <th>Cookie Name</th>
              <th>What is it for?</th>
              <th>How long does it last?</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <code>AUTHENTICATION_TOKEN</code>
              </td>
              <td>
                This cookie saves you having to log in every time you come back. That's all it does. You can delete it,
                and you'll just have to log in again.
              </td>
              <td>
                It lasts for three months since last use. Therefore if you don't visit for three months it will
                naturally disappear and you will have to log in again.
              </td>
            </tr>
            <tr>
              <td>
                <code>FLASH_DATA_STORE</code>
              </td>
              <td>
                This cookie is a temporary cookie that one page uses to tell the next page what to do. For example, one
                page might generate a message and put it in the cookie. Then the next page will display it.
              </td>
              <td>
                This cookie's data has no value once it is used, so it designed to remove itself as soon as you close
                the tab/browser.
              </td>
            </tr>
            </tbody>
          </table>
          <p>
            Since both these Cookies are functional parts of the website and don't contain more data than they need to,
            we don't have to show you that <em>Cookie Banner</em>. Hurrah.
          </p>
          <p>
            There are a couple of localStorage parameters too. These are bits of data stored on your computer and read
            by your browser. They are never sent back to the server. These are:
          </p>
          <table className="table table--striped">
            <thead>
            <tr>
              <th>Name</th>
              <th>What is it for?</th>
              <th>How long does it last?</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>CARGO_SESSION_CONTEXT</td>
              <td>
                This a local cache of your current session data. This is so that the game can become interactive faster, without having to contact the server for data first. It is only used by your browser and not sent back to us.
              </td>
              <td>
                After 28 days our game code will automatically delete this when it tries to use it, and then replace it with a new one. It will be removed entirely if you log out.
              </td>
            </tr>
            </tbody>
          </table>

          <h3>Trust</h3>
          <p>
            You may not want to believe everything that is written above. But to help with trust, this application is
            coded in the open. You can view all of the code that makes up this game at:
          </p>
          <p>
            In fact, if you want to submit bug fixes and feature requests please do over there, as long as they
            adhere to the Contributing guidelines.
          </p>
          <h2>Legalese</h2>
          <p>
            This is the same basic principles as above, but in the correct legal language
          </p>
        </div>
      </AboutLayout>
    );
  }
}

export default PoliciesContainer;
