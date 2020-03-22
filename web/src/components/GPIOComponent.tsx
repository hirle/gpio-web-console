
import React, { FunctionComponent } from 'react';
import GPIO from '../model/GPIO';

type GPIOProps = {
    gpio: GPIO
}
const GPIOComponent: FunctionComponent<GPIOProps> = ({ gpio, children }) =>
    <article>
        <div>{gpio.name}</div>
        <div>{gpio.pin}</div>
    </article>
export default GPIOComponent;
