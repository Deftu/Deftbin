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
};

export function getLanguageFromExtension(extension: string): string | null {
    if (!extension) return "plaintext";

    const language = aliases[extension];
    if (language) return language;

    return null;
}

export function getExtensionFromLanguage(language: string): string | null {
    if (!language) return "txt";

    const extension = Object.keys(aliases).find((key) => aliases[key] === language);
    if (extension) return extension;

    return null;
}
