'use strict'

var games = {
    "gloomhaven" : {
        "title" : "Gloomhaven"
    },
    "pandemic" : {
        "title" : "Pandemic"
    }
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

$(document).ready(function(){
    var current_game = getUrlParameter('game');
    if (games.hasOwnProperty(current_game)) {
        $("#content").html("<h1>" + games[current_game].title + "</h1>")
    } else {
        window.location.replace("/pages/error/404.html")
    }
});