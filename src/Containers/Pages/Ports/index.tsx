import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {Route, Switch} from "react-router";

import {Port} from "../../../Domain/Port";
import ListContainer from "./ListContainer";
import ShowContainer from "./ShowContainer";
import NotFound from "../../../Components/Error/NotFound";
import BreadCrumbs from "../../../Components/BreadCrumbs";

interface Props {
    ports: Port[];
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {

    render() {
        return (
            <div>
                <BreadCrumbs crumbs={[
                    {link: '/ports', title: 'Ports'},
                ]} />
                <Switch>
                    <Route path="/ports/:portId" component={ShowContainer} exact={true} />
                    <Route path="/ports" component={ListContainer} exact={true} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default connect()(Container);

