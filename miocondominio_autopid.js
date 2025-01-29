// ==UserScript==
// @name         Miocondominio autoPID
// @namespace    http://tampermonkey.net/
// @version      2025-01-02
// @description  try to take over the world!
// @author       You
// @match        https://www.miocondominio.eu/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=miocondominio.eu
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  val = 12345;

    // Attendi che la pagina sia completamente caricata
    window.addEventListener('load', function() {
        // Trova il campo con l'id PID
        const pidInput = document.querySelector('#PID');
        if (pidInput) {
            // Imposta il valore su $val
            pidInput.value = val;
        }
    });
})();
