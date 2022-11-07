import { UtilityController } from "../utilities/controller";
import { SocketController } from "../utilities/socket";
import { Action, ActionController } from "./actions";

export class GameController extends UtilityController{
    sc: SocketController;
    ac: ActionController;

    onSocketSetup: (sc: SocketController) => void = () => {};
    onActionSetup: (ac: ActionController) => void = () => {};

    constructor() { super(); }

    init(): this {
        this.sc = new SocketController('ws://localhost:3000')
            .setup(this.setupSocket)
            .setup(this.onSocketSetup)
            .connect();
        this.ac = new ActionController(this.sc)
            .setup(this.onActionSetup)
            .setup(this.setupActions)
        return this;
    }

    setupSocket = (sc: SocketController) => {
        sc.onmessage = (e) => {
            // Matches control input from the controller (QUIT, RETRY, etc):
            const gameControl = e.data.match(/([A-Z]+)/g);
            if(gameControl) {
                if (gameControl[0] == "START") this.ac.start();
                if (gameControl[0] == "RETRY") console.log("RETRY not implemented");
                if (gameControl[0] == "PAUZE") console.log("PAUZE not implemented");
                if (gameControl[0] == "QUIT") console.log("QUIT not implemented");
            }
            // Matches game input from the controller (a1, a2, b1, etc):
            const gameInput = e.data.match(/^[a-zA-Z][0-9]/g);
            if(gameInput) this.ac.try(gameInput[0]);
        }
    }

    setupActions = (ac: ActionController) => {
        
    }
}