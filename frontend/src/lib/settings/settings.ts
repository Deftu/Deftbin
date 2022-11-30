import {
    browser
} from "$app/environment";

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
    OneDarkPro = "onedarkpro",
    Synthwave84 = "synthwave84",
    Monokai = "monokai",
    CatppuccinLatte = "catppuccin-latte",
    CatppuccinFrappe = "catppuccin-frappe",
    CatppuccinMacchiato = "catppuccin-macchiato",
    CatppuccinMocha = "catppuccin-mocha"
}

export function getThemeFromValue(value: string): string {
    if (value === "light") return "Light";
    if (value === "dark") return "Dark";
    if (value === "onedarkpro") return "OneDarkPro";
    if (value === "synthwave84") return "Synthwave84";
    if (value === "monokai") return "Monokai";
    if (value === "catppuccin-latte") return "CatppuccinLatte";
    if (value === "catppuccin-frappe") return "CatppuccinFrappe";
    if (value === "catppuccin-macchiato") return "CatppuccinMacchiato";
    if (value === "catppuccin-mocha") return "CatppuccinMocha";
    return "Dark";
}

export function getThemeFromName(name: string): string {
    if (name === "Light") return "light";
    if (name === "Dark") return "dark";
    if (name === "OneDarkPro") return "onedarkpro";
    if (name === "Synthwave84") return "synthwave84";
    if (name === "Monokai") return "monokai";
    if (name === "CatppuccinLatte") return "catppuccin-latte";
    if (name === "CatppuccinFrappe") return "catppuccin-frappe";
    if (name === "CatppuccinMacchiato") return "catppuccin-macchiato";
    if (name === "CatppuccinMocha") return "catppuccin-mocha";
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
    actionbarPosition: ActionBarPos;
    theme: Theme;
    lineNumbers: boolean;
    lineWrapping: boolean;
    tabSize: number;
    tabType: TabType;
    actionShortcuts: boolean;
    fancyLights: boolean;
}

export const defaultSettings: Settings = {
    actionbarPosition: ActionBarPos.Bottom,
    theme: Theme.Dark,
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 4,
    tabType: TabType.Tabs,
    actionShortcuts: true,
    fancyLights: false
};

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

export function setActionbarPosition(position: ActionBarPos) {
    if (!browser) return;

    const settings = getSettings();
    settings.actionbarPosition = position;
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

export function setActionShortcuts(actionShortcuts: boolean) {
    if (!browser) return;

    const settings = getSettings();
    settings.actionShortcuts = actionShortcuts;
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function setFancyLights(fancyLights: boolean) {
    if (!browser) return;

    const settings = getSettings();
    settings.fancyLights = fancyLights;
    localStorage.setItem("settings", JSON.stringify(settings));
}

// Element utility nodes

export function positionContent(target: HTMLElement) {
    const actionBarPos = getSettings().actionbarPosition;
	const calc = "calc(var(--action-bar-height) + var(--action-bar-spacing) * 2)";
	if (actionBarPos === "top") {
		target.style.paddingTop = calc;
		target.style.paddingBottom = "20px";
	} else if (actionBarPos === "bottom") {
		target.style.paddingTop = "20px";
		target.style.paddingBottom = calc;
	}
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

export function setupFancyLights(target: HTMLElement) {
    if (getSettings().fancyLights) {
        target.classList.add("fancy-lights");
    } else {
        target.classList.remove("fancy-lights");
    }
}

export function setupActionBarPos(target: HTMLElement) {
    const actionBarPos = getSettings().actionbarPosition;
    target.setAttribute("action-bar-pos", actionBarPos);
}
