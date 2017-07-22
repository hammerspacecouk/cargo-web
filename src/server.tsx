import { h } from 'preact';
import * as render from 'preact-render-to-string';
import App from './App';

const server = function (initData) {
    // Render the component to a string
    const html = render(<App name="Server" />);

    return {
        html,
        state: initData,
    };
};

export default server;