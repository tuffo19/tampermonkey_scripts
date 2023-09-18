// ==UserScript==
// @name         Improvements Jira
// @namespace    https://github.com/tuffo19/tampermonkey_scripts/
// @version      1.0
// @description  some improvements for Jira
// @author       tuffo19
// @match        https://tecla-it.atlassian.net/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js
// @downloadURL  https://raw.githubusercontent.com/tuffo19/tampermonkey_scripts/main/jira_improvements.js
// @updateURL    https://raw.githubusercontent.com/tuffo19/tampermonkey_scripts/main/jira_improvements.js
// @run-at      document-end
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

this.$ = this.jQuery = jQuery.noConflict(true);

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

 let lutechJiraRappo=function(){let h=jQuery('#jira-issue-header'),b=h.find('a'),bL=jQuery(b[b.length-1]).text(),b2=jQuery(b[b.length-2]).text(),rappo=(b2 && !isNaN(b2[b2.length-1]) ? (b2+' '): '')+bL+' | '+jQuery('h1:first').text(),msg=function(text){h.prepend(jQuery('<div/>',{'id':'lutechJira_tempMessage'}).css({'display':'none','margin-bottom':'50px','background':'#d7dfeb','border-radius':'16px','padding':'5px 10px','color':'#d22020','font-size':'16px','text-align':'center'}).html(text));jQuery('#lutechJira_tempMessage').show('slow');setTimeout(function(){jQuery('#lutechJira_tempMessage').hide('slow',function(){jQuery('#lutechJira_tempMessage').remove();});},2000);};window.focus();navigator.clipboard.writeText(rappo);msg('Clipboard filled with RAPPO description: <div style="font-weight:bold">'+rappo+'</div>');}

  var myFunctions = window.myFunctions = {};
myFunctions.updateGUI = lutechJiraRappo;
   // myFunctions.updateGUI();

(function() {
    'use strict';
   console.log("%c Improvements Jira enabled", 'font-size: 18px; font-weight: bold');

    waitForElm('a[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]').then((elm) => {
    console.log("%c Title is arrived. adding Button for comments", 'font-size: 12px;color: red');
   //console.log(elm.textContent);
   $('[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]').append("<div style='margin-left:12px'><button onclick='javascript:myFunctions.updateGUI(); return false'>Copy ticket info</button></div>");
});

    waitForElm("button[data-testid='issue.activity.common.component.load-more-button.loading-button']").then((elm) => {
     console.log("%c Button is arrived. Clicking on it to show more", 'font-size: 12px;color: red');
    //console.log(elm.textContent);
   $("button[data-testid='issue.activity.common.component.load-more-button.loading-button']").trigger("click")
});

})();




/**

1) al move scegliere PROJECT di default


(function() {
    'use strict';
    console.log("Fix new project input size")
    $("#project-single-select").css("width", "150%")

    let current_project = $(".currentProject").text();

    if( current_project == "Elesa B2B Service Desk Application Maintenance"){
        console.log("set ELESAB2B as default");

    }
    else("no")
})();



2) script di samo nel titolo

 globals jQuery, $, waitForKeyElements

this.$ = this.jQuery = jQuery.noConflict(true);let div= $('[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]');
    let i = 0;

    while((div.length === 0) && (i< 10)){
        console.log("Trovati: "+div.length+" i'll sleep i=" +i);
        sleep(100000)
        div= $('[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]');
        i++;
    }

    console.log("Trovati: "+div.length+" oppure passati "+i+" secondi");

    

       let lutechJiraRappo=function(){let h=jQuery('#jira-issue-header'),b=h.find('a'),bL=jQuery(b[b.length-1]).text(),b2=jQuery(b[b.length-2]).text(),rappo=(b2 && !isNaN(b2[b2.length-1]) ? (b2+' '): '')+bL+' | '+jQuery('h1:first').text(),msg=function(text){h.prepend(jQuery('<div/>',{'id':'lutechJira_tempMessage'}).css({'display':'none','margin-bottom':'50px','background':'#d7dfeb','border-radius':'16px','padding':'5px 10px','color':'#d22020','font-size':'16px','text-align':'center'}).html(text));jQuery('#lutechJira_tempMessage').show('slow');setTimeout(function(){jQuery('#lutechJira_tempMessage').hide('slow',function(){jQuery('#lutechJira_tempMessage').remove();});},2000);};window.focus();navigator.clipboard.writeText(rappo);msg('Clipboard filled with RAPPO description: <div style="font-weight:bold">'+rappo+'</div>');}


    var myFunctions = window.myFunctions = {};
myFunctions.updateGUI = lutechJiraRappo;
   // myFunctions.updateGUI();

**/



