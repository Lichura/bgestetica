scheduler.config.occurrence_timestamp_in_utc=!1,scheduler.config.recurring_workdays=[1,2,3,4,5],scheduler.form_blocks.recurring={_get_node:function(e){return"string"==typeof e&&(e=document.getElementById(e)),"none"==e.style.display&&(e.style.display=""),e},_outer_html:function(e){function t(e){var t,r=document.createElement("div");return r.appendChild(e.cloneNode(!0)),t=r.innerHTML,r=null,t}return e.outerHTML||t(e)},render:function(e){if(e.form){var t=scheduler.form_blocks.recurring,r=t._get_node(e.form),a=t._outer_html(r);return r.style.display="none",a}return scheduler.__recurring_template},_ds:{},_get_form_node:function(e,t,r){var a=e[t];if(!a)return null;if(a.nodeName)return a;if(a.length)for(var n=0;n<a.length;n++)if(a[n].value==r)return a[n]},_get_node_value:function(e,t,r){var a=e[t];if(!a)return"";if(a.length){if(r){for(var n=[],_=0;_<a.length;_++)a[_].checked&&n.push(a[_].value);return n}for(var _=0;_<a.length;_++)if(a[_].checked)return a[_].value}return a.value?r?[a.value]:a.value:void 0},_set_node_value:function(e,t,r){var a=e[t];if(a)if(a.name==t)a.value=r;else if(a.length)for(var n="object"==typeof r,_=0;_<a.length;_++)(n||a[_].value==r)&&(a[_].checked=n?!!r[a[_].value]:!!r)},_init_set_value:function(e,t,r){function a(e){for(var t=0;t<e.length;t++){var r=e[t];if(r.name)if(f[r.name])if(f[r.name].nodeType){var a=f[r.name];f[r.name]=[a,r]}else f[r.name].push(r);else f[r.name]=r}}function n(){g("dhx_repeat_day").style.display="none",g("dhx_repeat_week").style.display="none",g("dhx_repeat_month").style.display="none",g("dhx_repeat_year").style.display="none",g("dhx_repeat_"+this.value).style.display="block",scheduler.setLightboxSize()}function _(e){var t=[c(f,"repeat")];for(m[t[0]](t,e);t.length<5;)t.push("");var r="",a=s(f);if("no"==a)e.end=new Date(9999,1,1),r="no";else if("date_of_end"==a)e.end=h(c(f,"date_of_end"));else{scheduler.transpose_type(t.join("_")),r=Math.max(1,c(f,"occurences_count"));var n=0;e.end=scheduler.date.add(new Date(e.start),r+n,t.join("_"))}return t.join("_")+"#"+r}function s(e){var t=e.end;if(t.length){for(var r=0;r<t.length;r++)if(t[r].checked)return t[r].value&&"on"!=t[r].value?t[r].value:r?2==r?"date_of_end":"occurences_count":"no"}else if(t.value)return t.value;return"no"}function d(e,t){var r=e.end;if(r.length){var a=!!r[0].value&&"on"!=r[0].value;if(a)for(var n=0;n<r.length;n++)r[n].value==t&&(r[n].checked=!0);else{var _=0;switch(t){case"no":_=0;break;case"date_of_end":_=2;break;default:_=1}r[_].checked=!0}}else r.value=t}function l(e,t){var r=scheduler.form_blocks.recurring._set_node_value,a=e.split("#");switch(e=a[0].split("_"),b[e[0]](e,t),a[1]){case"no":d(f,"no");break;case"":d(f,"date_of_end");var n=t.end;scheduler.config.include_end_by&&(n=scheduler.date.add(n,-1,"day")),r(f,"date_of_end",p(n));break;default:d(f,"occurences_count"),r(f,"occurences_count",a[1])}r(f,"repeat",e[0]);var _=scheduler.form_blocks.recurring._get_form_node(f,"repeat",e[0]);"SELECT"==_.nodeName&&_.onchange?_.onchange():_.onclick&&_.onclick()}var i=scheduler.form_blocks.recurring,c=i._get_node_value,o=i._set_node_value;scheduler.form_blocks.recurring._ds={start:r.start_date,end:r._end_date};var u=scheduler.date.str_to_date(scheduler.config.repeat_date),h=function(e){var t=u(e);return scheduler.config.include_end_by&&(t=scheduler.date.add(t,1,"day")),t},p=scheduler.date.date_to_str(scheduler.config.repeat_date),v=e.getElementsByTagName("FORM")[0],f={};if(a(v.getElementsByTagName("INPUT")),a(v.getElementsByTagName("SELECT")),!scheduler.config.repeat_date_of_end){var y=scheduler.date.date_to_str(scheduler.config.repeat_date);scheduler.config.repeat_date_of_end=y(scheduler.date.add(scheduler._currentDate(),30,"day"))}o(f,"date_of_end",scheduler.config.repeat_date_of_end);var g=function(e){return document.getElementById(e)||{style:{}}};scheduler.form_blocks.recurring._get_repeat_code=_;var m={month:function(e,t){var r=scheduler.form_blocks.recurring._get_node_value;"d"==r(f,"month_type")?(e.push(Math.max(1,r(f,"month_count"))),t.start.setDate(r(f,"month_day"))):(e.push(Math.max(1,r(f,"month_count2"))),e.push(r(f,"month_day2")),e.push(Math.max(1,r(f,"month_week2"))),scheduler.config.repeat_precise||t.start.setDate(1)),t._start=!0},week:function(e,t){var r=scheduler.form_blocks.recurring._get_node_value;e.push(Math.max(1,r(f,"week_count"))),e.push(""),e.push("");for(var a=[],n=r(f,"week_day",!0),_=t.start.getDay(),s=!1,d=0;d<n.length;d++)a.push(n[d]),s=s||n[d]==_;a.length||(a.push(_),s=!0),a.sort(),scheduler.config.repeat_precise?s||(scheduler.transpose_day_week(t.start,a,1,7),t._start=!0):(t.start=scheduler.date.week_start(t.start),t._start=!0),e.push(a.join(","))},day:function(e){var t=scheduler.form_blocks.recurring._get_node_value;"d"==t(f,"day_type")?e.push(Math.max(1,t(f,"day_count"))):(e.push("week"),e.push(1),e.push(""),e.push(""),e.push(scheduler.config.recurring_workdays.join(",")),e.splice(0,1))},year:function(e,t){var r=scheduler.form_blocks.recurring._get_node_value;"d"==r(f,"year_type")?(e.push("1"),t.start.setMonth(0),t.start.setDate(r(f,"year_day")),t.start.setMonth(r(f,"year_month"))):(e.push("1"),e.push(r(f,"year_day2")),e.push(r(f,"year_week2")),t.start.setDate(1),t.start.setMonth(r(f,"year_month2"))),t._start=!0}},b={week:function(e){var t=scheduler.form_blocks.recurring._set_node_value;t(f,"week_count",e[1]);for(var r=e[4].split(","),a={},n=0;n<r.length;n++)a[r[n]]=!0;t(f,"week_day",a)},month:function(e,t){var r=scheduler.form_blocks.recurring._set_node_value;""===e[2]?(r(f,"month_type","d"),r(f,"month_count",e[1]),r(f,"month_day",t.start.getDate())):(r(f,"month_type","w"),r(f,"month_count2",e[1]),r(f,"month_week2",e[3]),r(f,"month_day2",e[2]))},day:function(e){var t=scheduler.form_blocks.recurring._set_node_value;t(f,"day_type","d"),t(f,"day_count",e[1])},year:function(e,t){var r=scheduler.form_blocks.recurring._set_node_value;""===e[2]?(r(f,"year_type","d"),r(f,"year_day",t.start.getDate()),r(f,"year_month",t.start.getMonth())):(r(f,"year_type","w"),r(f,"year_week2",e[3]),r(f,"year_day2",e[2]),r(f,"year_month2",t.start.getMonth()))}};scheduler.form_blocks.recurring._set_repeat_code=l;for(var k=0;k<v.elements.length;k++){var x=v.elements[k];switch(x.name){case"repeat":"SELECT"==x.nodeName?x.onchange=n:x.onclick=n}}scheduler._lightbox._rec_init_done=!0},set_value:function(e,t,r){var a=scheduler.form_blocks.recurring;scheduler._lightbox._rec_init_done||a._init_set_value(e,t,r),e.open=!r.rec_type,this._is_modified_occurence(r)?e.blocked=!0:e.blocked=!1;var n=a._ds;n.start=r.start_date,n.end=r._end_date,a.button_click(0,e.previousSibling.firstChild.firstChild,e,e),t&&a._set_repeat_code(t,n)},get_value:function(e,t){if(e.open){var r=scheduler.form_blocks.recurring._ds,a={};this.formSection("time").getValue(a),r.start=a.start_date,t.rec_type=scheduler.form_blocks.recurring._get_repeat_code(r),r._start?(t.start_date=new Date(r.start),t._start_date=new Date(r.start),r._start=!1):t._start_date=null,t._end_date=r.end,t.rec_pattern=t.rec_type.split("#")[0]}else t.rec_type=t.rec_pattern="",t._end_date=t.end_date;return t.rec_type},_get_button:function(){var e=scheduler.formSection("recurring").header;return e.firstChild.firstChild},_get_form:function(){return scheduler.formSection("recurring").node},open:function(){var e=scheduler.form_blocks.recurring,t=e._get_form();t.open||e._toggle_block()},close:function(){var e=scheduler.form_blocks.recurring,t=e._get_form();t.open&&e._toggle_block()},_toggle_block:function(){var e=scheduler.form_blocks.recurring,t=e._get_form(),r=e._get_button();t.open||t.blocked?(t.style.height="0px",r&&(r.style.backgroundPosition="-5px 20px",r.nextSibling.innerHTML=scheduler.locale.labels.button_recurring)):(t.style.height="auto",r&&(r.style.backgroundPosition="-5px 0px",r.nextSibling.innerHTML=scheduler.locale.labels.button_recurring_open)),t.open=!t.open,scheduler.setLightboxSize()},focus:function(){},button_click:function(){scheduler.form_blocks.recurring._toggle_block()}},scheduler._rec_markers={},scheduler._rec_markers_pull={},scheduler._add_rec_marker=function(e,t){e._pid_time=t,this._rec_markers[e.id]=e,this._rec_markers_pull[e.event_pid]||(this._rec_markers_pull[e.event_pid]={}),this._rec_markers_pull[e.event_pid][t]=e},scheduler._get_rec_marker=function(e,t){var r=this._rec_markers_pull[t];return r?r[e]:null},scheduler._get_rec_markers=function(e){return this._rec_markers_pull[e]||[]},scheduler._rec_temp=[],function(){var e=scheduler.addEvent;scheduler.addEvent=function(){var t=e.apply(this,arguments);if(t){var r=scheduler.getEvent(t);this._is_modified_occurence(r)&&scheduler._add_rec_marker(r,1e3*r.event_length),r.rec_type&&(r.rec_pattern=r.rec_type.split("#")[0])}return t}}(),scheduler.attachEvent("onEventIdChange",function(e,t){if(!this._ignore_call){this._ignore_call=!0,scheduler._rec_markers[e]&&(scheduler._rec_markers[t]=scheduler._rec_markers[e],delete scheduler._rec_markers[e]);for(var r=0;r<this._rec_temp.length;r++){var a=this._rec_temp[r];a.event_pid==e&&(a.event_pid=t,this.changeEventId(a.id,t+"#"+a.id.split("#")[1]))}delete this._ignore_call}}),scheduler.attachEvent("onConfirmedBeforeEventDelete",function(e){var t=this.getEvent(e);if(this._is_virtual_event(e)||this._is_modified_occurence(t)&&t.rec_type&&"none"!=t.rec_type){e=e.split("#");var r=this.uid(),a=e[1]?e[1]:t._pid_time/1e3,n=this._copy_event(t);n.id=r,n.event_pid=t.event_pid||e[0];var _=a;n.event_length=_,n.rec_type=n.rec_pattern="none",this.addEvent(n),this._add_rec_marker(n,1e3*_)}else{t.rec_type&&this._lightbox_id&&this._roll_back_dates(t);var s=this._get_rec_markers(e);for(var d in s)s.hasOwnProperty(d)&&(e=s[d].id,this.getEvent(e)&&this.deleteEvent(e,!0))}return!0}),scheduler.attachEvent("onEventDeleted",function(e,t){!this._is_virtual_event(e)&&this._is_modified_occurence(t)&&(scheduler._events[e]||(t.rec_type=t.rec_pattern="none",this.setEvent(e,t)))}),scheduler.attachEvent("onEventChanged",function(e){if(this._loading)return!0;var t=this.getEvent(e);if(this._is_virtual_event(e)){var e=e.split("#"),r=this.uid();this._not_render=!0;var a=this._copy_event(t);a.id=r,a.event_pid=e[0];var n=e[1];a.event_length=n,a.rec_type=a.rec_pattern="",this._add_rec_marker(a,1e3*n),this.addEvent(a),this._not_render=!1}else{t.rec_type&&this._lightbox_id&&this._roll_back_dates(t);var _=this._get_rec_markers(e);for(var s in _)_.hasOwnProperty(s)&&(delete this._rec_markers[_[s].id],this.deleteEvent(_[s].id,!0));delete this._rec_markers_pull[e];for(var d=!1,l=0;l<this._rendered.length;l++)this._rendered[l].getAttribute("event_id")==e&&(d=!0);d||(this._select_id=null)}return!0}),scheduler.attachEvent("onEventAdded",function(e){if(!this._loading){var t=this.getEvent(e);t.rec_type&&!t.event_length&&this._roll_back_dates(t)}return!0}),scheduler.attachEvent("onEventSave",function(e,t){var r=this.getEvent(e);return r.rec_type||!t.rec_type||this._is_virtual_event(e)||(this._select_id=null),!0}),scheduler.attachEvent("onEventCreated",function(e){var t=this.getEvent(e);return t.rec_type||(t.rec_type=t.rec_pattern=t.event_length=t.event_pid=""),!0}),scheduler.attachEvent("onEventCancel",function(e){var t=this.getEvent(e);t.rec_type&&(this._roll_back_dates(t),this.render_view_data())}),scheduler._roll_back_dates=function(e){e.event_length=(e.end_date.valueOf()-e.start_date.valueOf())/1e3,e.end_date=e._end_date,e._start_date&&(e.start_date.setMonth(0),e.start_date.setDate(e._start_date.getDate()),e.start_date.setMonth(e._start_date.getMonth()),e.start_date.setFullYear(e._start_date.getFullYear()))},scheduler._is_virtual_event=function(e){return-1!=e.toString().indexOf("#")},scheduler._is_modified_occurence=function(e){return e.event_pid&&"0"!=e.event_pid},scheduler._validId=function(e){return!this._is_virtual_event(e)},scheduler.showLightbox_rec=scheduler.showLightbox,scheduler.showLightbox=function(e){var t=this.locale,r=scheduler.config.lightbox_recurring,a=this.getEvent(e),n=a.event_pid,_=this._is_virtual_event(e);_&&(n=e.split("#")[0]);var s=function(e){var t=scheduler.getEvent(e);return t._end_date=t.end_date,t.end_date=new Date(t.start_date.valueOf()+1e3*t.event_length),scheduler.showLightbox_rec(e)};if((n||1*n===0)&&a.rec_type)return s(e);if(!n||"0"===n||!t.labels.confirm_recurring||"instance"==r||"series"==r&&!_)return this.showLightbox_rec(e);if("ask"==r){var d=this;dhtmlx.modalbox({text:t.labels.confirm_recurring,title:t.labels.title_confirm_recurring,width:"500px",position:"middle",buttons:[t.labels.button_edit_series,t.labels.button_edit_occurrence,t.labels.icon_cancel],callback:function(t){switch(+t){case 0:return s(n);case 1:return d.showLightbox_rec(e);case 2:return}}})}else s(n)},scheduler.get_visible_events_rec=scheduler.get_visible_events,scheduler.get_visible_events=function(e){for(var t=0;t<this._rec_temp.length;t++)delete this._events[this._rec_temp[t].id];this._rec_temp=[];for(var r=this.get_visible_events_rec(e),a=[],t=0;t<r.length;t++)r[t].rec_type?"none"!=r[t].rec_pattern&&this.repeat_date(r[t],a):a.push(r[t]);return a},function(){var e=scheduler.isOneDayEvent;scheduler.isOneDayEvent=function(t){return t.rec_type?!0:e.call(this,t)};var t=scheduler.updateEvent;scheduler.updateEvent=function(e){var r=scheduler.getEvent(e);r&&r.rec_type&&(r.rec_pattern=(r.rec_type||"").split("#")[0]),r&&r.rec_type&&!this._is_virtual_event(e)?scheduler.update_view():t.call(this,e)}}(),scheduler.transponse_size={day:1,week:7,month:1,year:12},scheduler.date.day_week=function(e,t,r){e.setDate(1),r=7*(r-1);var a=e.getDay(),n=1*t+r-a+1;e.setDate(r>=n?n+7:n)},scheduler.transpose_day_week=function(e,t,r,a,n){for(var _=(e.getDay()||(scheduler.config.start_on_monday?7:0))-r,s=0;s<t.length;s++)if(t[s]>_)return e.setDate(e.getDate()+1*t[s]-_-(a?r:n));this.transpose_day_week(e,t,r+a,null,r)},scheduler.transpose_type=function(e){var t="transpose_"+e;if(!this.date[t]){var r=e.split("_"),a=864e5,n="add_"+e,_=this.transponse_size[r[0]]*r[1];if("day"==r[0]||"week"==r[0]){var s=null;if(r[4]&&(s=r[4].split(","),scheduler.config.start_on_monday)){for(var d=0;d<s.length;d++)s[d]=1*s[d]||7;s.sort()}this.date[t]=function(e,t){var r=Math.floor((t.valueOf()-e.valueOf())/(a*_));r>0&&e.setDate(e.getDate()+r*_),s&&scheduler.transpose_day_week(e,s,1,_)},this.date[n]=function(e,t){var r=new Date(e.valueOf());if(s)for(var a=0;t>a;a++)scheduler.transpose_day_week(r,s,0,_);else r.setDate(r.getDate()+t*_);return r}}else("month"==r[0]||"year"==r[0])&&(this.date[t]=function(e,t){var a=Math.ceil((12*t.getFullYear()+1*t.getMonth()-(12*e.getFullYear()+1*e.getMonth()))/_);a>=0&&e.setMonth(e.getMonth()+a*_),r[3]&&scheduler.date.day_week(e,r[2],r[3])},this.date[n]=function(e,t){var a=new Date(e.valueOf());return a.setMonth(a.getMonth()+t*_),r[3]&&scheduler.date.day_week(a,r[2],r[3]),a})}},scheduler.repeat_date=function(e,t,r,a,n){a=a||this._min_date,n=n||this._max_date;var _=new Date(e.start_date.valueOf());for(!e.rec_pattern&&e.rec_type&&(e.rec_pattern=e.rec_type.split("#")[0]),this.transpose_type(e.rec_pattern),scheduler.date["transpose_"+e.rec_pattern](_,a);_<e.start_date||scheduler._fix_daylight_saving_date(_,a,e,_,new Date(_.valueOf()+1e3*e.event_length)).valueOf()<=a.valueOf()||_.valueOf()+1e3*e.event_length<=a.valueOf();)_=this.date.add(_,1,e.rec_pattern);for(;n>_&&_<e.end_date;){var s=scheduler.config.occurrence_timestamp_in_utc?Date.UTC(_.getFullYear(),_.getMonth(),_.getDate(),_.getHours(),_.getMinutes(),_.getSeconds()):_.valueOf(),d=this._get_rec_marker(s,e.id);if(d)r&&t.push(d);else{var l=new Date(_.valueOf()+1e3*e.event_length),i=this._copy_event(e);if(i.text=e.text,i.start_date=_,i.event_pid=e.id,i.id=e.id+"#"+Math.ceil(s/1e3),i.end_date=l,i.end_date=scheduler._fix_daylight_saving_date(i.start_date,i.end_date,e,_,i.end_date),i._timed=this.isOneDayEvent(i),!i._timed&&!this._table_view&&!this.config.multi_day)return;t.push(i),r||(this._events[i.id]=i,this._rec_temp.push(i))}_=this.date.add(_,1,e.rec_pattern)}},scheduler._fix_daylight_saving_date=function(e,t,r,a,n){var _=e.getTimezoneOffset()-t.getTimezoneOffset();return new Date(_?_>0?a.valueOf()+1e3*r.event_length-60*_*1e3:t.valueOf()-60*_*1e3:n.valueOf())},scheduler.getRecDates=function(e,t){var r="object"==typeof e?e:scheduler.getEvent(e),a=0,n=[];t=t||100;var _=new Date(r.start_date.valueOf()),s=new Date(_.valueOf());if(!r.rec_type)return[{start_date:r.start_date,end_date:r.end_date}];if("none"==r.rec_type)return[];for(this.transpose_type(r.rec_pattern),scheduler.date["transpose_"+r.rec_pattern](_,s);_<r.start_date||_.valueOf()+1e3*r.event_length<=s.valueOf();)_=this.date.add(_,1,r.rec_pattern);for(;_<r.end_date;){var d=this._get_rec_marker(_.valueOf(),r.id),l=!0;if(d)"none"==d.rec_type?l=!1:n.push({start_date:d.start_date,end_date:d.end_date});else{var i=new Date(_),c=new Date(_.valueOf()+1e3*r.event_length);c=scheduler._fix_daylight_saving_date(i,c,r,_,c),n.push({start_date:i,end_date:c})}if(_=this.date.add(_,1,r.rec_pattern),l&&(a++,a==t))break}return n},scheduler.getEvents=function(e,t){var r=[];for(var a in this._events){var n=this._events[a];if(n&&n.start_date<t&&n.end_date>e)if(n.rec_pattern){if("none"==n.rec_pattern)continue;var _=[];this.repeat_date(n,_,!0,e,t);for(var s=0;s<_.length;s++)!_[s].rec_pattern&&_[s].start_date<t&&_[s].end_date>e&&!this._rec_markers[_[s].id]&&r.push(_[s])}else this._is_virtual_event(n.id)||r.push(n)}return r},scheduler.config.repeat_date="%m.%d.%Y",scheduler.config.lightbox.sections=[{name:"description",height:130,map_to:"text",type:"textarea",focus:!0},{name:"recurring",type:"recurring",map_to:"rec_type",button:"recurring"},{name:"time",height:72,type:"time",map_to:"auto"}],scheduler._copy_dummy=function(){var e=new Date(this.start_date),t=new Date(this.end_date);this.start_date=e,this.end_date=t,this.event_length=this.event_pid=this.rec_pattern=this.rec_type=null},scheduler.config.include_end_by=!1,scheduler.config.lightbox_recurring="ask",scheduler.attachEvent("onClearAll",function(){scheduler._rec_markers={},scheduler._rec_markers_pull={},scheduler._rec_temp=[]}),scheduler.__recurring_template='<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />Daily</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>Weekly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />Monthly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />Yearly</label> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />day<br /> <label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>Every workday</label> </div> <div style="display:none;" id="dhx_repeat_week"> Repeat every<input class="dhx_repeat_text" type="text" name="week_count" value="1" />week next days:<br /> <table class="dhx_repeat_days"> <tr> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />Monday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />Thursday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />Tuesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />Friday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />Wednesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />Saturday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />Sunday</label><br /><br /> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <label><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>Repeat</label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />day every<input class="dhx_repeat_text" type="text" name="month_count" value="1" />month<br /> <label><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><select name="month_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="0">Sunday</select>every<input class="dhx_repeat_text" type="text" name="month_count2" value="1" />month<br /> </div> <div style="display:none;" id="dhx_repeat_year"> <label><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />day<select name="year_month"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select>month<br /> <label><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="7">Sunday</select>of<select name="year_month2"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select><br /> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <label><input class="dhx_repeat_radio" type="radio" name="end" checked/>No end date</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />After</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />occurrences<br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />End by</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="'+scheduler.config.repeat_date_of_end+'" /><br /> </div> </form> </div> <div style="clear:both"> </div>';