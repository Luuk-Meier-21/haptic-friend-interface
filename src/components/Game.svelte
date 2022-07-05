<script lang="ts">
    import { Action, ActionController } from "../utilities/game/actions";
    import { SocketController } from "../utilities/arduino";
    import DebugControls from "./debug/Debug-controls.svelte";
    import Status from "./Status.actions.svelte";

    let wsState: string;
    let awaitingActions: Action[] = [];
    let finishedActions: Action[] = [];

	const sc = new SocketController('ws://localhost:3000');
	sc.onmessage = (e) => {
        // Matches control input from the controller (QUIT, RETRY, etc):
        const gameControl = e.data.match(/([A-Z]+)/g);
        if(gameControl) {
            if (gameControl[0] == "START") actions.start();
            if (gameControl[0] == "RETRY") console.log("RETRY not implemented");
            if (gameControl[0] == "PAUZE") console.log("PAUZE not implemented");
            if (gameControl[0] == "QUIT") console.log("QUIT not implemented");
        }
        // Matches game input from the controller (a1, a2, b1, etc):
        const gameInput = e.data.match(/^[a-zA-Z][0-9]/g);
        if(gameInput) actions.try(gameInput[0]);
	}
	sc.onevent = (s) => {
		wsState = s;
	}
	sc.connect();

    const actions = new ActionController(sc);
    actions.factory(a => [
        a.create("a1", 5000),
        a.create("b2", 5000),
        a.create("a1", 5000)
    ]);
    actions.onActionCompletion = (finished: Action[]) => {
        finishedActions = finished;
    }
    actions.onTimeUp = () => {
        console.log("Times UP")
    }
</script>  

<section>
    <Status state={wsState}/>
    <DebugControls sc={sc}/>
    <ul>
        {#each finishedActions as action}
            <li>{action.ref} | {action.succes}</li>
        {/each}
    </ul>
    <div>
        <button on:click={actions.start}>
            Start
        </button>
    </div>
</section>