<script lang="ts">
    import type { SocketController } from "../../utilities/socket";

    export let sc: SocketController;
</script>

<section class="controller">
    <div class="controller__node node--a">
        <h3>Node A</h3>
        <button class="button"
            on:mousedown={() => sc.send('a1')} 
            on:mouseup={() => sc.send('a0')}>
            Send A normal
        </button>
        <button class="button"
            on:mousedown={() => sc.send('a2')} 
            on:mouseup={() => sc.send('a0')}>
            Send A bright
        </button>
    </div>
    <div class="controller__node node--a">
        <h3>Node B</h3>
        <button class="button"
            on:mousedown={() => sc.send('b1')} 
            on:mouseup={() => sc.send('b0')}>
            Send B normal
        </button>
        <button class="button" 
            on:mousedown={() => sc.send('b2')} 
            on:mouseup={() => sc.send('b0')}>
            Send B bright
        </button>
    </div>
</section>

<style lang="scss">
    .controller {
        display: grid;
        grid-template-columns: max-content max-content;
        justify-content: center;
        padding: 1rem;

        &__node {
            margin: 0 .5rem;
            padding: 1rem;
            background-color: #ededed;
            border-radius: .25rem;

            display: flex;
            flex-direction: column;

            & .button {
                
                margin-bottom: .5rem;
            }
        }
    }
</style>