import {
    browser
} from "$app/environment";
import SettingsButton from "$lib/settings/SettingsButton.svelte";
import SettingsOverlay from "$lib/settings/SettingsOverlay.svelte";

export enum ActionBarPos {
    Top = "top",
    Bottom = "bottom"
}

export function getActionBarPosFromValue(value: string): ActionBarPos {
    if (value === "top") return ActionBarPos.Top;
    return ActionBarPos.Bottom;
}

export enum Theme {
    Light = "light",
    Dark = "dark",
    Synthwave84 = "synthwave84",
    OneDarkPro = "onedarkpro",
    NordPolarNight = "nordpolarnight",
    NordSnowStorm = "nordsnowstorm",
}

export function getThemeFromValue(value: string): string {
    if (value === "light") return "Light";
    if (value === "dark") return "Dark";
    if (value === "synthwave84") return "Synthwave84";
    if (value === "onedarkpro") return "OneDarkPro";
    if (value === "nordpolarnight") return "NordPolarNight";
    if (value === "nordsnowstorm") return "NordSnowStorm";
    return "Dark";
}

export function getThemeFromName(name: string): string {
    if (name === "Light") return "light";
    if (name === "Dark") return "dark";
    if (name === "Synthwave84") return "synthwave84";
    if (name === "OneDarkPro") return "onedarkpro";
    if (name === "NordPolarNight") return "nordpolarnight";
    if (name === "NordSnowStorm") return "nordsnowstorm";
    return "dark";
}

export enum TabType {
    Spaces = "spaces",
    Tabs = "tabs"
}

export function getTabTypeFromValue(value: string): TabType {
    if (value === "tabs") return TabType.Tabs;
    return TabType.Spaces;
}

export interface Settings {
    theme: Theme;
    lineNumbers: boolean;
    lineWrapping: boolean;
    tabSize: number;
    tabType: TabType;
}

export const defaultSettings: Settings = {
    theme: Theme.Dark,
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 4,
    tabType: TabType.Tabs
};

export function toggleElement() {
    const container = document.querySelector(".full-container");
    if (container) {
        // @ts-ignore
        if (container.style.display === "none" || !container.style.display) {
            // @ts-ignore
            container.style.display = "block";
        } else {
            // @ts-ignore
            container.style.display = "none";
        }
    }
}

export function loadSettings(): Settings {
    if (!browser) return defaultSettings;

    const settings = localStorage.getItem("settings");
    if (settings) {
        return JSON.parse(settings);
    } else {
        saveSettings(defaultSettings);
        return defaultSettings;
    }
}

export function getSettings(): Settings {
    if (!browser) return defaultSettings;

    const settings = localStorage.getItem("settings");
    if (!settings) return defaultSettings;
    return JSON.parse(settings);
}

export function saveSettings(settings: Settings) {
    if (!browser) return;

    localStorage.setItem("settings", JSON.stringify(settings));
}

export function setTheme(theme: Theme) {
    if (!browser) return;

    const settings = getSettings();
    settings.theme = theme;
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function setLineNumbers(lineNumbers: boolean) {
    if (!browser) return;

    const settings = getSettings();
    settings.lineNumbers = lineNumbers;
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function setLineWrapping(lineWrapping: boolean) {
    if (!browser) return;

    const settings = getSettings();
    settings.lineWrapping = lineWrapping;
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function setTabSize(tabSize: number) {
    if (!browser) return;

    const settings = getSettings();
    settings.tabSize = tabSize;
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function setTabType(tabType: TabType) {
    if (!browser) return;

    const settings = getSettings();
    settings.tabType = tabType;
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function setupTabSize(target: HTMLElement) {
    const tabSize = getSettings().tabSize;
    target.style.tabSize = tabSize.toString();
    try {
        // @ts-ignore
        target.style.MozTabSize = tabSize.toString();
    } catch (err) {
    }
}

export {
    SettingsButton,
    SettingsOverlay
};
