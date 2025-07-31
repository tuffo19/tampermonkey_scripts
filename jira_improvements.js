// ==UserScript==
// @name         Improvements Jira
// @namespace    https://github.com/tuffo19/tampermonkey_scripts/
// @version      2.1.0
// @description  some improvements for Jira
// @author       tuffo19
// @match        https://tecla-it.atlassian.net/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js
// @run-at       document-end
// ==/UserScript==

/* globals jQuery, $ */
this.$ = this.jQuery = jQuery.noConflict(true);

// Carica Material Symbols
(function loadMaterialSymbols() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
})();

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) return resolve(document.querySelector(selector));
        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                resolve(el);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

function getDescription() {
  const currentIssue = jQuery('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]').text().trim();
  const parentIssue = jQuery('[data-testid="issue.views.issue-base.foundation.breadcrumbs.parent-issue.item"]').text().trim();
  const title = jQuery('h1:first').text().trim();

  const issuePart = parentIssue ? `${parentIssue} ${currentIssue}` : currentIssue;
  return `${issuePart} | ${title}`;
}

function showMessage(text) {
    const msg = document.createElement('div');
    msg.id = 'customJiraMsg';
    msg.style = 'margin-top: 12px; background: #e3fcef; color: #006644; padding: 6px 10px; border-radius: 6px; text-align: center; font-size: 13px;';
    msg.innerHTML = text;
    document.querySelector('#jira-issue-header')?.prepend(msg);
    setTimeout(() => msg.remove(), 2000);
}

function insertCompactButtonWithIcon() {
    waitForElm('div[data-testid="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]').then(container => {
        if (document.querySelector('#custom-track-button')) return;

        const button = document.createElement('button');
        button.id = 'custom-track-button';
        button.title = 'Copy ticket info';
        button.style.display = 'inline-flex';
        button.style.alignItems = 'center';
        button.style.gap = '4px';
        button.style.fontSize = '12px';
        button.style.fontWeight = 'normal';
        button.style.background = 'transparent';
        button.style.color = '#5e6c84';
        button.style.border = '1px solid #dfe1e6';
        button.style.borderRadius = '4px';
        button.style.padding = '2px 6px';
        button.style.cursor = 'pointer';
        button.style.fontFamily = 'inherit';
        button.setAttribute('type', 'button');


        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.textContent = 'text_snippet';
        icon.style.fontSize = '16px';
        icon.style.verticalAlign = 'middle';

        const label = document.createElement('span');
        label.textContent = 'Copy ticket info';

        button.appendChild(icon);
        button.appendChild(label);

        button.onclick = () => {
            const desc = getDescription();
            const fullText = `${desc}`;

            navigator.clipboard.writeText(fullText).then(() => {
                showMessage(`📋 Ticket copied:<br><span style="color:#172b4d">${fullText}</span>`);
            });
        };

        const wrapper = document.createElement('div');
        wrapper.style.marginTop = '1px';
        wrapper.appendChild(button);
        container.appendChild(wrapper);
    });
}

function expandAllComments() {
    const tryClicking = () => {
        const buttons = document.querySelectorAll('button[data-testid="issue.activity.common.component.load-more-button.loading-button"]');
        if (buttons.length === 0) return false;

        buttons.forEach(btn => btn.click());
        return true;
    };

    // Prova più volte per gestire caricamenti progressivi
    let attempts = 0;
    const interval = setInterval(() => {
        const clicked = tryClicking();
        attempts++;

        // Ferma dopo un certo numero di tentativi o se non ci sono più pulsanti
        if (!clicked || attempts > 10) {
            clearInterval(interval);
        }
    }, 1000); // Intervallo di 1 secondo tra i tentativi
}

(function () {
    'use strict';
    console.log('%c Jira LutechRappo Button with Icon enabled', 'font-size: 14px; font-weight: bold;');

    insertCompactButtonWithIcon(); // aggiunge pulsante
    expandAllComments(); //aperti commenti

    const observer = new MutationObserver(() => {
        insertCompactButtonWithIcon();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
