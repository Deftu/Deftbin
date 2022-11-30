<script lang="ts">
    import * as settings from "$lib/settings/settings";
    import {
        onMount
    } from "svelte";
    let shown = false;

    export function toggle(target: HTMLElement | null) {
        const container = document.querySelector(".modal-container");
        if (!container) return;
        const modalContainer = container as HTMLElement;

        shown = !shown;
        modalContainer.style.visibility = shown ? "visible" : "hidden";
        modalContainer.style.opacity = shown ? "1" : "0";
        modalContainer.style.pointerEvents = shown ? "all" : "none";
        modalContainer.style.top = shown ? "0" : "-100%";
    }

    export function isShown() {
        return shown;
    }

    // function which coerces number input's value to its min/max values
    function coerceNumberInputValue(input: HTMLInputElement) {
        const min = input.min ? parseInt(input.min) : 0;
        const max = input.max ? parseInt(input.max) : 100;
        const value = parseInt(input.value);
        if (value < min) {
            input.value = min.toString();
        } else if (value > max) {
            input.value = max.toString();
        }
    }

    function save() {
        const actionBarPos = document.querySelector("#action-bar-pos") as HTMLInputElement;
        if (actionBarPos) {
            settings.setActionbarPosition(settings.getActionBarPosFromValue(actionBarPos.value));
        }

        const theme = document.querySelector("#theme") as HTMLInputElement;
        if (theme) {
            settings.setTheme(theme.value);
        }

        const lineNums = document.querySelector("#line-nums") as HTMLInputElement;
        if (lineNums) {
            settings.setLineNumbers(lineNums.options[lineNums.selectedIndex].value === "true");
        }

        const lineWrap = document.querySelector("#line-wrap") as HTMLInputElement;
        if (lineWrap) {
            settings.setLineWrapping(lineWrap.options[lineWrap.selectedIndex].value === "true");
        }

        const tabSize = document.querySelector("#tab-size") as HTMLInputElement;
        if (tabSize) {
            coerceNumberInputValue(tabSize);
            settings.setTabSize(parseInt(tabSize.value));
        }

        const tabType = document.querySelector("#tab-type") as HTMLInputElement;
        if (tabType) {
            settings.setTabType(settings.getTabTypeFromValue(tabType.value));
        }

        const actionShortcuts = document.querySelector("#action-shortcuts") as HTMLInputElement;
        if (actionShortcuts) {
            settings.setActionShortcuts(actionShortcuts.options[actionShortcuts.selectedIndex].value === "true");
        }

        const fancyLights = document.querySelector("#fancy-lights") as HTMLInputElement;
        if (fancyLights) {
            settings.setFancyLights(fancyLights.options[fancyLights.selectedIndex].value === "true");
        }

        // reload the page to apply the changes
        window.location.reload();
    }

    onMount(() => {
        const container = document.querySelector(".modal-container");
        if (!container) return;
        const modalContainer = container as HTMLElement;

        // close the modal when the user clicks outside of it
        modalContainer.addEventListener("click", (e) => {
            if (e.target === modalContainer) {
                toggle(null);
            }
        });
    });
</script>

<div class="modal-container">
    <div class="settings-menu">
        <div class="settings-menu-header">
            <h2>Settings</h2>
        </div>
        <div class="settings-menu-content">
            <ol>
                <li>
                    <label for="action-bar-pos">Action Bar Position</label>
                    <select id="action-bar-pos">
                        {#if settings.getSettings().actionbarPosition == settings.ActionBarPos.Top}
                        <option value="top" selected>Top</option>
                        {:else}
                        <option value="top">Top</option>
                        {/if}
                        {#if settings.getSettings().actionbarPosition == settings.ActionBarPos.Bottom}
                        <option value="bottom" selected>Bottom</option>
                        {:else}
                        <option value="bottom">Bottom</option>
                        {/if}
                    </select>
                </li>
                <li>
                    <label for="theme">Theme</label>
                    <select id="theme">
                        {#each Object.keys(settings.Theme) as theme}
                            {#if settings.getThemeFromValue(settings.getSettings().theme) === theme}
                                <option value={settings.getThemeFromName(theme)} selected>{theme}</option>
                            {:else}
                                <option value={settings.getThemeFromName(theme)}>{theme}</option>
                            {/if}
                        {/each}
                    </select>
                <li>
                    <label for="line-nums">Line Numbers</label> 
                    <select id="line-nums">
                        {#if settings.getSettings().lineNumbers}
                        <option value="true" selected>Enabled</option>
                        {:else}
                        <option value="true">Enabled</option>
                        {/if}
                        {#if !settings.getSettings().lineNumbers}
                        <option value="false" selected>Disabled</option>
                        {:else}
                        <option value="false">Disabled</option>
                        {/if}
                    </select>
                </li>
                <li>
                    <label for="line-wrap">Line Wrap</label>
                    <select id="line-wrap">
                        {#if settings.getSettings().lineWrapping}
                        <option value="true" selected>Enabled</option>
                        {:else}
                        <option value="true">Enabled</option>
                        {/if}
                        {#if !settings.getSettings().lineWrapping}
                        <option value="false" selected>Disabled</option>
                        {:else}
                        <option value="false">Disabled</option>
                        {/if}
                    </select>
                </li>
                <li>
                    <label for="tab-size">Tab Size</label>
                    <div class="number-input">
                        <button data-action="increment" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">-</button>
                        <input type="number" on:input={(e) => coerceNumberInputValue(e.target)} id="tab-size" min="1" max="8" value={settings.getSettings().tabSize} />
                        <button data-action="decrement" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">+</button>
                    </div>
                </li>
                <li>
                    <label for="tab-type">Tab Type</label>
                    <select id="tab-type">
                        {#each Object.keys(settings.TabType) as tabType}
                            {#if settings.getTabTypeFromValue(settings.getSettings().tabType) === tabType}
                                <option value={tabType} selected>{tabType}</option>
                            {:else}
                                <option value={tabType}>{tabType}</option>
                            {/if}
                        {/each}
                    </select>
                </li>
                <li>
                    <label for="action-shortcuts">Action Shortcuts</label>
                    <select id="action-shortcuts">
                        {#if settings.getSettings().actionShortcuts}
                        <option value="true" selected>Enabled</option>
                        {:else}
                        <option value="true">Enabled</option>
                        {/if}
                        {#if !settings.getSettings().actionShortcuts}
                        <option value="false" selected>Disabled</option>
                        {:else}
                        <option value="false">Disabled</option>
                        {/if}
                    </select>
                </li>
                <li>
                    <label for="fancy-lights">Fancy Lights</label>
                    <select id="fancy-lights">
                        {#if settings.getSettings().fancyLights}
                        <option value="true" selected>Enabled</option>
                        {:else}
                        <option value="true">Enabled</option>
                        {/if}
                        {#if !settings.getSettings().fancyLights}
                        <option value="false" selected>Disabled</option>
                        {:else}
                        <option value="false">Disabled</option>
                        {/if}
                    </select>
                </li>
            </ol>
        </div>
        <div class="settings-menu-footer">
            <button on:click={save}>Save</button>
            <button on:click={() => toggle(null)}>Cancel</button>
        </div>
    </div>
</div>

<style>
    .modal-container {
        position: absolute;
        top: 0;
        left: 0;
        visibility: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .settings-menu {
        position: relative;
        width: 100%;
        max-width: 500px;
        background-color: var(--background);
        border-radius: 15px;
        padding: 20px;
        margin: 0 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .settings-menu-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .settings-menu button {
        padding: 5px;
        border-radius: 10px;
        font-size: 15px;
        text-align: center;
        background-color: var(--background-3);
        outline: none;
        border: none;
    }

    .settings-menu button:hover {
        background-color: var(--background-2);
    }

    .settings-menu-header h2 {
        font-size: 1.5rem;
        font-weight: 500;
        user-select: none;
    }

    .settings-menu-header button > svg {
        width: 20px;
        height: 20px;
    }

    .settings-menu-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .settings-menu-content ol {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .settings-menu-content li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--background-2);
    }

    .settings-menu-content li:last-child {
        border-bottom: none;
    }

    .settings-menu-content li > label {
        font-size: 1rem;
        font-weight: 500;
        user-select: none;
    }

    .settings-menu-content li select {
        padding: 5px;
        border-radius: 5px;
        font-size: 15px;
        background-color: var(--background-3);
        outline: none;
        border: none;
        max-width: 100px;
    }

    .settings-menu-content li select:hover {
        background-color: var(--background-2);
    }

    .settings-menu-content li input {
        padding: 5px;
        border-radius: 5px;
        font-size: 15px;
        max-width: 100px;
        background-color: var(--background-3);
        outline: none;
        border: none;
    }

    .settings-menu-content li input:hover {
        background-color: var(--background-2);
    }

    .settings-menu-content li input[type="number"] {
        appearance: textfield;
    }

    .settings-menu-content li input[type="number"]::-webkit-inner-spin-button,
    .settings-menu-content li input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .settings-menu-content li .number-input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .settings-menu-content li .number-input:hover * {
        background-color: var(--background-2);
    }

    .settings-menu-content li .number-input input[type="number"] {
        border-radius: 0;
    }

    .settings-menu-content li .number-input button {
        border-radius: 0;
        width: 25px;
    }

    .settings-menu-content li .number-input button:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .settings-menu-content li .number-input button:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .settings-menu-footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
    }

    .settings-menu-footer button {
        outline: none;
        border: none;
        margin-left: 10px;
        padding: 5px 10px;
    }
</style>
