
export interface SocketHandlers {
    onmessage?: (this: CWebsocket, e: MessageEvent<any>) => void;
    onopen?: (this: CWebsocket, e: Event) => void;
    onclose?: (this: CWebsocket, e: CloseEvent) => void;
    onerror?: (this: CWebsocket, e: Event) => void;
    onevent?: (this: CWebsocket, s: string) => void;
}

export interface CWebsocket extends WebSocket {
    onevent: (this: WebSocket, s: string) => void;
}

// export class CWebsocket extends WebSocket {
//     onevent: (this: CWebsocket, s: string) => void = null;

//     constructor() {
        
//     }
// }

export class SocketController {
    ws: CWebsocket;
    

    constructor(
        public url: string, 
        handler: SocketHandlers
    ) {
        this.connect();
        this.ws.onmessage = this.eventWrapper(handler.onmessage)
        this.ws.onopen = this.eventWrapper(handler.onopen);
        this.ws.onclose = this.eventWrapper(handler.onclose);
        this.ws.onerror = this.eventWrapper(handler.onerror);
        this.ws.onevent = handler.onevent;
    }

    // NLP: first practical use i found for a higher order function:
    private eventWrapper = (eventFunc) => (e) => {
        if (this.ws.onevent) this.ws.onevent(this.getStateString());
        eventFunc(e);
    }
    public getState = (): number => this.ws.readyState;
    public getStateString = (): string => {
        const state = this.getState();
        switch (state) {
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
    }

    public send = (message) => {
        console.log(message)
        this.ws.send(message);
    }
}