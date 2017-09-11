import * as React from 'react';

export interface HelloWorldProps { name: string; }

const Component = (props: HelloWorldProps) => <p>Yello {props.name}!</p>;

export default Component;
