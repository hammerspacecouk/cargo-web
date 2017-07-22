import {h, Component} from 'preact';

export interface HelloWorldProps {
    name: string
}

export default class HelloWorld extends Component<HelloWorldProps, {}> {
    render (props) {
        return (
            <p>Hello {props.name}!</p>
        );
    }
}
