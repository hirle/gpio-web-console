enum State {
    NotInitialized,
    On,
    Off
}

export default class GPIO {
    
    readonly pin: number;
    readonly id: number;
    readonly name: string;
    readonly state: State;
    
    constructor(pin: number, id: number, name: string) {
        this.pin = pin;
        this.id = id;
        this.name = name;
        this.state = State.NotInitialized;
    }
}