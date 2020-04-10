import React from 'react';
import Color from 'color';

type ColoredLedProps = {
    color: string
}

const ColoredLed = ({ color }: ColoredLedProps) => {

    const baseColor = Color(color);

    const hslLDivTwo = baseColor.darken(0.5);
    const hslSMinus6 = baseColor.desaturate(0.06);
    
    const centerId = "center-" + baseColor.rgbNumber();
    const reflectId = "reflect-" + baseColor.rgbNumber();

    return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
        <defs>
            <linearGradient y2="0" x2="1" y1="0" x1="0" id="ring">
                <stop offset="0" stopColor="#bfbfbf" />
                <stop offset="1" stopColor="#404040" />
            </linearGradient>
            <linearGradient spreadMethod="pad" y2="1" x2="1" y1="0" x1="0" id={centerId}>
                <stop offset="0" stopOpacity="0.992188" stopColor={baseColor.toString()} />
                <stop offset="1" stopOpacity="0.988281" stopColor={hslLDivTwo.toString()} />
            </linearGradient>
            <linearGradient spreadMethod="pad" y2="1" x2="1" y1="0" x1="0" id={reflectId}>
                <stop offset="0" stopOpacity="0.996094" stopColor="white" />
                <stop offset="0.703125" stopOpacity="0.984375" stopColor={hslSMinus6.toString()} />
            </linearGradient>
        </defs>
        <g>
            <circle transform="rotate(90 320 240)" fillOpacity="0.77" id="svg_3" r="196.125" cy="240" cx="320" strokeLinecap="round" strokeWidth="17.5" fill="url(#ring)" />
            <circle id="svg_7" r="160" cy="239.999045" cx="319.252837" fillOpacity="0.64" strokeLinecap="round" strokeWidth="17.5" fill="url(#ring)" />
            <circle id="svg_8" r="150" cy="240.001698" cx="320.000535" strokeLinecap="round" strokeWidth="17.5" fill={`url(#${centerId})`} />
            <ellipse transform="rotate(-47.7626 249.18 168.124)" id="svg_20" ry="44.402987" rx="75.675959" cy="168.124194" cx="249.179609" strokeLinecap="round" strokeWidth="17.5" fill={`url(#${reflectId})`} />
        </g>
    </svg>);
};
export default ColoredLed;
