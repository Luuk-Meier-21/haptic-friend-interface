<script lang="ts">
import { ActionController } from "./actions";

    const actions = new ActionController();
    actions.factory(a => [
        a.create("a1", 4000),
        a.create("a2", 5000),
        a.create("b1", 2000)
    ]);
    actions.onActionCompletion = (succes: boolean) => {
        
    }
    actions.onTimeUp = () => {
        console.log("tast")
    }
</script>  

<section>
    <button on:click={actions.start}>
        Starta
    </button>
</section>