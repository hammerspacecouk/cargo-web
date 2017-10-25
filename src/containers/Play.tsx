import * as React from 'react';
import * as moment from 'moment';
import {ChannelInterface, DirectionInterface, PlayShipInterface} from "../models/Play";
import DI from "../DI";

import Port from '../components/Play/Port';
import Travelling from "../components/Play/Travelling";
import {PortInterface} from "../models/Port";

interface Props {
    play: PlayShipInterface;
}

interface State {
    showCountdown: boolean;
    now: any; // todo - moment type?
}

export default class Component extends React.Component<Props, State> {

    private allowAnimationUpdate: boolean;

    constructor() {
        super();
        this.allowAnimationUpdate = false;
        this.state = {
            showCountdown : false,
            now: moment(),
        }
    }

    isTravelling(location: PortInterface | ChannelInterface): location is ChannelInterface {
        return (location as ChannelInterface).type === 'Channel';
    }

    getArrivalString(location: ChannelInterface): string {
        const arrivalDate = moment(location.arrival);
        if (this.state.showCountdown) {
            // todo - add some time to give the worker time to process
            const duration = moment.duration(arrivalDate.diff(this.state.now));
            if (duration.asSeconds() <= 0) {
                return 'Arriving...';
            }
            return `${duration.hours()}h:${duration.minutes()}m:${duration.seconds()}s`; // todo - format nicer
        }

        return arrivalDate.format("dddd, Do MMMM YYYY, h:mm:ss a");
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
        const play = this.props.play;
        if (this.isTravelling(play.location)) {
            return <Travelling arrival={this.getArrivalString(play.location)}
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
