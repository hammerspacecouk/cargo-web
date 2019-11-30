import * as React from "react";
import styled from "styled-components";
import { Prose } from "../../Atoms/Prose";
import { MessageOk } from "../../Molecules/Message";
import { AboutLayout } from "../../Templates/AboutLayout";
import { COLOURS } from "../../../styles/colours";
import { SIZES } from "../../../styles/typography";
import { GRID } from "../../../styles/variables";
import { H2, H3 } from "../../Atoms/Heading";

const HashDemo = styled.div`
  ${SIZES.C};
  font-family: monospace;
  display: block;
  padding: ${GRID.UNIT};
  background: ${COLOURS.BLACK.COLOURISED};
  color: ${COLOURS.WHITE.STANDARD};
  margin-bottom: ${GRID.UNIT};
`;

const HashDemoInput = styled.div`
  text-align: center;
  &:after {
    ${SIZES.B};
    content: "⬇";
    display: block;
    margin: ${GRID.HALF} 0;
  }
`;

const HashDemoCode = styled.div`
  text-align: center;
`;

export const PoliciesPage = () => (
  <AboutLayout title="Policies">
    <Prose>
      <H2>Human readable</H2>
      <div className="unit">
        <MessageOk>We store NO personal data</MessageOk>
        <MessageOk>We have no tracking code or ads</MessageOk>
      </div>
      <H3>Security</H3>
      <p>
        We don't ask for a password, so we don't have to store your password. We rely on alternative means of
        authentication using your account with an authentication provider.
      </p>
      <H3>Your data</H3>
      <p>
        It is necessary to have a piece of information unique to you in order to allow you to log in and keep playing
        the same game. We used your account ID from an authentication provider. However we don't store it, so we can't
        use it to look up your profile. We scramble it through a one-way process to get an unpredictable code, and we
        store that instead.
      </p>
      <HashDemo as="div">
        <HashDemoInput>googleid:123456</HashDemoInput>
        <HashDemoCode>a96b5a8bf6bacf4e56e&hellip;</HashDemoCode>
      </HashDemo>
      <p>
        We have no way of restoring your account ID back from this code. We cannot access your account, post as you or
        email you from this data so you will not hear from us. There is no personally identifying data in our system.
      </p>
      <p>
        Any emails we send rely on the email address being provided at the point the message is sent (such as an
        invite).
        <br />
        If somebody sends you an invite we will email you once, and not store your address. We will not be able to
        contact you again even if we wanted to.
      </p>
      <p>
        We offer a delete account option, and we mean it. The{" "}
        <a href="https://en.wikipedia.org/wiki/The_Entire_History_of_You" target="_blank" rel="noopener">
          {" "}
          entire history of you{" "}
        </a>{" "}
        is deleted immediately if you use this option and it cannot be recovered.
      </p>
      <H3>Tracking</H3>
      <p>
        This site does not use <strong>any</strong> third party tracking services. There are no analytics platforms
        tracking you or sending data about you to other companies. When you're using this website, you're{" "}
        <strong>only</strong> using this website. TODO - What about payments? This site <strong>only</strong> uses one
        cookie: AUTHENTICATION_TOKEN. This cookie saves you having to log in every time you come back. That's all it
        does. You can delete it, and you'll just have to log in again. It lasts for three months since last use.
        Therefore if you don't visit for three months it will naturally disappear and you will have to log in again.
        Since this cookie is a functional part of the website and doesn't contain more data than it needs to, we don't
        have to show you that <em>Cookie Banner</em>. Hurrah.
      </p>
      <p>
        There are a couple of localStorage parameters too. These are bits of data stored on your computer and read by
        your browser to perform animations. They are never sent back to the server.
      </p>

      <H3>Trust</H3>
      <p>
        You may not want to believe everything that is written above. But to help with trust, this application is coded
        in the open. You can view all of the code that makes up this game at:
      </p>
      <p>
        In fact, if you want to submit bug fixes and feature requests please do over there, as long as they adhere to
        the Contributing guidelines.
      </p>
      <H2>Legalese</H2>
      <p>This is the same basic principles as above, but in the correct legal language</p>
    </Prose>
  </AboutLayout>
);
