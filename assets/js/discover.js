'use strict'

function createGame(json) {
    
    var contentPage = $("#discover-tool");
    var baseUrl = '/media/images/game-icons/' + json.id + '/'
    
    var image = baseUrl + json["main-image"];
    var product_url = "/pages/product.html?game=" + json.id;
    
    var gameFrame = document.createElement("div");
    var gameTitle = document.createElement("h1");
    var gameLink = document.createElement("a");
    var gameImage = document.createElement("img");
    
    $(gameFrame).addClass("col-s-12 col-m-6 col-l-4");
    $(gameTitle).text(json.title).appendTo(gameFrame);
    $(gameLink).attr("href",product_url)
        .appendTo(gameFrame);
    $(gameImage).addClass("col-s-12 col-m-12 col-l-12")
        .attr("src",image).appendTo(gameLink);
    $(gameFrame).appendTo(contentPage);
    
    json['gallery'].forEach(function(e){
        e.href = baseUrl + e.href;
    })
    
    $(gameLink).click( function( e ) {
        e.preventDefault();
        $.swipebox(json['gallery']);
    });

    
    
    return 0;
}

function createProductSearch(json){
    for (var key in json){
        if (json.hasOwnProperty(key)){
            var game = json[key];
            createGame(game);
        }
    }
}

function getGameData() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('hello world');
           var gameData = JSON.parse(xhttp.responseText);
            alert(gameData);
           createProductSearch(gameData);
        } else if (this.readyState == 4 && this.status != 200) {
            window.replace('/pages/error/404.html');
        }
    };     
    xhttp.open("GET", "/data/games.json", true);
    xhttp.send();
}

$(document).ready(function(){
    getGameData();
})
