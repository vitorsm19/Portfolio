/**
 * Inline script that runs synchronously in <head> before paint so the correct
 * theme is applied before React hydrates. Sets `data-theme` on <html>, which
 * the CSS vars in globals.css then resolve.
 *
 * Light is the brand baseline, so a first visit always lands on light
 * regardless of OS preference. Once the visitor picks a side it is remembered.
 *
 * Intentionally minified by hand: it ships as a string literal into
 * `dangerouslySetInnerHTML`, no module-loader cost.
 */
export const themeBootstrapScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`
