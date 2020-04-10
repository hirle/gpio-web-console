
interface GpioDescription {
    pin: number;
    id: string;
    name: string;
    mode: string;
}

export default interface Config {
    port: number,
    gpio: GpioDescription[];
}