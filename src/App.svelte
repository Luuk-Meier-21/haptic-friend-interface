
<script lang="ts">
	import Actions from "./components/Game.svelte";
	

</script>

<div>
	<h1>Haptic Node</h1>
		<!-- disabled={sc.getStateString() != "OPEN"} -->
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
