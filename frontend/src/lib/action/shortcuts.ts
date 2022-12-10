import {
    browser
} from "$app/environment";
import * as settings from "../settings";
import * as actions from "./actions";

export function initialize() {
    if (!browser || !settings.getSettings().actionShortcuts) return;

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.shiftKey) {
            let passed = false;
            switch (event.key) {
                case "l":
                case "L":
                    actions.performCopyLink("copy-link");
                    passed = true;
                    break;
                case "c":
                case "C":
                    actions.performCopy("copy");
                    passed = true;
                    break;
                case "d":
                case "D":
                    actions.performDuplicate("duplicate");
                    passed = true;
                    break;
                case "y":
                case "Y":
                    actions.performRaw("raw");
                    passed = true;
                    break;
                case "s":
                case "S":
                    actions.performSave("save");
                    passed = true;
                    break;
                case "n":
                case "N":
                    actions.performNew("new");
                    passed = true;
                    break;
            }

            if (passed) {
                event.preventDefault();
            }
        }
    });
}
