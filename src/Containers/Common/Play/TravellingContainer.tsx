import * as React from 'react';
import {connect} from 'react-redux';
import {StateInterface} from "../../../State";
import ChannelInterface from "../../../DomainInterfaces/ChannelInterface";
import IntervalFormatContainer from '../IntervalFormatContainer';
import * as differenceInSeconds from 'date-fns/difference_in_seconds';
import {APIClientInterface} from "../../../Data/API";

import {Dispatch} from "redux";
import {fetchShipData} from "../../../Actions/Play/Actions";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";

interface Props {
    readonly dispatch: Dispatch<any>;
    readonly apiClient: APIClientInterface;
    readonly channel: ChannelInterface;
    readonly ship: ShipInterface;
}

interface LocalState {
    percent: number;
    secondsRemaining: number;
    isArriving: boolean;
}

class TravellingContainer extends React.Component<Props, LocalState> {

    private allowAnimationUpdate: boolean;
    private allowArrivalCheck: boolean;

    constructor(props: Props) {
        super(props);
        this.allowAnimationUpdate = false;
        this.allowArrivalCheck = false;
        this.state = this.calculateState(props.channel);
    }

    calculateState(channel: ChannelInterface): LocalState {
        const now = new Date();
        const start = new Date(channel.startTime);
        const arrival = new Date(channel.arrival);
        const totalSeconds = differenceInSeconds(arrival, start);
        const secondsRemaining = Math.max(0, differenceInSeconds(arrival, now));

        const percent = Math.max(0,
            Math.min(100,
                (((totalSeconds - secondsRemaining) / totalSeconds) * 100)
            )
        );

        if (secondsRemaining <= 0 && this.allowAnimationUpdate && !this.allowArrivalCheck) {
            this.allowAnimationUpdate = false;
            this.allowArrivalCheck = true;
            this.handleArrival();
        }

        return {
            secondsRemaining,
            percent,
            isArriving: !secondsRemaining
        };
    }

    handleArrival() {
        if (!this.allowArrivalCheck) {
            return;
        }
        fetchShipData(this.props.ship.id, this.props.apiClient, this.props.dispatch);
        setTimeout(() => {this.handleArrival()}, 3500);
    }

    componentDidMount() {
        this.allowAnimationUpdate = true;
        window.requestAnimationFrame(() => this.updateValue());
    }

    componentWillUnmount() {
        this.allowAnimationUpdate = false;
        this.allowArrivalCheck = false;
    }

    updateValue() {
        if (!this.allowAnimationUpdate) {
            return;
        }

        this.setState(this.calculateState(this.props.channel));
        window.requestAnimationFrame(() => this.updateValue());
    }

    render() {
        let remaining: any = 'Arriving...';
        if (this.state.secondsRemaining) {
            remaining = (
                <IntervalFormatContainer seconds={this.state.secondsRemaining} />
            );
        }

        return (
            <div>
                <h2>Destination: {this.props.channel.destination.name}</h2>
                <h3 className="text--center">{remaining}</h3>
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '16px auto',
                    background: '#666',
                    height: '32px',
                    borderRadius: '64px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        height: '32px',
                        background: '#6c6',
                        width: `${this.state.percent}%`
                    }}/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        channel: state.play.currentChannel,
        ship: state.play.ship,
    })
)(TravellingContainer);