/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details
*/

(function(){scheduler.config.fix_tab_position=!0;scheduler.config.use_select_menu_space=!0;scheduler.config.hour_size_px=44;scheduler.xy.nav_height=59;scheduler.xy.bar_height=24;scheduler.config.wide_form=!0;scheduler.xy.lightbox_additional_height=90;scheduler.config.displayed_event_color="#ff4a4a";scheduler.config.displayed_event_text_color="#ffef80";scheduler.templates.event_bar_date=function(c){return"\u2022 <b>"+scheduler.templates.event_date(c)+"</b> "};scheduler.attachEvent("onLightbox",function(){for(var c=
scheduler.getLightbox(),d=c.getElementsByTagName("div"),b=0;b<d.length;b++){var e=d[b];if(e.className=="dhx_close_icon"){e.onclick=function(){scheduler.endLightbox(!1,c)};break}}});scheduler._lightbox_template="<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span><div class='dhx_close_icon'></div></div><div class='dhx_cal_larea'></div>";scheduler.attachEvent("onTemplatesReady",function(){var c=scheduler.date.date_to_str("%d"),
d=scheduler.templates.month_day;scheduler.templates.month_day=function(a){if(this._mode=="month"){var b=c(a);a.getDate()==1&&(b=scheduler.locale.date.month_full[a.getMonth()]+" "+b);+a==+scheduler.date.date_part(new Date)&&(b=scheduler.locale.labels.dhx_cal_today_button+" "+b);return b}else return d.call(this,a)};if(scheduler.config.fix_tab_position)for(var b=scheduler._els.dhx_cal_navline[0].getElementsByTagName("div"),e=[],f=211,g=0;g<b.length;g++){var a=b[g],h=a.getAttribute("name");if(h)switch(a.style.right=
"auto",h){case "day_tab":a.style.left="14px";a.className+=" dhx_cal_tab_first";break;case "week_tab":a.style.left="75px";break;case "month_tab":a.style.left="136px";a.className+=" dhx_cal_tab_last";break;default:a.style.left=f+"px",a.className+=" dhx_cal_tab_standalone",f=f+14+a.offsetWidth}}})})();
