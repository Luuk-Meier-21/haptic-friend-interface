
<script lang="ts">
  import DebugControls from "./game/debug/Debug-controls.svelte";
  import { SocketController } from "./utilities/socket";

  const sc = new SocketController('ws://localhost:3000')
		.setup(sc => {
			sc.onevent = e => {
				socketState = e;
			}
			sc.onmessage = e => {
				// Matches game input from the controller (a1, a2, b1, etc):
				const input = e.data.match(/^[a-zA-Z][0-9]/g);
				if(input) {
					const inputValue = input[0];
					switch (inputValue) {
						case "a1":
							sc.send("a1")
							break;
						case "a2":
							sc.send("")
							break;
						default:
							sc.send("test value default")
							break;
					}
				}
			}
		})
		.connect();

	$: socketState = "UNKNOWN";
</script>

<div>
	<h1>Haptic Node</h1>
	<p>{ socketState }</p>
	<DebugControls sc={sc}/>
</div>

<style lang="scss">
	@import 'static/global';

	.connection {
		&-open {
			color: var(--color-green);
		}
	}

</style>
