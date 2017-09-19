// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.syrnia.com/*
// @grant        none
// ==/UserScript==

const TIMER_INTERVAL = 3000; // интервал срабатывания таймера для функции fTimer
const WARNING_HP = 20; // количество HP при которых будет звучать аварийный сигнал
const DOC_TITLE = "Syrnia"; // имя вкладки


function fTimer() {
    var currentTime = new Date();
    console.log(currentTime + ": Timer");

    // Проверка хп при битве и перезагрузка страницы при малом к-ве хп
    if (document.getElementById("fightingHPText")) {
        var fightHP = document.getElementById("fightingHPText").innerText;
        // console.log("You are now fighting and have " + fightHP + " HP left");
        if (parseInt(fightHP) < WARNING_HP) { // Если к-во HP меньше заданного
            playSound(1000, 50);
            location.reload(); // перезагрузка страницы, чтобы отключить Fight All
        }
    }

    // Проверка бот-чека
    if (document.getElementById("botImage")) {
        document.title = "(B) " + DOC_TITLE;
    } else {
        document.title = DOC_TITLE;
    }
}

(function() {
    'use strict';
    console.log("TM launched");


    var myDiv = document.getElementById("useItemArea"); // Сюда будем помещать наш текст

    myDiv.innerHTML = "<p>This is div for my information</p>";

    setInterval(fTimer, TIMER_INTERVAL); // Включение таймера




    // Your code here...
}

)();

