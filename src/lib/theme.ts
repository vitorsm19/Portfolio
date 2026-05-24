/**
 * Inline script that runs synchronously in <head> before paint so the
 * correct theme is applied before React hydrates. Reads localStorage,
 * falls back to OS preference. Sets `data-theme` on <html> which the
 * @theme/CSS vars in globals.css then resolve.
 *
 * Intentionally minified by hand — it ships as a string literal into
 * `dangerouslySetInnerHTML`, no module-loader cost.
 */
export const themeBootstrapScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`
