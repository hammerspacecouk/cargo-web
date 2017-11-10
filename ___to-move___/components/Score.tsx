import * as React from 'react';

interface Props {
    value: string,
}

export default ({value}: Props) => <div className="score">{value}</div>;
