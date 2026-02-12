// ==UserScript==
// @name         Review in Graphite
// @namespace    http://github.com/9999years/tampermonkey
// @version      2026-08-20v1
// @description  Add a button to GitHub PRs which goes to Graphite
// @author       Rebecca Turner
// @match        https://github.com/*/pull/*
// @icon         https://app.graphite.com/favicon.ico
// @resource     icon https://app.graphite.com/favicon.svg
// @run-at       document-idle
// @grant        GM_getResourceURL
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
        link.id = "review-in-graphite";
        link.className = "flex-md-order-2 Button--secondary Button--small Button m-0 mr-md-0";
        link.href = reviewInGraphiteURL().href;
        link.innerHTML = `
            <span class="Button-content">
                <span class="Button-visual Button-leadingVisual">
                  <img class="octicon octicon-code" width="16">
                </span>
              <span class="Button-label">Review in Graphite</span>
            </span>`;
        link.querySelector('img').src = GM_getResourceURL("icon");
        return link;
    }

    let button;
    let observer;

    function ensureButton() {
        if (button?.isConnected) {
            return;
        }

        const container = document.querySelector(
            'div[data-component="PH_Actions"] > div.d-flex'
        );

        if (!container) {
            return;
        }

        button = createButton();
        container.prepend(button);
    }

    function observeReactRoot() {
        observer?.disconnect();

        const reactRoot = document.querySelector(
            'div[data-target="react-app.reactRoot"]'
        );

        if (!reactRoot) {
            return;
        }

        ensureButton();

        observer = new MutationObserver(ensureButton);
        observer.observe(reactRoot, {
            childList: true,
            subtree: true,
        });
    }

    observeReactRoot();
    document.addEventListener("turbo:load", observeReactRoot);
})();
