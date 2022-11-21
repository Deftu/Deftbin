import {
    browser
} from "$app/environment"

export function initialize(
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

    // make the api request to save the document
    fetch("http://127.0.0.1:3000/documents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: "md",
            content: content
        })
    }).then((res) => {
        if (res.status == 201) {
            // navigate to the new page
            res.json().then((json) => {
                window.location.href = `/${json.key}`;
            });
        }
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
