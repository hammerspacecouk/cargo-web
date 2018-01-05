import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";

import AboutContainer from "./AboutContainer";
import PoliciesContainer from "./PoliciesContainer";
import StyleguideContainer from "./StyleguideContainer";
import StatusContainer from "./StatusContainer";

import NotFound from "../../../Components/Error/NotFound";
import BreadCrumbs from "../../../Components/BreadCrumbs";


class Container extends React.Component<undefined, undefined> {

    render() {
        return (
            <div>
                <BreadCrumbs crumbs={[
                    {link: '/', title: 'Home'},
                    {link: '/about', title: 'About'},
                ]} />
                <Switch>
                    <Route path="/about/policies" component={PoliciesContainer} exact={true} />
                    <Route path="/about/status" component={StatusContainer} exact={true} />
                    <Route path="/about/styleguide" component={StyleguideContainer} exact={true} />
                    <Route path="/about" component={AboutContainer} exact={true} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default connect()(Container);

