import * as React from 'react';

interface Props {
    staticContext: {
        initialData?: any;
    };
}
interface State {
    pageData?: any;
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let pageData: any;
        if (typeof window !== 'undefined') {
            pageData = (window as any).__DATA;
            delete (window as any).__DATA;
        } else if (props.staticContext.initialData !== undefined) {
            pageData = props.staticContext.initialData;
        }

        this.state = {pageData};
    }
}
