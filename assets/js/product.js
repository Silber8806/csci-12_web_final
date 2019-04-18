'use strict'

function createGameMetrics(json){
    
    var gameMetrics = document.createElement("table");
    var gameMetricsRow = document.createElement("tr");
    var gamePlayersHeader = document.createElement("th");
    var gameTimeHeader = document.createElement("th");
    var gamePlayers = document.createElement("td");
    var gameTime = document.createElement("td");
    
    $(gameMetrics).addClass("discover-game-stats");
    $(gameMetricsRow).clone().appendTo(gameMetrics);
    $(gamePlayersHeader).html("<i class=\"fas fa-users\"></i> Players").appendTo(gameMetrics);
    $(gameTimeHeader).html("<i class=\"far fa-clock\"></i> Time").appendTo(gameMetrics);
    $(gameMetricsRow).clone().appendTo(gameMetrics);
    var gamePlayersText = json['players-min'] + " - " + json['players-max'];
    var gameTimeText = json['time-min'] + " - " + json['time-max'] + ' min';
    $(gamePlayers).html(gamePlayersText).appendTo(gameMetrics);
    $(gameTime).text(gameTimeText).appendTo(gameMetrics); 
    
    var gameAgeHeader = document.createElement("th");
    var gameComplexityHeader = document.createElement("th");
    var gameAge = document.createElement("td");
    var gameComplexity = document.createElement("td"); 
    
    $(gameMetricsRow).clone().appendTo(gameMetrics);
    $(gameAgeHeader).html("<i class=\"fas fa-child\"></i> Age").appendTo(gameMetrics);
    $(gameComplexityHeader).html("<i class=\"fas fa-calculator\"></i> Complexity").appendTo(gameMetrics)
    $(gameMetricsRow).clone().appendTo(gameMetrics);
    $(gameAge).text(json['age'] + "+").appendTo(gameMetrics);
    $(gameComplexity).text(json['complexity'] + " / 5.00").appendTo(gameMetrics); 
    
    return gameMetrics
}

function constructProductPage(json) {
    var current_game = getUrlParameter('game');
    var current_game_json = json[current_game];
    var contentSection = $("#content");
    
    var gameMetrics = createGameMetrics(current_game_json);
    
    $(gameMetrics).appendTo("#product-metric");

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