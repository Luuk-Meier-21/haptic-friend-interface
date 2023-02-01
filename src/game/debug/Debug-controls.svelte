<script lang="ts">
    import type { SocketController } from "../../utilities/socket";

    export let sc: SocketController;
    let types = [
		{ id: 'i', text: `Instruction`, format: 'i<node><state>'},
		{ id: 's', text: `Setter`, format: 's<node><type><character>'},
		{ id: 'g', text: `Getter`, format: 'g<type><node?>'}
	];
    let nodes = [
        'a'
    ]
    let selectedType;
    let message = '';

    function handleSubmit() {
		sc.send(selectedType.id + message);
	}
</script>

<section class="controller">
    <div class="controller__node node--a">
        <h3>Node A</h3>
        <button class="button"
            on:mousedown={() => sc.send('ia1')} 
            on:mouseup={() => sc.send('ia0')}>
            Instruction node a
        </button>
        <button class="button"
            on:mousedown={() => sc.send('ia2')} 
            on:mouseup={() => sc.send('ia0')}>
            Bright instruction node a
        </button>
        <form on:submit|preventDefault={handleSubmit}>
            {#if  selectedType }
                <p>Format: { selectedType.format }</p>
            {/if}
            <select bind:value={selectedType} on:change="{() => message = ''}">
                {#each types as type}
                    <option value={type}>
                        {type.text}
                    </option>
                {/each}
            </select>
        
            <input bind:value={message}>
        
            <button disabled={!message} type=submit>
                Submit
            </button>
        </form>
        <button class="button"
            on:mousedown={() => sc.send('gl')}>
            Get listeners
        </button>
        <button class="button"
            on:mousedown={() => sc.send('gn')}>
            Get nodes
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