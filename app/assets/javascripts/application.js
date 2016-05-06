// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-datepicker
//= require moment
//= require_tree .

	$(document).ready(function(){

		var availableDates = ["5-5-2016","6-5-2016"];
		var eventDates = {};
		eventDates[ new Date( '05/10/2016')] = new Date('05/10/2016');
		$(function()
		{
		    $('#txtDate').datepicker({ beforeShowDay:
		      //function(dt)
		      //{ 
		      //  return [dt.getDay() == 0 || dt.getDay() == 6 || available(dt), "" ];
		      //},
		      function( date ) {
                var highlight = eventDates[date];
                if( highlight ) {
                     return [true, "event", "highlight"];
                } else {
                     return [true, '', ''];
                }
             },
			 changeMonth: true, 
		     changeYear: false, 
		     todayHighlight: true,
		 	 autoclose: true,
		 	 weekStart: true});
		});



		function available(date) {
		  dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
		  if ($.inArray(dmy, availableDates) != -1) {
		    return true;
		  } else {
		    return false;
		  }
		}

	});