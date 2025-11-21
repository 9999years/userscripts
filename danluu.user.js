// ==UserScript==
// @name         danluu.com page width
// @namespace    http://github.com/9999years/tampermonkey
// @version      2025-11-12
// @description  Make body copy narrower on danluu.com
// @author       Rebecca Turner
// @match        https://danluu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        main {
            max-width: 40em;
            margin: 0 auto;
        }
    `);
})();
