'use strict'

function createGameMetrics(json){
    
    var gameMetrics = document.createElement("table");
    var gameMetricsRow = document.createElement("tr");
    
    $(gameMetrics).addClass("product-game-stats");

    var gameCategoryHeader = document.createElement("th");
    var gameCategoryValue = document.createElement("td");
    
    $(gameMetricsRow).clone().appendTo(gameMetrics);
    $(gameCategoryHeader).attr("colspan",2).html("<i class=\"fas fa-users\"></i> Category").appendTo(gameMetrics);
    $(gameMetricsRow).clone().appendTo(gameMetrics);
    $(gameCategoryValue).text(json['category']).attr("colspan",2).appendTo(gameMetrics);
      
    var gamePlayersHeader = document.createElement("th");
    var gameTimeHeader = document.createElement("th");
    var gamePlayers = document.createElement("td");
    var gameTime = document.createElement("td");   
    
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
    
    var baseUrl = '/media/images/game-icons/' + current_game_json.id + '/'
    var imageUrl = baseUrl + current_game_json["main-image"];
    
    var contentSection = $("#content");
    
    var gameTitle = $("<h1>").text(current_game_json["title"]).appendTo("#product-title");
    var gameImage = $("img").attr("src",imageUrl)
        .attr("id","product-gallery-main")
        .appendTo("#product-gallery");
    var gameMetrics = createGameMetrics(current_game_json);
    var gameSummary = $("<p>").html(current_game_json['full-summary'])
        .appendTo("#product-summary");
    
    var gameReviews = $("<ul>");
    var Reviews = current_game_json['review'];
    
    if (Reviews.length > 0) {
         for (var i = 0; i < Reviews.length; i++) {
            var ReviewEle = $("<a>").attr("href",Reviews[i].href ).text(Reviews[i].title);
            var Review = $("<li>").append(ReviewEle).appendTo(gameReviews);
        }  
        gameReviews.appendTo("#product-review");
    }

    var gameVendors = $("<ul>");
    var Vendors = current_game_json['vendor'];
    
    if (Vendors.length > 0) {
        for (var i = 0; i < Vendors.length; i++) {
            var VendorEle = $("<a>").attr("href",Vendors[i].href ).text(Vendors[i].title);
            var Review = $("<li>").append(VendorEle).appendTo(gameVendors);
        }
       gameVendors.appendTo("#product-vendor");        
    }

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