'use strict'

function createErrorSearchResults(){
    
    var contentPage = $("#discover-tool");

    var gameFrame = document.createElement("div");
    var gameSummary = document.createElement("p");
    var gameTitle = document.createElement("h1");
    
    $(gameFrame).addClass("col-s-12 col-m-12 col-l-12 default-product");
    $(gameTitle).text("No Games Found!").appendTo(gameFrame);
    $(gameSummary).text("No Games Found, your search criteria is too strict!").appendTo(gameFrame);
    $(gameFrame).appendTo(contentPage);
    
    return 0;
}

function createGame(json) {
    
    var contentPage = $("#discover-tool");
    var baseUrl = '/media/images/game-icons/' + json.id + '/'
    
    var image = baseUrl + json["main-image"];
    var product_url = "/pages/product.html?game=" + json.id;
    
    var gameFrame = document.createElement("div");
    var gameTitle = document.createElement("h1");
    var gameSummary = document.createElement("p");
    var gameLink = document.createElement("a");
    var gameImage = document.createElement("img");
    
    $(gameFrame).addClass("col-s-12 col-m-6 col-l-4 discover-product");
    $(gameTitle).text(json.title).appendTo(gameFrame);
    $(gameLink).attr("href",product_url)
        .appendTo(gameFrame);
    $(gameImage).addClass("col-s-12 col-m-5 col-l-5 discover-image")
        .attr("src",image).appendTo(gameLink);
    $(gameSummary).text(json.summary).appendTo(gameFrame);
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

function updateGameFilter() {
    $(".gameFilter").change(getGameData);
}

$(document).ready(function(){
    getGameData();
    updateGameFilter();
})
