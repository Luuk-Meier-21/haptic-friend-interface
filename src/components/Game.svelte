<script lang="ts">
    import { ActionController } from "../utilities/actions";
    import { SocketController } from "../utilities/arduino";
    import DebugControls from "./debug/Debug-controls.svelte";
    import Status from "./Status.actions.svelte";

    let wsState: string;
	const sc = new SocketController('ws://localhost:3000');
	sc.onmessage = (e) => {
        console.log(e.data)
        // Match all a1, a2, b1, etc formats:
        // const controlMsg = e.data.match(/^[a-zA-Z][0-9]/g);
        // if(controlMsg) {
        //     console.log(controlMsg[0])
        //     actions.try(controlMsg[0]);
        // }

        // if (e.data.length < 3) {
        //     const command = e.data.substring(0, 1);

        //     console.log(`try ${command}`);
        //     actions.try(e.data);
        // } else if (e.data == "RETRY"){
        //     console.log("RETRY given")
        // }
        // console.log(e.data)
	}
	sc.onclose = (e) => {
		console.log("WS closed");
	}
	sc.onopen = (e) => {
		console.log("WS open");
	}
	sc.onevent = (s) => {
		wsState = s;
	}
	sc.connect();

    const actions = new ActionController(sc);
    actions.factory(a => [
        a.create("a1", 5000),
        a.create("a2", 5000),
        a.create("a1", 5000)
    ]);
    actions.onActionCompletion = (succes: boolean) => {
        
    }
    actions.onTimeUp = () => {
        console.log("Times UP")
    }
</script>  

<section>
    <Status state={wsState}/>
    <DebugControls sc={sc}/>

    <div>
        <button on:click={actions.start}>
            Start
        </button>
    </div>
</section>