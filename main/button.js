$(window).ready(function(){
    $(".boton").wrapInner('<div class=botontext></div>');
    console.log("1st instruction passed");
    $(".botontext").clone().appendTo( $(".boton") );
    console.log("2nd instruction passed");       
    $(".boton").append('<span class="twist"></span>'); 
    $(".boton").append('<span class="twist"></span>'); 
    $(".boton").append('<span class="twist"></span>'); 
    $(".boton").append('<span class="twist"></span>'); 
    console.log("3rd instruction passed");       
    $(".twist").css("width", "25%").css("width", "+=3px");
    console.log("4th instruction passed"); 
    });    