
import React, { FunctionComponent } from 'react';
import GPIO, { State as GPIOState } from '../model/GPIO';
import './GPIOComponent.css';
import ColoredLed from './ColoredLed';

type GPIOStateProps = {
    gpioState: GPIOState
}


const GPIOStateComponent: FunctionComponent<GPIOStateProps> = ({ gpioState }: GPIOStateProps) => {

    let color;
    switch( gpioState ) {
        case GPIOState.On: color= 'green'; break;
        case GPIOState.Off: color= 'red'; break;
        case GPIOState.NotInitialized: color= 'grey'; break;
    }
    return <div className="gpio-state"><ColoredLed color={color}/></div>
}

type GPIOProps = {
    gpio: GPIO
}
const GPIOComponent: FunctionComponent<GPIOProps> = ({ gpio }) =>
    <article className="gpio-component">
        <div className="gpio-desc">{gpio.name}<span className="gpio-id">&nbsp;ID <code>{gpio.id}</code></span><span className="gpio-pin">&nbsp;{gpio.pin}</span></div>
        <GPIOStateComponent gpioState={gpio.state} />
    </article>
export default GPIOComponent;
