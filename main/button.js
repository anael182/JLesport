jQuery(function(){
    $(".boton").wrapInner('<div class=botontext></div>');
    $(".botontext").clone().appendTo($(".boton"));
    $(".boton").append('<span class="twist"></span><span class="twist"></span><span class="twist"></span><span class="twist"></span>');
    $(".twist").css("width", "25%").css("width", "+=3px");
    }
);
console.log("I've been loaded correctly");