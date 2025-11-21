// ==UserScript==
// @name         Review in Graphite
// @namespace    http://github.com/9999years/tampermonkey
// @version      2025-11-21
// @description  Add a button to GitHub PRs which goes to Graphite
// @author       Rebecca Turner
// @match        https://github.com/*/pull/*
// @icon         https://app.graphite.com/favicon.ico
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function reviewInGraphiteURL() {
        const url = new URL(window.location);
        url.hostname = "app.graphite.com";
        url.pathname = "/github/pr" + url.pathname.replace("/pull/", "/");
        return url;
    }

    function createButton() {
        const link = document.createElement("a");
        link.className = "flex-md-order-2 Button--secondary Button--small Button m-0 mr-md-0";
        link.href = reviewInGraphiteURL().href;
        link.innerHTML = `<span class="Button-content"><span class="Button-label">Review in Graphite</span></span>`;
        return link;
    }

    document.querySelector(".gh-header-actions")
        .prepend(createButton());
})();
