export enum State {
    NotInitialized,
    On,
    Off
}

export default class GPIO {

    readonly pin: number;
    readonly id: number;
    readonly name: string;
    state: State;

    constructor(pin: number, id: number, name: string) {
        this.pin = pin;
        this.id = id;
        this.name = name;
        this.state = State.NotInitialized;
    }

    setState(toOn: boolean) {
        this.state = toOn ? State.On : State.Off;
    }

    static  deserialize(fromJson :any): GPIO {
        const returned = new GPIO(fromJson.pin, fromJson.id, fromJson.name);
        returned.state = fromJson.state ? State.On : State.Off;
        return returned;
    }
}