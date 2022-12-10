<script>
    import {
        createEventDispatcher
    } from "svelte";
    const dispatch = createEventDispatcher();

    export let width = "60px";
    export let height = "30px";
    export let checked = false;
</script>

<label class="switch" style="width: {width}; height: {height};">
    {#if checked}
    <input type="checkbox" checked on:change={() => {
        checked = !checked;
        dispatch("change", checked);
    }}>
    {:else}
    <input type="checkbox" on:change={() => {
        checked = !checked;
        dispatch("change", checked);
    }}>
    {/if}
    <span class="slider"></span>
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--state-off);
        transition: .25s;
        border-radius: 10px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 80%;
        width: 40%;
        left: 10%;
        bottom: 10%;
        background-color: var(--text);
        transition: .4s;
        border-radius: 7.5px;
    }

    input:checked + .slider {
        background-color: var(--state-on);
    }

    input:checked + .slider:before {
        transform: translateX(100%);
    }
</style>
