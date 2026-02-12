// ==UserScript==
// @name        Make metadata collapsible in Claude reviews on github.com
// @namespace   http://github.com/9999years/tampermonkey
// @version     2026-02-12
// @author      Jade Lovelace and Rebecca Turner
// @match       https://github.com/*/pull/*
// @icon        https://github.githubassets.com/favicons/favicon.png
// @resource    icon https://github.githubassets.com/favicons/favicon.png
// @run-at      document-idle
// @grant       GM_getResourceURL
// ==/UserScript==

(function() {
    'use strict';

    function collapseClaude(elem) {
        if (!elem) return;
        const parent = elem.parentNode.parentNode
        const body = parent.querySelector('.js-comment-body')
        const container = document.createElement('details')
        const summary = document.createElement('summary')
        summary.innerText = 'ℹ️ Review metadata'
        container.append(summary)
        // This gets the (noisy) first couple paragraphs of the review:
        //
        // > Claude finished @9999years's task in 43s —— View job
        // > Review Details
        // >
        // > Timestamp: 2026-02-12T00:46:25Z
        // > Commit Message: My Cool Commit Message
        // > Commit Hash: abcdef1
        for (const node of body.querySelectorAll(':scope > :is(p, hr, h3):nth-child(-n+4)')) {
            container.appendChild(node)
        }
        body.prepend(container)
    }

    collapseClaude(document.querySelector('div.TimelineItem > div.avatar-parent-child > a[href="/apps/claude"]'))
})();
