'use strict'

function createErrorSearchResults(){
    
    var contentPage = $("#discover-tool");

    var gameFrame = document.createElement("div");
    var gameSummary = document.createElement("p");
    var gameTitle = document.createElement("h1");
    
    $(gameFrame).addClass("default-product");
    $(gameTitle).text("No Games Found!").appendTo(gameFrame);
    $(gameSummary).text("No Games Found, your search criteria is too strict!").appendTo(gameFrame);
    $(gameFrame).appendTo(contentPage);
    
    return 0;
}

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

function createGame(json) {
    
    var contentPage = $("#discover-tool");
    var baseUrl = '/media/images/game-icons/' + json.id + '/'
    
    var image = baseUrl + json["main-image"];
    var product_url = "/pages/product.html?game=" + json.id;
    
    var gameFrame = document.createElement("div");
    var gameTitle = document.createElement("h2"); 
    var gameSummary = document.createElement("p");
    var gameLink = document.createElement("a");
    var gameImage = document.createElement("img");
    var starImage = document.createElement("img");
    var starText = document.createElement("p");
    
    var gameMetrics = createGameMetrics(json)
    
    $(gameFrame).addClass("discover-game-product");
    $(gameTitle).html(json.title).addClass("discover-game-title").appendTo(gameFrame);
    $(gameLink).attr("href",product_url)
        .addClass("discover-game-link")
        .appendTo(gameFrame);
    $(gameImage).addClass("discover-game-image")
        .attr("src",image).appendTo(gameLink);
    $(gameMetrics).appendTo(gameFrame);
    $(gameSummary).text(json.summary).addClass("discover-game-summary").appendTo(gameFrame);
    $(gameFrame).appendTo(contentPage);
    
    return 0;
}

function filterSearch(game,filterObj){
    var gameType = game.category; 
    var isSocial = filterObj.gameTypeSocial;
    var isDungeon = filterObj.gameTypeDungeon;
    var isCoop = filterObj.gameTypeCooperative;
    
    var notFiltered = 1;
    
    if (isCoop == false && isSocial == false && isDungeon == false) {
        notFiltered = 1;
    } else if ( isSocial == true && gameType == "Social") {
        notFiltered = 1;
    } else if ( isDungeon == true && gameType == "Dungeon Crawler") {
        notFiltered = 1;
    } else if ( isCoop == true && gameType == "Cooperative") {
        notFiltered = 1;
    } else {
        notFiltered = 0;
    }
    
    var minPlayer = game["players-min"];
    var maxPlayer = game["players-max"];
    var minPlayerFilter = filterObj.playersMin;
    var maxPlayerFilter = filterObj.playersMax;
    
    if (minPlayerFilter == '') {
        minPlayerFilter = 0;
    } 
    
    if (maxPlayerFilter == '') {
        maxPlayerFilter = 1000;
    }
    
    if (minPlayerFilter > maxPlayer ) {
        notFiltered = 0;
    }
    
    if (maxPlayerFilter < minPlayer) {
        notFiltered = 0;
    }
    
    var minTime = game["time-min"];
    var maxTime = game["time-max"];
    var minTimeFilter = filterObj.timeMin;
    var maxTimeFilter = filterObj.timeMax;
 
    if (minTimeFilter == '') {
        minTimeFilter = 0;
    } 
    
    if (maxTimeFilter == '') {
        maxTimeFilter = 1000000;
    }
    
    if (minTimeFilter > maxTime ) {
        notFiltered = 0;
    }
    
    if (maxTimeFilter < minTime ) {
        notFiltered = 0;
    }
    
    var Age = game["age"];
    var minAgeFilter = filterObj.ageMin;
    var maxAgeFilter = filterObj.ageMax;
    
    if (minAgeFilter == '') {
        minAgeFilter = 0;
    } 
    
    if (maxAgeFilter == '') {
        maxAgeFilter = 1000000;
    }   
    
    if (Age < minAgeFilter || Age > maxAgeFilter) {
        notFiltered = 0;
    }
    
    var Complexity = game["complexity"];
    var minComplexityFilter = filterObj.complexityMin;
    var maxComplexityFilter = filterObj.complexityMax;
    
    if (minComplexityFilter == '') {
        minComplexityFilter = 0;
    } 
    
    if (maxComplexityFilter == '') {
        maxComplexityFilter = 10;
    } 
    
    if (Complexity < minComplexityFilter || Complexity > maxComplexityFilter) {
        notFiltered = 0;
    }
    
    return notFiltered;
}

function createProductSearch(json){
    $("#discover-tool").empty();
    var filterObject = createFilterObject()
    var totalGames = 0;
    for (var key in json){
        if (json.hasOwnProperty(key)){
            var game = json[key];
            var gameFilter = filterSearch(game,filterObject);
            if (gameFilter == 1) {
                createGame(game,filterObject);
                totalGames = totalGames + 1;
            } 
        }
    }
    
    if (totalGames == 0){
        createErrorSearchResults();
    }
}

function getGameData() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var gameData = JSON.parse(xhttp.responseText);
           createProductSearch(gameData);
        } else if (this.readyState == 4 && this.status != 200) {
            window.replace('/pages/error/404.html');
        }
    };     
    xhttp.open("GET", "/data/games.json", true);
    xhttp.send();
}

function createFilterObject(){
    var filterObject = {};
    
    $(".gameFilter").each(function(indice, opt){
        
        var gameFilterOption = opt.id;
        var gameFilterValue = $("#" + opt.id).val();
        
        if (gameFilterValue == "on") {
            gameFilterValue = $("#" + opt.id).is(":checked");
        }
        
        filterObject[gameFilterOption] = gameFilterValue;
    });
    
    return filterObject;
}

function flash_err(message) {
    $("<p>").text(message).addClass("error-item").appendTo("#error-bar");
    $("#error-bar")
        .hide()
        .delay(200)
        .fadeIn(200)
        .delay(2000)
        .fadeOut(500);
    return 0;
}

function validateInput(option,optionValue){
    
    var error_message = "";
    
    if (! $('#error-bar').is(':empty')){
        $('#error-bar').empty();
    }
    
    if (option == 'gameTypeSocial' || option == 'gameTypeDungeon' || option == 'gameTypeCooperative') {
        return 1;
    }
    
    if (option == 'playersMin' || option == 'playersMax') {
        if ( optionValue < 0 || optionValue > 1000) {
            flash_err("Player count must be between 0 and 1000!");
            return 0;
        } else {
            return 1;
        }
    }
    
    if (option == 'timeMin' || option == 'timeMax') {
        if ( optionValue < 0 || optionValue > 43800) {
            flash_err("Time must be between 0 minutes and 43,800 minutes!");
            return 0;
        } else {
            return 1;
        }
    }
    
    if (option == 'ageMin' || option == 'ageMax') {
        if ( optionValue < 0 || optionValue > 100) {
            flash_err("Age must be between 0 and 100 years old!");
            return 0;
        } else {
            return 1;
        }
    }
    
    
    if (option == 'complexityMin' || option == 'complexityMax') {
        if ( optionValue < 0 || optionValue > 5) {
            flash_err("Complexity must be between 0 and 5!");
            return 0;
        } else {
            return 1;
        }
    }
    return 0;
}

function updateGameFilter() {
    var previous;
    var triggerEvent;
    
    $(".gameFilter").on('focus',function(){
        previous = this.value;
    }).change(function(){
        var eventOption = this.id;
        var eventValue = this.value;
        triggerEvent = validateInput(eventOption,eventValue);
        if (triggerEvent == 1 ){
           getGameData(); 
        } else {
           this.value = previous;
        }
    });
}

$(document).ready(function(){
    getGameData();
    updateGameFilter();
})


