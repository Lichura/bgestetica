scheduler.date.add_agenda=function(e){return scheduler.date.add(e,1,"year")},scheduler.templates.agenda_time=function(e,d,a){return a._timed?this.day_date(a.start_date,a.end_date,a)+" "+this.event_date(e):scheduler.templates.day_date(e)+" &ndash; "+scheduler.templates.day_date(d)},scheduler.templates.agenda_text=function(e,d,a){return a.text},scheduler.templates.agenda_date=function(){return""},scheduler.date.agenda_start=function(){return scheduler.date.date_part(scheduler._currentDate())},scheduler.attachEvent("onTemplatesReady",function(){function e(e){if(e){var d=scheduler.locale.labels;scheduler._els.dhx_cal_header[0].innerHTML="<div class='dhx_agenda_line'><div>"+d.date+"</div><span style='padding-left:25px'>"+d.description+"</span></div>",scheduler._table_view=!0,scheduler.set_sizes()}}function d(){var e=(scheduler._date,scheduler.get_visible_events());e.sort(function(e,d){return e.start_date>d.start_date?1:-1});for(var d="<div class='dhx_agenda_area'>",a=0;a<e.length;a++){var t=e[a],l=t.color?"background:"+t.color+";":"",s=t.textColor?"color:"+t.textColor+";":"",r=scheduler.templates.event_class(t.start_date,t.end_date,t);d+="<div class='dhx_agenda_line"+(r?" "+r:"")+"' event_id='"+t.id+"' style='"+s+l+(t._text_style||"")+"'><div class='dhx_agenda_event_time'>"+scheduler.templates.agenda_time(t.start_date,t.end_date,t)+"</div>",d+="<div class='dhx_event_icon icon_details'>&nbsp</div>",d+="<span>"+scheduler.templates.agenda_text(t.start_date,t.end_date,t)+"</span></div>"}d+="<div class='dhx_v_border'></div></div>",scheduler._els.dhx_cal_data[0].innerHTML=d,scheduler._els.dhx_cal_data[0].childNodes[0].scrollTop=scheduler._agendaScrollTop||0;var c=scheduler._els.dhx_cal_data[0].childNodes[0],_=c.childNodes[c.childNodes.length-1];_.style.height=c.offsetHeight<scheduler._els.dhx_cal_data[0].offsetHeight?"100%":c.offsetHeight+"px";var n=scheduler._els.dhx_cal_data[0].firstChild.childNodes;scheduler._els.dhx_cal_date[0].innerHTML=scheduler.templates.agenda_date(scheduler._min_date,scheduler._max_date,scheduler._mode),scheduler._rendered=[];for(var a=0;a<n.length-1;a++)scheduler._rendered[a]=n[a]}var a=scheduler.dblclick_dhx_cal_data;scheduler.dblclick_dhx_cal_data=function(){if("agenda"==this._mode)!this.config.readonly&&this.config.dblclick_create&&this.addEventNow();else if(a)return a.apply(this,arguments)},scheduler.attachEvent("onSchedulerResize",function(){return"agenda"==this._mode?(this.agenda_view(!0),!1):!0});var t=scheduler.render_data;scheduler.render_data=function(){return"agenda"!=this._mode?t.apply(this,arguments):void d()};var l=scheduler.render_view_data;scheduler.render_view_data=function(){return"agenda"==this._mode&&(scheduler._agendaScrollTop=scheduler._els.dhx_cal_data[0].childNodes[0].scrollTop,scheduler._els.dhx_cal_data[0].childNodes[0].scrollTop=0),l.apply(this,arguments)},scheduler.agenda_view=function(a){scheduler._min_date=scheduler.config.agenda_start||scheduler.date.agenda_start(scheduler._date),scheduler._max_date=scheduler.config.agenda_end||scheduler.date.add_agenda(scheduler._min_date,1),scheduler._table_view=!0,e(a),a&&d()}});