'use strict'

function constructProductPage(json) {
    var current_game = getUrlParameter('game');
    var contentSection = $("#content");
    
    var gameTitleText = json[current_game].title;
    var gameTitle = document.createElement("h1");
    
    $(gameTitle).text(gameTitleText).appendTo(contentSection);
    
    return 0;
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function getGameData() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var gameData = JSON.parse(xhttp.responseText);
           constructProductPage(gameData);
        } else if (this.readyState == 4 && this.status != 200) {
            window.replace('/pages/error/404.html');
        }
    };     
    xhttp.open("GET", "/data/games.json", true);
    xhttp.send();
}

$(document).ready(function(){
    var err
    var errUrl
    
    getGameData();
})