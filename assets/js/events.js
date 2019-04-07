'use strict'

$(document).ready(function(){
    
     $(window).resize(function(e){
        if ($("#triple_bar").css("display") == "none" ){
            $("#menu-bar").show();
        }
     });    

    $("#triple_bar").click(function(e){
        $("#menu-bar").fadeToggle();
    });
    
});