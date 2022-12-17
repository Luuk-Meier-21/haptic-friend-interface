import { UtilityController } from "./controller";

type Handler<T> = (this: CWebsocket, e: T) => void;

/**
 * Custom websocket class with added methods
 */
export interface CWebsocket extends WebSocket {
    onevent: Handler<string>;
}

export class SocketController extends UtilityController {
    ws: CWebsocket;

    onmessage: Handler<MessageEvent<any>> = () => {};
    onopen: Handler<Event> = () => {};
    onclose: Handler<CloseEvent> = () => {};
    onerror: Handler<Event> = () => {};
    onevent: Handler<string> = () => {};
    onsend: Handler<string> = () => {};

    constructor(public url: string) {
        super();
    }
    
    public getState = (): number => this.ws.readyState;
    public getStateString = (): string => {
        switch (this.getState()) {
            case 0:
                return "CONNECTING"
                break;
            case 1:
                return "OPEN"
                break;
            case 2:
                return "CLOSING"
                break;
            case 3:
                return "CLOSED"
                break;     
        }
    }

    public connect = () => {
        this.ws = new WebSocket(this.url) as CWebsocket; 
        this.setHandlers();
        return this;
    }

    public setHandlers = () => {
        this.ws.onmessage = this.event(this.onmessage)
        this.ws.onopen = this.event(this.onopen);
        this.ws.onclose = this.event(this.onclose);
        this.ws.onerror = this.event(this.onerror);
        this.ws.onevent = this.onevent;
    }

    // NLP: first practical use i found for a higher order function:
    private event = (eventFunc) => (e) => {
        if (this.ws.onevent) this.ws.onevent(this.getStateString());
        eventFunc(e);
    }

    public send = (message) => {
        // this.onsend(message);
        console.log(message)
        this.ws.send(message);
    }

    /**
     * Alias of super.setup function.
     * 
     * @param setupFn 
     * @returns this object
     */
    public eventSetup = (setupFn: (controller: this) => void) => {
        setupFn(this);
        return this;
    }
}