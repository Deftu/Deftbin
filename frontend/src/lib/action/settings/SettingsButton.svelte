<script lang="ts">
    import {
        browser
    } from "$app/environment";
    import {
        onDestroy
    } from "svelte";

    import FontAwesome from "svelte-fa";
    import {
        faCog
    } from "@fortawesome/free-solid-svg-icons/faCog";
    import SettingsModal from "./SettingsModal.svelte";

    const settingsModal = browser ? new SettingsModal({
        target: document.body
    }) : null;

    function toggleMenu(target: HTMLElement) {
        if (settingsModal) {
            settingsModal.toggle(target);
        }
    }

    onDestroy(() => {
        if (settingsModal) {
            settingsModal.$destroy();
        }
    });
</script>

<button class="settings-button" on:click={(event) => {
    toggleMenu(event.target);
}}>
    <FontAwesome
        icon={faCog}
        size="1.5x"
    />
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
    }
</style>
