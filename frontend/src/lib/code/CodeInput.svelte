<script lang="ts">
    export let content = "";
    export let language = "";
    let initialLanguage = language;

    import * as settings from "$lib/settings";
    import * as utils from "$lib/utils";
    import HighlightJS from "./HighlightJS.svelte";

    import {
        onMount
    } from "svelte";

    let hljsLoaded = false;

    function setLanguage(value: string) {
        const code = document.querySelector("code");
        if (code) {
            code.classList.forEach((className) => {
                if (className.startsWith("language-")) {
                    code.classList.remove(className);
                }
            });

            if (value && value !== undefined) code.classList.add(`language-${value}`);
            language = value;
        }
    }

    function highlight(element: HTMLElement) {
        // remove all children
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        // add new children
        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            if (i != lines.length - 1) line += "\n";
            element.append(line);
        }

        // highlight
        if (hljsLoaded && language) {
            // @ts-ignore
            hljs.highlightElement(element);
        }
    }

    onMount(() => {
        const pre = document.querySelector("pre");
        const code = document.querySelector("code");
        const lineNums = document.querySelector(".line-nums");

        if (!settings.getSettings().lineWrapping) {
            pre?.classList.add("no-wrap");
            code?.classList.add("no-wrap");
        }

        function addLineNumbers() {
            if (settings.getSettings().lineNumbers) {
                function clearLineNumbers() {
                    while (lineNums?.firstChild) {
                        lineNums?.removeChild(lineNums?.firstChild);
                    }
                }

                if (content.length <= 0) {
                    clearLineNumbers();
                    const caret = document.createElement("span");
                    caret.textContent = ">";
                    lineNums?.append(caret);
                    return;
                }

                const codeInput = document.querySelector(".code-input");
                if (pre && code) {
                    clearLineNumbers();
                    const lines = code?.textContent?.split("\n");
                    if (!lines) return;

                    const codeInputClone = codeInput?.cloneNode(true) as HTMLElement;
                    codeInputClone.style.visibility = "hidden";
                    codeInputClone.style.position = "absolute";
                    codeInputClone.style.width = getComputedStyle(codeInput).width;
                    codeInputClone.style.height = getComputedStyle(codeInput).height;
                    codeInput?.parentElement?.append(codeInputClone);

                    const codeClone = codeInputClone.querySelector("code");
                    codeClone.textContent = "";

                    for (let i = 0; i < lines.length; i++) {
                        const content = lines[i - 1] || "";
                        const line = document.createElement("span");
                        line.style.width = "100%";
                        line.textContent = `${content}\n`;
                        codeClone?.append(line);
                        const lineHeight = line.offsetHeight;
                        const singleLineHeight = utils.getLineHeight(line);

                        const lineNum = document.createElement("span");
                        lineNum.textContent = (i + 1).toString();

                        if (i >= 1 && content.length > 0) {
                            // get the number of lines this line takes up
                            const numLines = Math.ceil(lineHeight / singleLineHeight);
                            lineNum.style.marginTop = `${(numLines - 1) * singleLineHeight}px`;
                        }

                        lineNums.append(lineNum);
                    }

                    codeInputClone.remove();
                } else lineNums?.remove();
            } else lineNums?.remove();
        }

        addLineNumbers();

        const codeInput = document.querySelector("textarea");
        codeInput?.addEventListener("scroll", () => {
            code.scrollTop = codeInput.scrollTop;
        });

        code?.addEventListener("scroll", () => {
            codeInput.scrollTop = code.scrollTop;
        });

        codeInput?.addEventListener("keydown", (e) => {
            if (e.key === "Tab" && !e.shiftKey) {
				if (!e.ctrlKey) {
                    if (!e.target) return;

					const appendage = settings.getSettings().tabType === "spaces" ? " ".repeat(settings.getSettings().tabSize) : "\t".repeat(settings.getSettings().tabSize / 4);

                    // @ts-ignore
					const start = e.target.selectionStart;
                    // @ts-ignore
					const end = e.target.selectionEnd;

                    // @ts-ignore
					e.target.value = e.target.value.substring(0, start) + appendage + e.target.value.substring(end);

                    // @ts-ignore
					e.target.selectionStart = e.target.selectionEnd = start + appendage.length;
					e.preventDefault();
				} else {
					const elements = document.querySelectorAll("input, select, textarea, button, a");
					const index = Array.prototype.indexOf.call(elements, e.target);
					if (index > -1 && index < elements.length - 1) {
                        // @ts-ignore
						elements[index + 1].focus();
                        e.preventDefault();
					}
				}
            }
        });

        codeInput?.addEventListener("input", () => {
            if (!code) return;

            code.textContent = content;
            highlight(code);
            addLineNumbers();
        });

        let timeout: NodeJS.Timeout;
        codeInput?.addEventListener("input", () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!initialLanguage || initialLanguage.length < 0 || initialLanguage === "auto") {
                    const highlighted = hljs.highlightAuto(code.textContent);
                    const highlightedLanguage = highlighted.language;
                    setLanguage(highlightedLanguage);
                    console.log(language);
                    setTimeout(() => {
                        highlight(code);
                    }, 250);
                }
            }, 3000);
        });
    });
</script>

<HighlightJS on:load={() => {
    hljsLoaded = true;
}} />

<div class="code-input">
    <div class="line-nums" />
    {#if language}
    <div class="lang-indicator">
            <span>{utils.getExtensionFromLanguage(language)?.toUpperCase()}</span>
    </div>
    {/if}
    <div class="code-container">
        <textarea bind:value={content} spellcheck={false} />
        <pre><code></code></pre>
    </div>
</div>

<style>
    .code-input {
        width: 100%;
        height: 100%;
        background: var(--background-1);
        position: relative;
        display: flex;
        flex-direction: row;
        overflow: auto;
        padding: 25px;
        border-radius: inherit;
    }

    .code-input .line-nums {
        min-width: 20px;
        height: fit-content;
        max-height: 100%;
        font-size: 15px;
        margin-right: 20px;
        font-family: monospace;
        display: flex;
        flex-direction: column;
        user-select: none;
        line-height: var(--code-height);
        font-family: var(--code-font);
        font-size: var(--code-size);
        text-align: center;
        z-index: 2;
    }

    .code-input .line-nums :global(span) {
        position: relative;
        color: var(--text-faded);
        font-family: var(--code-font);
        font-size: var(--code-size);
        text-align: center;
    }

    .code-input .lang-indicator {
        position: absolute;
        top: 0;
        right: 0;
        background: var(--background-2);
        padding: 5px 10px;
        border-radius: 0 0 0 5px;
        font-size: 15px;
        font-family: monospace;
        display: flex;
        flex-direction: row;
        align-items: center;
        user-select: none;
        z-index: 2;
    }

    .code-input .code-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .code-input textarea {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        resize: none;
        border: none;
        outline: none;
        background: none;
        padding: 0;
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        z-index: 1;
        font-family: var(--code-font);
        font-size: var(--code-size);
        color: transparent;
        background: transparent;
        caret-color: var(--text-faded);
        line-height: var(--code-height);
    }

    .code-input pre {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        margin: 0;
        padding: 0;
        pointer-events: none;
        background-color: transparent;
        z-index: 0;
        white-space: pre-wrap;
        font-family: var(--code-font);
        font-size: var(--code-size);
        line-height: var(--code-height);
    }

    .code-input pre code {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
        background-color: transparent;
        overflow: scroll;
        font-family: var(--code-font);
        font-size: var(--code-size);
        line-height: var(--code-height);
    }

    .code-input pre code :global(*) {
        pointer-events: auto;
        background-color: transparent;
        font-family: var(--code-font);
        font-size: var(--code-size);
        line-height: var(--code-height);
    }

    .code-input :global(*) {
        scrollbar-width: none;
    }

    .code-input :global(*)::-webkit-scrollbar {
        display: none;
    }

    :global(.hljs), :global(.hljs) :global(*) {
        font-family: var(--code-font);
        font-size: var(--code-size);
    }

    :global(.no-wrap) {
        white-space: pre;
    }
</style>
