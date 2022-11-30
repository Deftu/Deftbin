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
        <!-- GitHub Icon -->
        <a class="github-icon" href="https://github.com/Deftu/Deftbin" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        </a>
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
        margin-right: 10px;
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

    .github-icon {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        fill: var(--text);
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
