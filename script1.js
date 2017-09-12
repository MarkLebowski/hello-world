// ==UserScript==
// @name        Syrnia
// @namespace   syrnia.com
// @include     http://www.syrnia.com/game.php#
// @version     1
// @grant       none
// ==/UserScript==

console.log("GM launched");

const TIMER_INTERVAL = 3000; // интервал срабатывания таймера для функции fTimer
const WARNING_HP = 20; // количество HP при которых будет звучать аварийный сигнал
const DOC_TITLE = "Syrnia"; // имя вкладки

var myDiv = document.getElementById("useItemArea"); // Сюда будем помещать наш текст
var chestStarted = false; // Начато ли открывание chest

myDiv.innerHTML = "<p>This is div for my information</p>";

setInterval(fTimer, TIMER_INTERVAL); // Включение таймера

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
  
  // Список игроков в локации
  if (document.getElementById("centerPlayerList")) {
    // console.log("");
  }
  
  // Название локации
  if (document.getElementById("locationTitle")) {
    var loc = document.getElementById("locationTitle").innerText;
    myDiv.innerHTML = "<p>You are at " + loc + ".</p>";
    if (loc == "Heerchey docks") locHeercheyDocks();
    if (loc == "Heerchey manor") myDiv.innerHTML = "<p>Nothing to do here</p>";
    if (loc == "Ancestral mountains") locAncestralMountains();
    if (loc == "McGoogins site") myDiv.innerHTML = "<p>Nothing to do here</p>";
    if (loc == "McGoogins camp") myDiv.innerHTML = "<p>Nothing to do here</p>";
    if (loc == "Arch. cave center") myDiv.innerHTML = "<p>Nothing to do here</p>";
    if (loc.indexOf("Arch. cave 2") != -1) locArch2();
  }
  
  // Chest cracker
  if (document.getElementById("guessCombo")) chestCracker();
}

// воспроизведение сигнала частотой freq Hz и длительностью dur ms
function playSound(freq, dur) {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = freq;
  oscillator.connect(context.destination);
  oscillator.start(0);
  setTimeout(
    function() {
      oscillator.stop(0);
    }
    , dur
  );
}

// Определение exp, необходимого до следующего уровня
function expToLevel(str) {
  var firstChar = str.indexOf(",") + 2;
  var lastChar = str.indexOf(" ", firstChar);
  return parseInt(str.substring(firstChar, lastChar));
}

// Для локации Heerchey Docks
function locHeercheyDocks() {
  var locContent = document.getElementById("LocationContent").innerText;
  if (locContent[1] == "Y" || locContent[1] == "F") { // Fishing bass
    var roundsToLevel = expToLevel(locContent) / 125; // Bass exp is 125
    myDiv.innerHTML = "<p>You need <b>" + roundsToLevel.toFixed(0) + "</b> Bass to get a level</p>";
  }
}

// Для локации Ancestral Mountains
function locAncestralMountains() {
  var locContent = document.getElementById("LocationContent").innerText;
  if (locContent[1] == "Y") { // Mining iron ore
    var roundsToLevel = expToLevel(locContent) / 22; // Iron mining exp is 22
    myDiv.innerHTML = "<p>You need <b>" + roundsToLevel.toFixed(0) + "</b> Iron to get a level</p>";
  }
}

// Создание ссылки на перемещение в Arch Caves 2
function addLink(str) {
  return "<p onclick=\"updateCenterContents(\'move\', \'" + str + "\');return false;\"><u>" + str + "</u></p>";
}

// Для локации Arch. cave 2
function locArch2() {
  var locContent = document.getElementById("moveMap").innerHTML;
  var divString = "";
  if (locContent.indexOf("Arch. cave SE") != -1) divString += addLink("Arch. cave SE");
  if (locContent.indexOf("\'Arch. cave 2.1\'") != -1) divString += addLink("Arch. cave 2.1");
  if (locContent.indexOf("\'Arch. cave 2.2\'") != -1) divString += addLink("Arch. cave 2.2");
  if (locContent.indexOf("Arch. cave 2.3") != -1) divString += addLink("Arch. cave 2.3");
  if (locContent.indexOf("Arch. cave 2.4") != -1) divString += addLink("Arch. cave 2.4");
  if (locContent.indexOf("Arch. cave 2.5") != -1) divString += addLink("Arch. cave 2.5");
  if (locContent.indexOf("Arch. cave 2.6") != -1) divString += addLink("Arch. cave 2.6");
  if (locContent.indexOf("Arch. cave 2.7") != -1) divString += addLink("Arch. cave 2.7");
  if (locContent.indexOf("Arch. cave 2.8") != -1) divString += addLink("Arch. cave 2.8");
  if (locContent.indexOf("Arch. cave 2.9") != -1) divString += addLink("Arch. cave 2.9");
  if (locContent.indexOf("Arch. cave 2.10") != -1) divString += addLink("Arch. cave 2.10");
  if (locContent.indexOf("Arch. cave 2.11") != -1) divString += addLink("Arch. cave 2.11");
  if (locContent.indexOf("Arch. cave 2.12") != -1) divString += addLink("Arch. cave 2.12");
  if (locContent.indexOf("Arch. cave 2.13") != -1) divString += addLink("Arch. cave 2.13");
  if (locContent.indexOf("Arch. cave 2.14") != -1) divString += addLink("Arch. cave 2.14");
  if (locContent.indexOf("Arch. cave 2.15") != -1) divString += addLink("Arch. cave 2.15");
  if (locContent.indexOf("Arch. cave 2.16") != -1) divString += addLink("Arch. cave 2.16");
  if (locContent.indexOf("Arch. cave 2.17") != -1) divString += addLink("Arch. cave 2.17");
  if (locContent.indexOf("Arch. cave 2.18") != -1) divString += addLink("Arch. cave 2.18");
  if (locContent.indexOf("Arch. cave 2.19") != -1) divString += addLink("Arch. cave 2.19");
  if (locContent.indexOf("Arch. cave 2.20") != -1) divString += addLink("Arch. cave 2.20");

  // console.log(divString);
  myDiv.innerHTML = divString;
  
  
}

// Chest cracker
function chestCracker() {
  console.log(chestStarted);
  if (chestStarted) {
    
  } else {
    var str = document.getElementById("LocationContent").innerHTML;
    var firstChar = str.indexOf("between") + 8;
    var lastChar = str.indexOf(" ", firstChar);
    var firstNum = parseInt(str.substring(firstChar, lastChar));
    // console.log("First num: " + firstNum);
    firstChar = str.indexOf("and", lastChar) + 4;
    lastChar = str.indexOf(".", firstChar);
    var lastNum = parseInt(str.substring(firstChar, lastChar));
    // console.log("Last num: " + lastNum);
    var numbersArray = array();
    for (var i = firstNum; i<=lastNum; i++) {
      numbersArray.push(i);
    }
    console.log(numbersArray);
    // Randomizing array
    for (var i = numbersArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numbersArray[i];
        numbersArray[i] = numbersArray[j];
        numbersArray[j] = temp;
    }
    console.log(numbersArray);
    chestStarted = true;
  }
  
}


// document.getElementById("centerContent").addEventListener("DOMSubtreeModified", fMain, false);

/*
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
observer.observe(
  document.getElementById("centerContent"),
  {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true,
    attributeFilter: true
  }
);
*/

//locationContentElement = document.getElementById("LocationContent");
//alert(locationContentElement.innerHTML);

//locationContentElement.addEventListener("onchange", fMain, false);

// locationContentElement.onchange() = fMain();

/*
function fMain() {
  var currentTime = new Date();
  var str = null;
  console.log(currentTime + ": centerContent modified. You are in ") +
    document.getElementById("locationTitle").innerHTML;
  
  if (document.getElementById("botImage")) console.log(currentTime + ": Bot Check!");
  if (document.getElementById("fightLogTop")) {
    console.log("You are fighting :)");
    var str = document.getElementById("fightLogTop").parentNode.innerHTML;
  }
  if (document.getElementById("LocationContent"))  {
    var locationContentElement = document.getElementById("LocationContent").firstChild;
    var str = locationContentElement.innerHTML;
    console.log(str);
  }
  
  if (str) console.log(str);
}
*/
