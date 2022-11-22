<script>
    import FontAwesome from "svelte-fa";
    import {
        faCog
    } from "@fortawesome/free-solid-svg-icons/faCog";
</script>

<button class="settings-button">
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
