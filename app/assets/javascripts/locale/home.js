$(document).ready(function(){

$('.tratamientos-imagenes').each(function(){
	var imagen = $(this).offset().top;
		$(window).scroll(function(){
			var y = $(window).scrollTop();
				if (y >= imagen){
					$(this).addClass('mostrar');
				}
			});
		});	
});




