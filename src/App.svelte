
<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import Actions from "./components/game/actions.svelte";
	import { SocketController } from "./utilities/arduino";
	export let url = "";

	let state: string;

	const onMessage = (e) => {
		console.log(`A send: ${e.data}`);
	}
	const onClose = (e) => {
		console.log("WS closed");
	}
	const onOpen = (e) => {
		console.log("WS open");
	}
	const onEvent = (s) => {
		state = s;
	}

	const sc = new SocketController('ws://localhost:3000', {
		onmessage: onMessage,
		onopen: onOpen,
		onclose: onClose,
		onevent: onEvent
	})

</script>

<div>
	<h1>Haptic Node</h1>
		{#if state === "OPEN"}
			<p class="connection-open">Connection open</p>
		{:else if state === "CONNECTING"}
			<p>CONNECTING...</p>
		{:else}
			<p>Closed</p>
		{/if}
		
		<!-- disabled={sc.getStateString() != "OPEN"} -->
		<button class="button"
			on:mousedown={() => sc.send('1')} 
			on:mouseup={() => sc.send('0')}>
			Send A
		</button>
		<button class="button" 
			on:mousedown={() => sc.send('3')} 
			on:mouseup={() => sc.send('2')}>
			Send B
		</button>

		<Actions/>
</div>

<style lang="scss">
	@import 'static/global';


	.connection {
		&-open {
			color: var(--color-green);
		}
	}

</style>
