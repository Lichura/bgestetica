$(document).ready(function(){
	$(window).scroll(function(){
		var windows = $(window).scrollTop() 
		    $('.tratamientos-imagenes').each( function(i){
	            var object = $(this).offset().top
	            if( windows = object ){
	                $(this).addClass('mostrar');
	            }
        }); 
	});
});