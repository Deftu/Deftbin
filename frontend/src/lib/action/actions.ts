import * as fetch from "$lib/fetch";
import * as utils from "$lib/utils";
import * as notifications from "$lib/notifications/notifications";
import {
    browser
} from "$app/environment"

export function initializeActionBar(
    ...actions: string[]
) {
    if (!browser) return;

    for (let item in actions) {
        const action = document.querySelector(`button[data-action="${actions[item]}"]`);
        if (!action) continue;

        action.classList.add("enabled");
    }
}

export function performCopyLink(action: string) {
    if (!browser) return;

    const actionElement = document.querySelector(`button[data-action="${action}"]`);
    if (!actionElement || !actionElement.classList.contains("enabled")) return;

    // copy the current URL to the clipboard
    navigator.clipboard.writeText(window.location.href);
    notifications.post({
        title: "Link copied",
        message: "The link to this page has been copied to your clipboard.",
        type: notifications.NotificationType.Info
    });
}

export function performCopy(action: string) {
    if (!browser) return;

    const actionElement = document.querySelector(`button[data-action="${action}"]`);
    if (!actionElement || !actionElement.classList.contains("enabled")) return;

    // copy the content of the code block to the clipboard
    const codeElement = document.querySelector("code");
    if (!codeElement) return;

    const textContent = codeElement.textContent;
    if (!textContent) return;

    navigator.clipboard.writeText(textContent);
    notifications.post({
        title: "Code copied",
        message: "The code has been copied to your clipboard.",
        type: notifications.NotificationType.Success
    });
}

export function performNew(action: string) {
    if (!browser) return;

    const actionElement = document.querySelector(`button[data-action="${action}"]`);
    if (!actionElement || !actionElement.classList.contains("enabled")) return;

    // navigate to the new page
    window.location.href = "/";
}

export function performSave(action: string) {
    if (!browser) return;

    const actionElement = document.querySelector(`button[data-action="${action}"]`);
    if (!actionElement || !actionElement.classList.contains("enabled")) return;

    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const content = textarea.value;
    if (!content || content.length === 0) return;

    // @ts-ignore
    const highlighted = hljs.highlightAuto(content);
    if (!highlighted) return;

    const language = highlighted.language;
    if (!language) return;

    const extension = utils.getExtensionFromLanguage(language) || language;
    if (!extension) return;

    // make the api request to save the document
    fetch.fetchBackend("new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: language,
            content: content
        })
    }).then((res) => {
        console.log(res);
        if (res.status == 201) {
            // navigate to the new page
            res.json().then((json) => {
                window.location.href = `/${json.key}.${extension}`;
            });
        }
    }).catch((err) => {
        console.error(err);
        notifications.post({
            title: "Error while saving",
            message: "An error occurred while saving the document. It has been printed to the console.",
            type: notifications.NotificationType.Error
        });
    });
}

export function performDuplicate(action: string) {
    if (!browser) return;

    const actionElement = document.querySelector(`button[data-action="${action}"]`);
    if (!actionElement || !actionElement.classList.contains("enabled")) return;

    const code = document.querySelector("code");
    if (!code) return;

    const content = code.textContent;
    if (!content || content.length === 0) return;
    console.log(content);

    // redirect to the base route with the content as a body parameter
    window.location.href = `/?content=${encodeURIComponent(content)}`;
}

export function performRaw(action: string) {
    if (!browser) return;

    const actionElement = document.querySelector(`button[data-action="${action}"]`);
    if (!actionElement || !actionElement.classList.contains("enabled")) return;

    // get the key from the URL
    const url = new URL(window.location.href);
    const key = url.pathname.split("/")[1];

    // navigate to the raw page
    window.location.href = `/raw/${key}`;
}
