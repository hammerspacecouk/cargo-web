import * as React from 'react';
import * as moment from 'moment';
import {ChannelInterface, DirectionInterface, PlayShipInterface} from "../models/Play";
import DI, {Services} from "../DI";

import Port from '../components/Play/Port';
import Travelling from "../components/Play/Travelling";
import {PortInterface} from "../models/Port";

interface Props {
    play: PlayShipInterface;
}

interface State {
    play: PlayShipInterface;
    showCountdown: boolean;
    now: any; // todo - moment type?
}

export default class Component extends React.Component<Props, State> {

    private allowAnimationUpdate: boolean;
    private checkingArrival: boolean;

    constructor(props: Props) {
        super();
        this.allowAnimationUpdate = false;
        this.checkingArrival = false;
        this.state = {
            play: props.play,
            showCountdown : false,
            now: moment()
        }
    }

    isTravelling(location: PortInterface | ChannelInterface): location is ChannelInterface {
        return (location as ChannelInterface).type === 'Channel';
    }

    async handleArrival() {
        if (this.checkingArrival) {
            return;
        }

        this.checkingArrival = true;
        const play = await Services.play.getForShip(this.props.play.ship.id);
        // todo - wait a bit before trying again. Abstract this to some helper
        this.setState({
            play
        });
        this.checkingArrival = false;
    }

    getArrivalString(location: ChannelInterface): string {
        const arrivalDate = moment(location.arrival);
        if (this.state.showCountdown) {
            // todo - add some time to give the worker time to process
            const duration = moment.duration(arrivalDate.diff(this.state.now));
            if (duration.asSeconds() <= 0) {
                this.handleArrival();
                return 'Arriving...';
            }
            return `${duration.hours()}h:${duration.minutes()}m:${duration.seconds()}s`; // todo - format nicer
        }

        return arrivalDate.format("dddd, Do MMMM YYYY, h:mm:ss a");
    }

    getPercent(location: ChannelInterface): number {
        const arrivalDate = moment(location.arrival);
        const duration = moment.duration(arrivalDate.diff(this.state.now));
        let percent = ((location.travelTime - duration.asSeconds()) / location.travelTime) * 100;
        percent = Math.min(percent, 100);
        return Math.max(0, percent);
    }

    updateTime() {
        if (!this.allowAnimationUpdate) {
            return;
        }
        this.setState({
            now: moment(),
        });
        window.requestAnimationFrame(() => this.updateTime());
    }

    componentDidMount() {
        this.allowAnimationUpdate = true;
        this.setState({
            showCountdown : true
        });
        this.updateTime();
    }
    componentWillUnmount() {
        this.allowAnimationUpdate = false;
    }

    render() {
        const play = this.state.play;
        if (this.isTravelling(play.location)) {
            return <Travelling arrival={this.getArrivalString(play.location)}
                               percent={this.getPercent(play.location)}
                               destinationName={play.location.destination.name}
            />
        }

        return <Port actionPath={`${DI.apiHostname}${play.directions.actionPath}`}
                     shipName={play.ship.name}
                     portName={play.location.name}
                     directions={play.directions.directions}
        />;
    }
}
