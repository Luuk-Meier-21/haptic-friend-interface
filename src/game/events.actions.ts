import type { SocketController } from "../utilities/socket";
import type { ActionController } from "./actions";

export class EventHandler {
    

    constructor(
        public sc: SocketController,
        public ac: ActionController
    ) {

    }
}