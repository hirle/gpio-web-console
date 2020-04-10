
import React, { FunctionComponent } from 'react';
import GPIO, { State as GPIOState, Mode as GPIOMode } from '../model/GPIO';
import Api from '../Api';
import './GPIOComponent.css';
import ColoredLed from './ColoredLed';
import { Switch, Button } from 'antd';

type GPIOStateProps = {
    gpioState: GPIOState
}

const GPIOStateComponent: FunctionComponent<GPIOStateProps> = ({ gpioState }: GPIOStateProps) => {

    let color;
    switch (gpioState) {
        case GPIOState.On: color = 'green'; break;
        case GPIOState.Off: color = 'red'; break;
        default: color = 'grey'; break;
    }
    return <div className="gpio-state"><ColoredLed color={color} /></div>
}

type GPIOProps = {
    gpio: GPIO
}

enum GPIOButtonStatus {
    Active,
    InProgress,
    Error
}

class GPIOButton extends React.Component<GPIOProps, { status: GPIOButtonStatus }> {

    constructor(props: Readonly<GPIOProps>) {
        super(props);
        this.state = { status: GPIOButtonStatus.Active }
        this.onClickSwitch = this.onClickSwitch.bind(this)
        this.onClickPulse = this.onClickPulse.bind(this)
    }

    onClickSwitch(checked: boolean) {

        this.setState({ status: GPIOButtonStatus.InProgress })

        Api.postSetStatus(this.props.gpio, checked)
            .then(() => {
                this.setState({ status: GPIOButtonStatus.Active })
            })
            .catch(err => {
                console.log(err);
                this.setState({ status: GPIOButtonStatus.Error })
            })
    }

    onClickPulse() {

        this.setState({ status: GPIOButtonStatus.InProgress })

        Api.pulse(this.props.gpio)
            .then(() => {
                this.setState({ status: GPIOButtonStatus.Active })
            })
            .catch(err => {
                console.log(err);
                this.setState({ status: GPIOButtonStatus.Error })
            })
    }

    render() {

        switch (this.props.gpio.mode) {
            case GPIOMode.TWOSTATES:
                return <Switch
                    loading={this.state.status === GPIOButtonStatus.InProgress}
                    checked={this.props.gpio.state === GPIOState.On}
                    onClick={this.onClickSwitch}
                />;
            case GPIOMode.PULSE:
                return <Button
                    ghost
                    loading={this.state.status === GPIOButtonStatus.InProgress}
                    onClick={this.onClickPulse}>Pulse</Button>;
            case GPIOMode.NOTWIRED:
                return null;
            default:
                return <div>Error: unknown mode {this.props.gpio.mode}</div>;
        }

    }
}

const GPIOComponent: FunctionComponent<GPIOProps> = ({ gpio }) =>
    <article className="gpio-component">
        <div className="gpio-desc">
            {gpio.name}<span className="gpio-id">&nbsp;ID</span>
            <span className="gpio-pin">&nbsp;#{gpio.pin}</span>
        </div>
        <div className="gpio-button">
            <GPIOButton gpio={gpio} />
        </div>
        <GPIOStateComponent gpioState={gpio.state} />
    </article>
export default GPIOComponent;
