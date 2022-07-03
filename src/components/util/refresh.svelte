<script lang="ts" context="module">
    export const refresh = () => window.location.reload();
</script>

<script lang="ts">
    export let message = "Sorry page not found."
</script>

<p>{message}</p>
<button on:click={refresh}>
    Refresh
</button>