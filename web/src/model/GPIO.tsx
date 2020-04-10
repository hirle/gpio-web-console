export enum State {
    NotInitialized,
    On,
    Off
}

export enum Mode {
    PULSE = 'PULSE',
    TWOSTATES = 'TWOSTATES',
    NOTWIRED = 'NOTWIRED' 
}

export default class GPIO {

    readonly pin: number;
    readonly id: string;
    readonly name: string;
    readonly mode: Mode;
    state: State;

    constructor(pin: number, id: string, name: string, mode:string) {
        this.pin = pin;
        this.id = id;
        this.name = name;
        this.mode = (Mode as any)[mode];
        this.state = State.NotInitialized;
    }

    setState(toOn: boolean) {
        this.state = toOn ? State.On : State.Off;
    }

    static  deserialize(fromJson :any): GPIO {
        const returned = new GPIO(fromJson.pin, fromJson.id, fromJson.name, fromJson.mode);
        returned.state = fromJson.state ? State.On : State.Off;
        return returned;
    }
}