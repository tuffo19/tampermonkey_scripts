// ==UserScript==
// @name         previewer
// @namespace    https://github.com/mario/tampermonkey_scripts/
// @version      1.0
// @author       mario
// @description  to go to preview automatically
// @match        https://www.clips4sale.com/*
// @grant        none
// @run-at      document-end
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}



// this line indicates that the function definition will be executed once 3ms have passed




//function definition

function clickonthediv() {
  console.log("now I click");
  document.querySelector(".text-c4s-purple-primary").click();
}

(function() {
    'use strict';
   console.log("%c Improvements enabled", 'font-size: 18px; font-weight: bold');

    waitForElm('div[class="cursor-pointer hover:underline max-lg:ml-5 text-sm mt-1 lg:mt-2.5 text-c4s-purple-primary"]').then((elm) => {
    console.log("%c Link is arrived. ", 'font-size: 12px;color: red');
  // console.log(elm.textContent);
       // console.log (elm);
    console.log(document.querySelector(".text-c4s-purple-primary").textContent);
      setTimeout(clickonthediv, 1000);
  
});



})();

