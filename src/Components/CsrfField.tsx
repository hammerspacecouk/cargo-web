import * as React from 'react';

interface Props {
    token: string;
}

/* todo
Warning: A component is changing an uncontrolled input of type hidden to be controlled.
Input elements should not switch from uncontrolled to controlled (or vice versa).
Decide between using a controlled or uncontrolled input element for the lifetime of the component.
More info: https://fb.me/react-controlled-components
 */

export default (props: Props) => (
    <input type="hidden" name="csrfToken" value={props.token} />
);
