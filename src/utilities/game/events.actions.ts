import type { SocketController } from "../arduino";
import type { ActionController } from "./actions";

export class EventHandler {
    

    constructor(
        public sc: SocketController,
        public ac: ActionController
    ) {

    }
}