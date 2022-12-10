const aliases = {
    rb: "ruby",
    py: "python",
    pl: "perl",
    html: "xml",
    htm: "xml",
    js: "javascript",
    ts: "typescript",
    vbs: "vbscript",
    pas: "delphi",
    m: "objectivec",
    sm: "smalltalk",
    sh: "bash",
    erl: "erlang",
    hs: "haskell",
    md: "markdown",
    kt: "kotlin",
    cs: "csharp",
};

export function getLanguageFromExtension(extension: string): string | null {
    if (!extension) return "plaintext";

    const language = aliases[extension];
    if (language) return language;

    return extension;
}

export function getExtensionFromLanguage(language: string): string | null {
    if (!language) return "txt";

    const extension = Object.keys(aliases).find((key) => aliases[key] === language);
    if (extension) return extension;

    return language;
}

export function getLineHeight(element: HTMLElement) {
    const copy = element.cloneNode() as HTMLElement;
    copy.style.visibility = "hidden";
    copy.style.position = "absolute";
    copy.textContent = "a";
    element.parentNode?.append(copy);
    const lineHeight = copy.offsetHeight;
    element.parentNode?.removeChild(copy);
    return lineHeight;
}
