/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in not GPL project. Please contact sales@dhtmlx.com for details
*/

scheduler.config.limit_start=new Date(-3999,0,0);scheduler.config.limit_end=new Date(3999,0,0);scheduler.config.limit_view=!1;
(function(){var g=null,k={},l={},m=!1;scheduler.blockTime=function(b,a){var c=this.config.first_hour*60,d=this.config.last_hour*60;a=="fullday"&&(a=[c,d]);typeof b=="object"?k[this.date.date_part(b).valueOf()]=a:l[b]=a;for(var e=0;e<a.length;e+=2)a[e]<c&&(a[e]=c),a[e+1]>d&&(a[e+1]=d);m=!0};scheduler.attachEvent("onScaleAdd",function(b,a){var c=k[a.valueOf()]||l[a.getDay()];if(c)for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],h=document.createElement("DIV");h.className="dhx_time_block";var j;h.style.top=
Math.round((e*6E4-this.config.first_hour*36E5)*this.config.hour_size_px/36E5)%(this.config.hour_size_px*24)+"px";h.style.height=Math.round((f-e-1)*6E4*this.config.hour_size_px/36E5)%(this.config.hour_size_px*24)+"px";b.appendChild(h)}});scheduler.attachEvent("onBeforeViewChange",function(b,a,c,d){d=d||a;c=c||b;return scheduler.config.limit_view&&(d.valueOf()>scheduler.config.limit_end.valueOf()||this.date.add(d,1,c)<=scheduler.config.limit_start.valueOf())?(setTimeout(function(){scheduler.setCurrentView(scheduler._date,
c)},1),!1):!0});var f=function(b){var a=scheduler.config,c=b.start_date.valueOf()>=a.limit_start.valueOf()&&b.end_date.valueOf()<=a.limit_end.valueOf();if(c&&m&&b._timed){var d=scheduler.date.date_part(new Date(b.start_date.valueOf())),e=k[d.valueOf()]||l[d.getDay()],f=b.start_date.getHours()*60+b.start_date.getMinutes(),h=b.end_date.getHours()*60+b.end_date.getMinutes();if(e)for(var j=0;j<e.length;j+=2){var g=e[j],i=e[j+1];if(g<h&&i>f){if(f<=i&&f>=g){if(i==1440||h<i){c=!1;break}if(scheduler._drag_id&&
scheduler._drag_mode=="new-size")b.start_date.setHours(0),b.start_date.setMinutes(i);else{c=!1;break}}if(h>=g&&h<i)if(scheduler._drag_id&&scheduler._drag_mode=="new-size")b.end_date.setHours(0),b.end_date.setMinutes(g);else{c=!1;break}}}}if(!c)scheduler._drag_id=null,scheduler._drag_mode=null,scheduler.callEvent("onLimitViolation",[b.id,b]);return c};scheduler.attachEvent("onBeforeDrag",function(b){return!b?!0:f(scheduler.getEvent(b))});scheduler.attachEvent("onClick",function(b){return f(scheduler.getEvent(b))});
scheduler.attachEvent("onBeforeLightbox",function(b){var a=scheduler.getEvent(b);g=[a.start_date,a.end_date];return f(a)});scheduler.attachEvent("onEventAdded",function(b){if(!b)return!0;var a=scheduler.getEvent(b);if(!f(a)){if(a.start_date<scheduler.config.limit_start)a.start_date=new Date(scheduler.config.limit_start);if(a.start_date.valueOf()>=scheduler.config.limit_end.valueOf())a.start_date=this.date.add(scheduler.config.limit_end,-1,"day");if(a.end_date<scheduler.config.limit_start)a.end_date=
new Date(scheduler.config.limit_start);if(a.end_date.valueOf()>=scheduler.config.limit_end.valueOf())a.end_date=this.date.add(scheduler.config.limit_end,-1,"day");if(a.start_date.valueOf()>=a.end_date.valueOf())a.end_date=this.date.add(a.start_date,this.config.event_duration||this.config.time_step,"minute");a._timed=this.is_one_day_event(a)}return!0});scheduler.attachEvent("onEventChanged",function(b){if(!b)return!0;var a=scheduler.getEvent(b);if(!f(a)){if(!g)return!1;a.start_date=g[0];a.end_date=
g[1];a._timed=this.is_one_day_event(a)}return!0});scheduler.attachEvent("onBeforeEventChanged",function(b){return f(b)})})();
