import { h, Component } from 'preact';
import HelloWorld from './HelloWorld';

export interface AppProps {
    name: string;
}
interface AppState {
    name: string;
}

export default class App extends Component<AppProps, AppState> {
    render(props: AppProps) {
        return (
            <div id="app">
                <HelloWorld name={props.name} />
            </div>
        )
    }
}
