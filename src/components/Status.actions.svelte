<script lang="ts">
    export let state: string;
</script>

{#if state === "OPEN"}
    <p class="connection-open">Connection open</p>
{:else if state === "CONNECTING"}
    <p>CONNECTING...</p>
{:else}
    <p>Closed</p>
{/if}