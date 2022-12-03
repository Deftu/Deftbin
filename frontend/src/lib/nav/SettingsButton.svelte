<script lang="ts">
    import {
        browser
    } from "$app/environment";
    import CogIcon from "$lib/icons/CogIcon.svelte";
    import {
        onDestroy
    } from "svelte";
</script>

<button class="settings-button" on:click={(event) => {
}}>
    <CogIcon class="settings-icon" />
</button>

<style>
    .settings-button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 38px;
        height: 38px;
    }

    :global(.settings-icon) {
        width: 28px;
        height: 28px;
        fill: var(--text);
    }
</style>
