

function getGamesData() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            return JSON.parse(xhttp.responseText);
        }
    };     
    xhttp.open("GET", "/data/games.json", true);
    xhttp.send();
}