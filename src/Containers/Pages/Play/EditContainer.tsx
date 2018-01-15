import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PlayActions from "../../../Actions/Play/Actions";
import {StateInterface} from "../../../State/index";
import {APIClientInterface} from "../../../Data/API/index";
import {Ship} from "../../../Domain/Ship";
import Loading from "../../../Components/Loading";
import NotFound from "../../../Components/Error/NotFound";
import ActionTokenInterface from "../../../Domain/ActionTokenInterface";

// todo - this is the same as PlayContainer - how do I share it?
interface Props {
    match: {
        params: {
            shipId: string;
        };
    };
    ship: Ship;
    requestShipNameToken: ActionTokenInterface;
    loaded: boolean;
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

interface State {
    newName?: any;
}

class Container extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            newName: null
        };
    }

    componentDidMount() {
        if (!this.props.ship || this.props.ship.id !== this.props.match.params.shipId) {
            PlayActions.fetchShip(this.props.match.params.shipId, this.props.apiClient, this.props.dispatch);
        }
    }

    // todo - proper things
    async requestShipName(e: any) {
        e.preventDefault();
        // todo - fancy animation to hide loading (look like its decrypting words on the fly)
        // todo - use the form fields?
        // todo also - this should be a POST
        const response = await fetch(`http://api.dev.planetcargo.live:8080${this.props.requestShipNameToken.path}?token=${this.props.requestShipNameToken.token}`);
        const data = await response.json();
        this.setState({
            newName : data
        });
    }

    render() {
        if (!this.props.ship) {
            return this.props.loaded ? <NotFound /> : <Loading />;
        }

        // todo - abstract token hidden fields
        let name = null;
        if (this.state.newName) {
            name = (
                <form method="post" action={this.state.newName.action.path}>
                    <h3>Name offered: {this.state.newName.nameOffered}</h3>
                    <input type="hidden" name="token" value={this.state.newName.action.token} />
                    <button type="submit">Accept</button>
                    <button type="submit">Reject</button>
                </form>
            )
        }

        // todo - real values obviously
        return (
            <div className="t-doc">
                <h1 className="t-doc__title">
                    {this.props.ship.name} (1 week and three quarters)
                </h1>
                <div className="t-doc__main">
                    <h2>Request a new ship name</h2>
                    <p>A new name will be selected at random. You don't have to take it, but no refunds</p>
                    <form method="post" action={this.props.requestShipNameToken.path}>
                        <input type="hidden" name="token" value={this.props.requestShipNameToken.token} />
                        <button type="submit" onClick={this.requestShipName.bind(this)}>500 credits</button>
                    </form>

                    {name}

                    <h2>Upgrade ship</h2>
                    <form>
                        <button type="submit">500 credits</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        ship: state.play.ship,
        requestShipNameToken: state.play.requestShipNameToken,
        loaded: !state.play.fetching,
    })
)(Container);
