import * as React from 'react';

export interface LoginFormProps {
    loginPathEmail: string;
    loginPathFacebook: string;
    loginPathGoogle: string;
    loginPathMicrosoft: string;
    loginPathTwitter: string;
    emailSent: boolean;
}

export default (props: LoginFormProps) => {
    let sentMsg = null;
    if (props.emailSent) {
        sentMsg = (
            <p className="message" style={{color:"red"}}>Check your e-mail for the login link</p>
        );
    }

    return (
        <div className="login-form">
            {sentMsg}
            <p>
                We identify which player you are by confirming your unique e-mail address.
                Use one of the following methods. We don't get access to your accounts on these services.
                No spam, no sharing with third parties.
            </p>
            <ul className="login-form__social-list">
                <li>
                    <a href={props.loginPathFacebook} className="login-form__social-item login-form__social-item--facebook">
                        <svg  className="login-form__social-logo login-form__social-logo--facebook"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 60.734 60.733">
                            <path fill="#fff"
                                  d={`M57.378 0H3.352C1.502 0 0 1.5 0 3.354V57.38c0 1.852 1.502 3.353 3.352
                                  3.353h29.086v-23.52h-7.914v-9.166h7.914v-6.76c0-7.843 4.79-12.116 11.787-12.116 3.355 0
                                  6.232.253 7.07.36v8.2h-4.853c-3.805 0-4.54 1.81-4.54 4.464v5.85h9.08l-1.188
                                  9.167h-7.892v23.52h15.475c1.852 0 3.355-1.502 3.355-3.35V3.35C60.732
                                  1.5 59.23 0 57.378 0z`}/>
                        </svg>
                        <span className="login-form__social-text">Facebook</span>
                    </a>
                </li>
                <li>
                    <a href={props.loginPathGoogle} className="login-form__social-item login-form__social-item--google">
                        <svg className="login-form__social-logo login-form__social-logo--google"
                             xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink"
                             viewBox="0 0 48 48">
                            <defs>
                                <path id="a"
                                      d={`M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13
                                      13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22
                                      22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z`}/>
                            </defs>
                            <clipPath id="b">
                                <use xlinkHref="#a" overflow="visible"/>
                            </clipPath>
                            <path clipPath="url(#b)"
                                  fill="#FBBC05"
                                  d="M0 37V11l17 13z"/>
                            <path clipPath="url(#b)"
                                  fill="#EA4335"
                                  d="M0 11l17 13 7-6.1L48 14V0H0z"/>
                            <path clipPath="url(#b)"
                                  fill="#34A853"
                                  d="M0 37l30-23 7.9 1L48 0v48H0z"/>
                            <path clipPath="url(#b)"
                                  fill="#4285F4"
                                  d="M48 48L17 24l-4-3 35-10z"/>
                        </svg>
                        <span className="login-form__social-text">Google</span>
                    </a>
                </li>
                <li>
                    <a href={props.loginPathMicrosoft} className="login-form__social-item login-form__social-item--microsoft">
                        <svg className="login-form__social-logo login-form__social-logo--microsoft"
                             viewBox="0 0 220 220">
                            <path fill="#F35325" d="M104.868 104.868H0V0h104.868v104.868z"/>
                            <path fill="#81BC06" d="M220.654 104.868H115.788V0h104.866v104.868z"/>
                            <path fill="#05A6F0" d="M104.865 220.695H0V115.827h104.865v104.868z"/>
                            <path fill="#FFBA08" d="M220.654 220.695H115.788V115.827h104.866v104.868z"/>
                        </svg>
                        <span className="login-form__social-text">Microsoft</span>
                    </a>
                </li>
                <li>
                    <a href={props.loginPathFacebook} className="login-form__social-item login-form__social-item--twitter">
                        <svg className="login-form__social-logo login-form__social-logo--twitter"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 300 244.187">
                            <path fill="#fff"
                                  d={`M94.72 243.18c112.46 0 173.96-93.168 173.96-173.96 0-2.646-.054-5.28-.173-7.903
                                  11.938-8.63 22.314-19.4 30.498-31.66-10.955 4.87-22.744 8.147-35.11 9.625 12.622-7.57
                                  22.313-19.543 26.885-33.817-11.813 7.004-24.895 12.093-38.824 14.84C240.8 8.423
                                  224.916.99 207.326.99c-33.763 0-61.143 27.38-61.143 61.13 0 4.8.537 9.466 1.586
                                  13.942-50.817-2.556-95.876-26.886-126.03-63.88-5.253 9.036-8.28 19.53-8.28 30.73 0
                                  21.212 10.793 39.938 27.207
                                  50.893-10.03-.31-19.454-3.063-27.69-7.646-.01.254-.01.504-.01.78 0 29.61 21.076 54.33
                                  49.052 59.932-5.138 1.4-10.544 2.152-16.123 2.152-3.933 0-7.766-.387-11.49-1.103 7.783
                                  24.294 30.354 41.97 57.114 42.466-20.925 16.402-47.286 26.17-75.936 26.17-4.93
                                  0-9.798-.28-14.584-.845 27.06 17.345 59.19 27.465 93.723 27.465`}/>
                        </svg>
                        <span className="login-form__social-text">Twitter</span>
                    </a>
                </li>
            </ul>
            <form action={props.loginPathEmail} method="post">
                <h3 className="d"><label htmlFor="login-email">Login via e-mail</label></h3>
                <p>
                    If you'd rather use your e-mail directly enter your e-mail address and we'll
                    send you a link that lets you login immediately. The link is valid for one hour and there are
                    no passwords required.
                </p>
                <p>
                    <input id="login-email" type="email" name="target" required placeholder="name@example.com" />
                    <button type="submit">Send</button>
                </p>
            </form>
            <p>
                <a href="#">More info on our login policies</a>
            </p>
        </div>
    );
};
