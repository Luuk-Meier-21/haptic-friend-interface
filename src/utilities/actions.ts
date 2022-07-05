

// Signals can be send to the controller in a simple 2 byte format.
// Commands: <Location><State> (for example: a0, a1, b0, b1)
//      where location is a char (a, b, c) equal to a spot on the controller, 
//      where state is a number (0, 1, 2) equal to the state the given location has to be put in.

import type { SocketController } from "./arduino";
import { nullSafeEvent } from "./utilities";


// 1. A user starts the game.
// 2. Music starts
// 3. At a random moment the music stops, the controller starts giving haptic feedback (named a action).
//      a. Location and intensity of the feedback is set based on the given command. 
//      b. For example a command of a1 sets location a to a vibrating state of 1(on normal).
// 4. The user is prompted to respond to the haptic feedback by pressing the correct button the right amount of times.
//      a. Pressed location needs to be equal to feedback location. 
//      b. Amount of presses needs to be equal to the state of the feedback, 
//         a state of 1 needs one press, a state of 2 needs a double press.
// 5. When the user completes the action the action is set to succes and the music continues until another action starts.

export interface HapticAction {
    start: (outOfTime: () => void) => void;
    try: (givenRef: string) => void;
    complete: (succes: boolean) => Action;
}

export class ActionController implements HapticAction {
    private currAction: Action = null;
    private stack: Action[] = [];
    private finishedStack: Action[] = [];

    constructor(public controller: SocketController) {}

    // Event Listeners:
    public onTimeUp: () => void = null;
    public onActionCompletion: (succes: boolean) => void = null;
    // TODO: implement total completion.
    public onTotalCompletion: (succes: boolean, completedActions: number) => void = null;

    // Stack methods: 
    public new = () => this.currAction = this.stack.shift();
    public push = (...action: Action[]) => this.stack.push(...action);

    // Creation methods:
    public create = (ref: string, duration: number): Action => new Action(ref, duration, this.controller);
    public factory = (callback: (a: ActionController) => Action[]) => callback(this).map(action => this.push(action));

    /** Starts current active `Action`. */
    public start = () => {
        this.new();
        const outOfTimeHandler = () => {
            nullSafeEvent(this.onTimeUp);
            this.complete(false);
        }
        this.currAction.start(outOfTimeHandler);
    }
    /** Compairs givenRef to ref of current active `Action`, when equal returns true, else false. */
    public try = (givenRef: string): boolean => {
        // Only one try. or give them a second chance?
        const isSucces: boolean = this.currAction.try(givenRef);
        this.complete(isSucces);
        console.log(`Tried: ${isSucces}`);
        return isSucces;
    }

    public complete = (succes: boolean): Action => {
        const action = this.currAction.complete(succes);
        this.finishedStack.push(action);
        nullSafeEvent(this.onTotalCompletion);
        return action;
    }
}

export class Action implements HapticAction {
    location: string;
    onState: string;
    offState: string = "0";
    succes: boolean = null;
    completed: boolean = false;

    constructor (
        public ref: string, 
        public duration: number, 
        public controller: SocketController
    ) {
        this.location = ref.charAt(0);
        this.onState = ref.charAt(1);
    }

    set = (isOn: boolean) => {
        const newState = isOn ? this.onState : this.offState;
        const controlString = this.location + newState;
        this.controller.send(controlString);
    }

    start = async (outOfTime: () => void) => {
        // console.log(`Start`);
        // console.log(this);
        
        this.set(true);
        setTimeout(() => {
            outOfTime();
        }, this.duration);
    }

    /**
     * @param {string} givenRef a reference of a pressed command to compair to the action.
     * @returns {boolean} boolean thats true when the action was a succes.
     */
    try = (givenRef: string): boolean => {
        // console.log(`Try ${givenRef}`);
        // console.log(this);

        return !this.completed && this.ref == givenRef;
    }

    complete = (succes: boolean): Action => {
        // console.log(`Complete`);
        // console.log(this);

        this.set(false);
        this.completed = true;
        this.succes = succes;
        
        return this;
    }
}