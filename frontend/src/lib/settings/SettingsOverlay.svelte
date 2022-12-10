<script lang="ts">
    import * as settings from "$lib/settings";

    import CloseIcon from "$lib/icons/CloseIcon.svelte";

    import Toggle from "$lib/settings/Toggle.svelte";
    import Dropdown from "$lib/settings/Dropdown.svelte";
    import NumberInput from "$lib/settings/NumberInput.svelte";

    let theme = settings.getSettings().theme;
    let lineNumbers = settings.getSettings().lineNumbers;
    let lineWrapping = settings.getSettings().lineWrapping;
    let tabSize = settings.getSettings().tabSize;
    let tabType = settings.getSettings().tabType;
</script>

<div class="full-container">
    <div class="background-blur" />
    <div class="sidebar">
        <div class="sidebar-header">
            <h1 class="sidebar-header-title">Settings</h1>
            <button class="sidebar-header-close" on:click={() => {
                const container = document.querySelector(".full-container");
                container?.classList.add("close");
                container?.addEventListener("animationend", () => {
                    if (!container?.classList.contains("close")) return;

                    container?.classList.remove("close");
                    // @ts-ignore
                    container.style.display = "none";
                });
            }}>
                <CloseIcon />
            </button>
        </div>

        <div class="sidebar-content">
            <ol class="settings-list">
                <li class="settings-list-item">
                    <h2 class="settings-list-item-title">Theme</h2>
                    <Dropdown
                        class="settings-list-item-dropdown"
                        options={[{
                            value: "light",
                            label: "Light"
                        }, {
                            value: "dark",
                            label: "Dark"
                        }, {
                            value: "synthwave84",
                            label: "Synthwave 84"
                        }, {
                            value: "onedarkpro",
                            label: "One Dark Pro"
                        }, {
                            value: "nordpolarnight",
                            label: "Nord Polar Night"
                        }, {
                            value: "nordsnowstorm",
                            label: "Nord Snow Storm"
                        }]}
                        value={settings.getSettings().theme}
                        on:change={(e) => {
                            theme = e.detail;
                        }}
                    />
                </li>
                <li class="settings-list-item">
                    <h2 class="settings-list-item-title">Line Numbers</h2>
                    <Toggle
                        checked={settings.getSettings().lineNumbers}
                        on:change={(e) => {
                            lineNumbers = e.detail;
                        }}
                    />
                </li>
                <li class="settings-list-item">
                    <h2 class="settings-list-item-title">Line Wrapping</h2>
                    <Toggle
                        checked={settings.getSettings().lineWrapping}
                        on:change={(e) => {
                            lineWrapping = e.detail;
                        }}
                    />
                </li>
                <li class="settings-list-item">
                    <h2 class="settings-list-item-title">Tab Size</h2>
                    <NumberInput
                        class="settings-list-item-number-input"
                        value={settings.getSettings().tabSize}
                        min={0}
                        max={8}
                        on:change={(e) => {
                            tabSize = e.detail;
                        }}
                    />
                </li>
                <li class="settings-list-item">
                    <h2 class="settings-list-item-title">Tab Type</h2>
                    <Dropdown
                        class="settings-list-item-dropdown"
                        options={[{
                            value: "spaces",
                            label: "Spaces"
                        }, {
                            value: "tabs",
                            label: "Tabs"
                        }]}
                        value={settings.getSettings().tabType}
                        on:change={(e) => {
                            tabType = e.detail;
                        }}
                    />
                </li>
        </div>

        <div class="sidebar-footer">
            <button class="sidebar-footer-button" on:click={() => {
                settings.setTheme(theme);
                settings.setLineNumbers(lineNumbers);
                settings.setLineWrapping(lineWrapping);
                settings.setTabSize(tabSize);
                settings.setTabType(tabType);
                window.location.reload();
            }}>Save</button>
        </div>
    </div>
</div>

<style>
    .full-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
    }

    .background-blur {
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.25);
        animation: fadeIn 0.5s ease-in;
    }

    .full-container:global(.close) .background-blur {
        animation: fadeOut 0.5s ease-out;
    }

    .sidebar {
        position: absolute;
        top: 0;
        left: 0;
        width: 350px;
        height: 100%;
        padding: 25px;
        background: var(--background-2);
        color: var(--text);
        display: flex;
        flex-direction: column;
        animation: slideIn 0.5s ease-out;
    }

    /* when closing the sidebar, the animation is reversed */
    .full-container:global(.close) .sidebar {
        animation: slideOut 0.5s ease-in;
    }

    .sidebar-header {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 25px;
    }

    .sidebar-header-title {
        font-size: 35px;
        font-weight: 700;
    }

    .sidebar-header-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        width: 32px;
        height: 32px;
        color: var(--text);
    }

    .sidebar-header::after {
        content: "";
        position: absolute;
        display: block;
        bottom: 0;
        width: 100%;
        height: 2.5px;
        background: var(--background-1);
        transform: translateY(10px);
    }

    .sidebar-content {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        height: 100%;
    }

    .settings-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .settings-list-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    :global(.settings-list-item-dropdown) {
        width: 150px;
        max-width: 175px;
    }

    :global(.settings-list-item-number-input) {
        width: 150px;
        max-width: 175px;
    }

    .settings-list-item-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .sidebar-footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 25px;
    }

    .sidebar-footer-button {
        background: var(--background-1);
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        color: var(--text);
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes slideIn {
        0% {
            transform: translateX(-100%);
        }

        100% {
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-100%);
        }
    }
</style>
