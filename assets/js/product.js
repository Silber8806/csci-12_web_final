'use strict'

function getGamesData() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            return JSON.parse(xhttp.responseText);
        } else {
            return {
                "error" : 404;
            }
        }
    };     
    xhttp.open("GET", "/data/games.json", true);
    xhttp.send();
}

var getUrlParameter = function getUrlParameter(sParam) {
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
};

<div class="col-s-12 col-m-6 col-l-4">
    <h1>Gloomhaven</h1>
    <a href="/pages/product.html?game=gloomhaven">
     <img class="col-s-12 col-m-12 col-l-12" src="/media/images/game-icons/gloomhaven.jpg" aria-controls=""alt="boardemic logo">
    </a>
</div> 

$(document).ready(function(){
    
    var err
    var errUrl
    var games = getGamesData();
    
    if (games.hasOwnProperty('error')){
        var errUrl = '/pages/error/' + games['error'] + 'html'; 
    } else {
        var current_game = getUrlParameter('game');
        if (! games.hasOwnProperty(current_game)) {
            var errUrl = '/pages/error/404.html'
        }
    }
    
    if (err == undefined) {
        window.replace(errUrl);
    } 
    
    var gameTitle = games[current_game].title;
    
    var gameBlock = document.createElement('div')
        .id(current_game)
        .addClass("col-s-12")
        .addClass("col-m-6")
        .addClass("col-l-12")
        .appendTo("#content")
    
    var gameTitle = document.createElement('h1')
        .textContent(current_game)
        .appendTo(current_game)
    
    var gameLink = document.createElement('a')
        .href = "/pages/product.html?game=" + current_game;
        .appendTo(current_game)
    
    var gameImage = document.createElement('img')
        .addClass("col-s-12")
        .addClass("col-m-12")
        .addClass("col-l-12")
        .alt(current_game)
        .src("/media/images/game-icons/" + current_game + '.jpg')
});