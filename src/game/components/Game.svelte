<script lang="ts">
    import type { Action, ActionController } from "../actions";
    import type { SocketController } from "../../utilities/socket";
    import DebugControls from "../debug/Debug-controls.svelte";
    import Status from "./Status.actions.svelte";
    import { GameController } from "../game";

    let wsState: string;
    let finishedActions: Action[] = [];

    const game = new GameController()
        .setup(gc => {
            gc.onSocketSetup = (sc: SocketController) => {
                sc.onevent = (s) => {
                    wsState = s;
                    console.log(s)
                }
            }
            gc.onActionSetup = (ac: ActionController) => {
                ac.factory(a => [
                    a.create("a1", 5000),
                    a.create("b2", 5000),
                    a.create("a1", 5000)
                ]);

                ac.onActionCompletion = (finished: Action[]) => {
                    finishedActions = finished;
                }
                ac.onTimeUp = () => {
                    console.log("Times UP")
                }
            }
        })
        .init();
</script>  

<section>
    <Status state={wsState}/>
    <DebugControls sc={game.sc}/>
    <ul>
        {#each finishedActions as action}
            <li>{action.ref} | {action.succes}</li>
        {/each}
    </ul>
    <div>
        <button on:click={game.ac.start}>
            Start
        </button>
    </div>
</section>