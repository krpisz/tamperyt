// ==UserScript==
// @name         TamerYT
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/krpisz/tamperyt/main/tamperyt.js
// @downloadURL  https://raw.githubusercontent.com/krpisz/tamperyt/main/tamperyt.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const url = 'https://raw.githubusercontent.com/krpisz/tamperyt/main/list';
    var time = 5000;
    var channels = [
        "Lakarnum",
        "Toriiyt"
    ];

    function delay(){
        time = Math.min(60000, time + 2000);
        return time;
    }

    function checkUrl(){
        return window.location.href.match(/watch\?v=/) !== null
    }

    async function fetchDataAndStore() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            // Store the data in local storage
            localStorage.setItem('tamperyt', JSON.stringify([data, Date.now()]));
            console.log('Data has been fetched and stored in local storage.');
            return data;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function getData(update) {
        update = update || false;
        return new Promise((resolve, reject) => {
            const storedData = localStorage.getItem('tamperyt');
            var olddata, time = 0;
            if (storedData) {
                [olddata, time] = JSON.parse(storedData);
            }
            if (olddata && time > Date.now() - 60000) {
                console.log('Data found in local storage.');
                resolve(olddata);
            } else {
                fetchDataAndStore().then(data => {
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(olddata || channels);
                    }
                }).catch(error => {
                    resolve(olddata || channels);
                });
            }
        });
    }

    let alts = ['u1CiW4up3E', '70cHGrA55', '5KiBi4iTOi13T', 's11Mip4L3'];
    function blockYt(ylist){
        if(checkUrl()){
            for(let str of ylist){
                if(document.querySelector('[href="/@'+str+'"]')){
                    console.log("page includes:" + str )
                    window.location.href = 'https://www.youtube.com/watch?v=' + alts[Math.floor(Math.random() * alts.length)]
                    return;
                }
            }
        }
        setTimeout(function(){
            getData().then(x => blockYt(x))
        }, 1000)
    }

    console.log('Staring')
    getData().then(x => blockYt(x))

})();
