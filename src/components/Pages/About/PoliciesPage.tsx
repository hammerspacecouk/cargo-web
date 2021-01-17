import * as React from "react";
import styled from "styled-components";
import { Prose } from "@src/components/Atoms/Prose";
import { MessageOk } from "@src/components/Molecules/Message";
import { AboutLayout } from "@src/components/Templates/AboutLayout";
import { COLOURS } from "@src/styles/colours";
import { SIZES } from "@src/styles/typography";
import { GRID } from "@src/styles/variables";
import { H2, H3 } from "@src/components/Atoms/Heading";

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
        <strong>only</strong> using this website. This site <strong>only</strong> uses one cookie: AUTHENTICATION_TOKEN.
        This cookie saves you having to log in every time you come back. That's all it does. You can delete it, and
        you'll just have to log in again. It lasts for three months since last use. Therefore if you don't visit for
        three months it will naturally disappear and you will have to log in again. Since this cookie is a functional
        part of the website and doesn't contain more data than it needs to, we don't have to show you that{" "}
        <em>Cookie Banner</em>. Hurrah.
      </p>
      <p>
        There are a couple of localStorage parameters too. These are bits of data stored on your computer and read by
        your browser to perform animations. They are never sent back to the server.
      </p>
      <H3>Payments</H3>
      <p>
        Secure payments are handled by{" "}
        <a href="https://stripe.com/" target="_blank" rel="noopener">
          Stripe
        </a>
        . We do not store personal information so do not send any to Stripe. Stripe will require your own submission of
        personal information to facilitate payment at the necessary time. Please refer to Stripe's{" "}
        <a href="https://stripe.com/privacy" target="_blank" rel="noopener">
          Privacy Policy
        </a>
        . We will have access to some of this data via Stripe's payment history, in order to facilitate refunds or
        queries but we do not export this data back to our servers.
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

      <p>Hammerspace LTD operates the https://www.saxopholis.com website, which provides the SERVICE.</p>

      <p>
        This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of
        Personal Information if anyone decided to use our Service, the Saxopholis website.
      </p>

      <p>
        If you choose to use our Service, then you agree to the collection and use of information in relation with this
        policy. The Personal Information that we collect are used for providing and improving the Service. We will not
        use or share your information with anyone except as described in this Privacy Policy.
      </p>

      <p>
        The terms used in this Privacy Policy have the same meanings as in our{" "}
        <a href="/about/terms">Terms and Conditions</a>, unless otherwise defined in this Privacy Policy.
      </p>

      <H3>Information Collection and Use</H3>

      <p>
        For a better experience while using our Service, we may require you to provide us with certain personally
        identifiable information, including but not limited to your name, phone number, and postal address. The
        information that we collect will be used to contact or identify you.
      </p>

      <H3>Log Data</H3>

      <p>
        We want to inform you that whenever you visit our Service, we collect information that your browser sends to us
        that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP")
        address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent
        on those pages, and other statistics.
      </p>

      <H3>Cookies</H3>

      <p>
        Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent
        to your browser from the website that you visit and are stored on your computer’s hard drive.
      </p>

      <p>
        Our website only uses these "cookies" to provide access to our Service. If you choose to refuse our cookies, you
        may not be able to use some portions of our Service.
      </p>

      <p>
        For more general information on cookies, please read{" "}
        <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.
      </p>

      <H3>Service Providers</H3>

      <p>We may employ third-party companies and individuals due to the following reasons:</p>

      <ul>
        <li>To facilitate authentication to our Service;</li>
        <li>To facilitate payment with our service;</li>
      </ul>

      <p>We do not pass any of your data to these third parties.</p>

      <H3>Security</H3>

      <p>
        We value your trust in providing us your Personal Information, thus we are striving to use commercially
        acceptable means of protecting it. But remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
      </p>

      <H3>Links to Other Sites</H3>

      <p>
        Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that
        site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the
        Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy
        policies, or practices of any third-party sites or services.
      </p>

      <p>Children's Privacy</p>

      <p>
        Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable
        information from children under 13. In the case we discover that a child under 13 has provided us with personal
        information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that
        your child has provided us with personal information, please contact us so that we will be able to do necessary
        actions.
      </p>

      <H3>Changes to This Privacy Policy</H3>

      <p>
        We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any
        changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are
        effective immediately, after they are posted on this page.
      </p>

      <H3>Contact Us</H3>

      <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</p>
    </Prose>
  </AboutLayout>
);
