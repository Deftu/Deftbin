<script lang="ts">
  import * as settings from "$lib/settings/settings";
  const theme = settings.getSettings().theme;
  if (theme != "dark" && theme != "light") {
    import(`./themes/hljs-${theme}.css`);
  } else import(/* @vite-ignore */ `./hljs-default.css`);

  import { onMount } from "svelte";
  import * as utils from "$lib/utils";
  import HighlightJS from "./HighlightJS.svelte";

  export let language: string;
  export let code: string;

  // @ts-ignore
  const languageAlias = utils.getLanguageFromExtension(language) || language;

  function loadLanguage() {
    // load language
    if (language) {
      let script = document.createElement("script");
      // @ts-ignore
      script.src = `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/languages/${languageAlias}.min.js`;
      script.async = true;
      document.head.append(script);

      script.addEventListener("load", () => {
        // @ts-ignore
        hljs.highlightElement(document.querySelector("code"));
      });
    } else {
      // @ts-ignore
      hljs.highlightAll();
    }
  }

  function getLineHeight(element: HTMLElement) {
    const copy = element.cloneNode() as HTMLElement;
    copy.style.visibility = "hidden";
    copy.style.position = "absolute";
    copy.textContent = "a";
    element.parentNode?.append(copy);
    const lineHeight = copy.offsetHeight;
    element.parentNode?.removeChild(copy);
    return lineHeight;
  }

  onMount(() => {
    // TODO: Add and position line numbers
    const lineNums = document.querySelector(".line-nums");
    const pre = document.querySelector("pre");
    const code = document.querySelector("code");

    if (!settings.getSettings().lineWrapping) {
        pre?.classList.add("no-wrap");
        code?.classList.add("no-wrap");
    }

    if (settings.getSettings().lineNumbers) {
      const codeBlock = document.querySelector(".code-block");
      if (lineNums && pre && code) {
        const lines = code?.textContent?.split("\n");
        if (!lines) return;

        const codeBlockClone = codeBlock?.cloneNode(true) as HTMLElement;
        codeBlockClone.style.visibility = "hidden";
        codeBlockClone.style.position = "absolute";
        codeBlockClone.style.width = getComputedStyle(codeBlock).width;
        codeBlockClone.style.height = getComputedStyle(codeBlock).height;
        codeBlock?.parentElement?.append(codeBlockClone);

        const codeClone = codeBlockClone.querySelector("code");

        for (let i = 0; i < lines.length; i++) {
          console.log("----- ", i, "-----");
          const content = lines[i - 1] || "";

          console.log("line", content);
          const line = document.createElement("span");
          line.style.visibility = "hidden";
          line.style.position = "absolute";
          line.style.width = "100%";
          line.textContent = `${content}\n`;
          codeClone?.append(line);
          const lineHeight = line.offsetHeight;
          console.log("lineHeight", lineHeight);
          const singleLineHeight = getLineHeight(line);
          console.log("singleLineHeight", singleLineHeight);

          const lineNum = document.createElement("span");
          lineNum.textContent = (i + 1).toString();
          console.log("lineNum", lineNum.textContent);

          if (i >= 1 && content.length > 0) {
            // get the number of lines this line takes up
            console.log("raw numLines", lineHeight / singleLineHeight);
            const numLines = Math.ceil(lineHeight / singleLineHeight);
            console.log("numLines", numLines);

            lineNum.style.marginTop = `${(numLines - 1) * singleLineHeight}px`;
          }

          lineNums.append(lineNum);
        }

        codeBlockClone.remove();
      }
    } else {
      lineNums?.remove();
    }

    // Fix the scroll position
    // @ts-ignore
    document.querySelector("pre")?.addEventListener("scroll", (e) => {
      // @ts-ignore
      lineNums.scrollTop = (e.target as HTMLElement).scrollTop;
    });
  });
</script>

<HighlightJS hljsLoadedCallback={loadLanguage} />

<div class="code-block">
  <div class="line-nums" />
  <pre>{#if languageAlias}<code class="language-{languageAlias}">{code}</code>{:else}<code>{code}</code>{/if}</pre>
</div>

<style>
  :global(html) {
    --code-line-height: 20px;
    --lang-indicator-color: rgb(68, 68, 68);
  }

  :global(html[data-theme="light"]) {
    --lang-indicator-color: rgb(175, 175, 175);
  }

  .code-block {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    color: var(--text);
    font-family: monospace, sans-serif;
    font-size: 15px;
    line-height: var(--code-line-height);
    padding: 20px;
  }

  .line-nums {
    min-width: 20px;
    height: fit-content;
    max-height: 100%;
    font-size: 15px;
    margin-right: 20px;
    font-family: monospace;
    display: flex;
    flex-direction: column;
    user-select: none;
    line-height: var(--code-line-height);
    color: var(--text-faded);
    text-align: center;
    overflow: hidden;
  }

  .line-nums :global(span) {
    position: relative;
    color: var(--text-faded);
    text-align: center;
  }

  pre {
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: auto;
    tab-size: 4;

    border: none;
    color: var(--text);
    background: none;
    white-space: pre-line;
  }

  code {
    white-space: pre-line;
  }

  pre,
  code,
  code :global(*),
  .line-nums {
    font-family: monospace;
    font-size: 15px;
    line-height: var(--code-line-height);
  }

  code {
    background: none;
    color: var(--text);
  }

  code,
  code :global(*) {
    padding: 0;
    margin: 0;
  }

  .no-wrap {
    white-space: pre;
  }
</style>
