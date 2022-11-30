let settings = localStorage.getItem('settings');
if (settings) { // This is the first time the app is loaded, settings will only be set up later.
    let theme = JSON.parse(settings).theme;
    if (theme == null) {
        theme = fetchPreferredTheme();
        changeTheme(theme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        changeTheme(newTheme);
    });

    changeTheme(theme);
}


function changeTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    let settings = localStorage.getItem('settings');
    if (settings) {
        settings = JSON.parse(settings);
        settings.theme = theme;
        localStorage.setItem('settings', JSON.stringify(settings));
    }
}

function fetchPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    } else {
        return 'light';
    }
}
