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

$(document).ready(function(){
   console.log("start point...") 
})