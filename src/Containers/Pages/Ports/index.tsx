import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";

import ListContainer from "./ListContainer";
import ShowContainer from "./ShowContainer";
import NotFound from "../../../Components/Error/NotFound";
import BreadCrumbs from "../../../Components/BreadCrumbs";

class Container extends React.Component<undefined, undefined> {

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

