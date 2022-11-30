<script lang="ts">
    import * as settings from "$lib/settings/settings";
    import SettingsButton from "$lib/action/settings/SettingsButton.svelte";
    import {
        onMount
    } from "svelte";
    import {
        performCopyLink,
        performCopy,
        performDuplicate,
        performRaw,
        performSave,
        performNew
    } from "$lib/action/actions";
    import * as shortcuts from "$lib/action/shortcuts";

    onMount(() => {
        const container = document.querySelector(".action-bar");
		if (!container) return;
		settings.setupFancyLights(container as HTMLElement);
        settings.setupActionBarPos(container as HTMLElement);

        shortcuts.initialize();
    });

    function showTooltip(id: string) {
        const tooltip = document.querySelector(".tooltip");
        if (!tooltip) return;

        const action = document.querySelector(`button[data-action="${id}"]`);
        if (!action) return;

        const shortcut = action.getAttribute("data-shortcut");
        if (!shortcut) return;

        const theTooltip = tooltip as HTMLElement;
        theTooltip.style.display = "block";
        theTooltip.textContent = shortcut;

        const rect = action.getBoundingClientRect();
        // center the tooltip on the action button, factor out the margin
        theTooltip.style.left = `${rect.left + rect.width / 2 - theTooltip.offsetWidth / 2 - 10}px`;

        if (settings.getSettings().actionbarPosition === "top") {
            theTooltip.style.top = `${rect.top + rect.height}px`;
        } else {
            theTooltip.style.top = `${rect.top - theTooltip.offsetHeight - 20}px`;
        }
    }

    function hideTooltip() {
        const tooltip = document.querySelector(".tooltip");
        if (!tooltip) return;

        const theTooltip = tooltip as HTMLElement;
        theTooltip.style.display = "none";
    }
</script>

<div class="tooltip" />
<div class="action-bar">
    <div class="left">
        <h1 class="brand-name"><a href="/"><span>Deft</span>bin</a></h1>
        <SettingsButton />
    </div>
    <div class="right">
        <button
            data-action="copy-link"
            data-shortcut="CTRL + SHIFT + L"
            on:click={() => performCopyLink("copy-link")}
            on:mouseenter={() => showTooltip("copy-link")}
            on:mouseleave={() => hideTooltip()}
        >Copy Link</button>
        <button
            data-action="copy"
            data-shortcut="CTRL + SHIFT + C"
            on:click={() => performCopy("copy")}
            on:mouseenter={() => showTooltip("copy")}
            on:mouseleave={() => hideTooltip()}
        >Copy</button>
        <button
            data-action="duplicate"
            data-shortcut="CTRL + SHIFT + D"
            on:click={() => performDuplicate("duplicate")}
            on:mouseenter={() => showTooltip("duplicate")}
            on:mouseleave={() => hideTooltip()}
        >Duplicate</button>
        <button
            data-action="raw"
            data-shortcut="CTRL + SHIFT + Y"
            on:click={() => performRaw("raw")}
            on:mouseenter={() => showTooltip("raw")}
            on:mouseleave={() => hideTooltip()}
        >Raw</button>
        <button
            data-action="save"
            data-shortcut="CTRL + SHIFT + S"
            on:click={() => performSave("save")}
            on:mouseenter={() => showTooltip("save")}
            on:mouseleave={() => hideTooltip()}
            class="enabled"
        >Save</button>
        <button
            data-action="new"
            data-shortcut="CTRL + SHIFT + N"
            on:click={() => performNew("new")}
            on:mouseenter={() => showTooltip("new")}
            on:mouseleave={() => hideTooltip()}
            class="enabled"
        >New</button>
    </div>
</div>

<style>
    .tooltip {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
        margin: 10px;
        background-color: rgba(85, 85, 85, 0.35);
        font-family: "Outfit", sans-serif;
        font-size: 15px;
        z-index: 100;
        user-select: none;
        border-radius: 10px;
    }

    .action-bar {
        position: fixed;

        width: calc(100% - var(--action-bar-spacing) * 2);
        max-height: var(--action-bar-height);

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        user-select: none;

        padding: var(--action-bar-spacing) calc(var(--action-bar-spacing) * 2) var(--action-bar-spacing) calc(var(--action-bar-spacing) * 2);
        margin: var(--action-bar-spacing);
        border-radius: 25px;
        background-color: var(--background-2);
    }

    :global(.action-bar[action-bar-pos="top"]) {
        top: 0;
        left: 0;
    }

    :global(.action-bar[action-bar-pos="bottom"]) {
        bottom: 0;
        left: 0;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .brand-name {
        margin: 0;
        margin-left: 10px;
        margin-right: 20px;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .brand-name * {
        text-decoration: none;
        font-family: inherit;
        font-size: 25px;
        font-weight: 500;
    }

    .brand-name span {
        font-weight: 700;
    }

    .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        width: fit-content;
    }

    @media (max-width: 850px) {
        :global(html) {
            --action-bar-height: 100px;
        }

        .action-bar {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .left {
            margin-bottom: 5px;
        }

        .right {
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    @media (max-width: 695px) {
        :global(html) {
            --action-bar-height: 150px;
        }

        .right button {
            margin-top: 10px;
        }
    }

    @media (max-width: 420px) {
        :global(html) {
            --action-bar-height: 200px;
        }
    }

    .right button {
        display: none;
        min-width: 80px;
        margin-left: 10px;
        padding: 5px 15px 5px 15px;
        border-radius: 10px;
        font-size: 15px;
        text-align: center;
        background-color: var(--background-3);
        outline: none;
        border: none;
    }

    .right button.enabled {
        display: block;
        background-color: var(--background);
    }

    .right button.enabled:hover {
        background-color: var(--background-3);
        cursor: pointer;
    }
</style>
