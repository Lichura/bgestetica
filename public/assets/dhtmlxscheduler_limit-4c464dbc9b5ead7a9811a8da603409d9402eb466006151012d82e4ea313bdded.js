scheduler.config.limit_start=null,scheduler.config.limit_end=null,scheduler.config.limit_view=!1,scheduler.config.check_limits=!0,scheduler.config.mark_now=!0,scheduler.config.display_marked_timespans=!0,scheduler._temp_limit_scope=function(){function e(e,t,r,s,a){var n=scheduler,d=[],i={_props:"map_to",matrix:"y_property"};for(var _ in i){var l=i[_];if(n[_])for(var c in n[_]){var h=n[_][c][l];e[h]&&(d=n._add_timespan_zones(d,scheduler._get_blocked_zones(t[c],e[h],r,s,a)))}}return d=n._add_timespan_zones(d,scheduler._get_blocked_zones(t,"global",r,s,a))}var t=null,r="dhx_time_block",s="default",a=function(e,t,r){return t instanceof Date&&r instanceof Date?(e.start_date=t,e.end_date=r):(e.days=t,e.zones=r),e},n=function(e,t,s){var n="object"==typeof e?e:{days:e};return n.type=r,n.css="",t&&(s&&(n.sections=s),n=a(n,e,t)),n};scheduler.blockTime=function(e,t,r){var s=n(e,t,r);return scheduler.addMarkedTimespan(s)},scheduler.unblockTime=function(e,t,r){var s=n(e,t=t||"fullday",r);return scheduler.deleteMarkedTimespan(s)},scheduler.attachEvent("onBeforeViewChange",function(e,t,r,s){function a(e,t){var r=scheduler.config.limit_start,s=scheduler.config.limit_end,a=scheduler.date.add(e,1,t);return e.valueOf()>s.valueOf()||a<=r.valueOf()}return!scheduler.config.limit_view||!a(s=s||t,r=r||e)||t.valueOf()==s.valueOf()||(setTimeout(function(){var e=a(t,r)?scheduler.config.limit_start:t;scheduler.setCurrentView(a(e,r)?null:e,r)},1),!1)}),scheduler.checkInMarkedTimespan=function(t,r,a){r=r||s;for(var n=!0,d=new Date(t.start_date.valueOf()),i=scheduler.date.add(d,1,"day"),_=scheduler._marked_timespans;d<t.end_date;d=scheduler.date.date_part(i),i=scheduler.date.add(d,1,"day")){var l=+scheduler.date.date_part(new Date(d)),c=e(t,_,d.getDay(),l,r);if(c)for(var h=0;h<c.length;h+=2){var u=scheduler._get_zone_minutes(d),o=t.end_date>i||t.end_date.getDate()!=d.getDate()?1440:scheduler._get_zone_minutes(t.end_date),f=c[h],m=c[h+1];if(f<o&&m>u&&!(n="function"==typeof a&&a(t,u,o,f,m)))break}}return!n};var d=scheduler.checkLimitViolation=function(e){if(!e)return!0;if(!scheduler.config.check_limits)return!0;var t=scheduler,s=t.config,a=[];if(e.rec_type)for(var n=scheduler.getRecDates(e),d=0;d<n.length;d++){var i=scheduler._copy_event(e);scheduler._lame_copy(i,n[d]),a.push(i)}else a=[e];for(var _=!0,l=0;l<a.length;l++){var c=!0;(i=a[l])._timed=scheduler.isOneDayEvent(i),(c=!s.limit_start||!s.limit_end||i.start_date.valueOf()>=s.limit_start.valueOf()&&i.end_date.valueOf()<=s.limit_end.valueOf())&&(c=!scheduler.checkInMarkedTimespan(i,r,function(e,r,s,a,n){var d=!0;return r<=n&&r>=a&&((1440==n||s<n)&&(d=!1),e._timed&&t._drag_id&&"new-size"==t._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(n)):d=!1),(s>=a&&s<n||r<a&&s>n)&&(e._timed&&t._drag_id&&"new-size"==t._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(a)):d=!1),d})),c||(c=t.checkEvent("onLimitViolation")?t.callEvent("onLimitViolation",[i.id,i]):c),_=_&&c}return _||(t._drag_id=null,t._drag_mode=null),_};scheduler._get_blocked_zones=function(e,t,r,s,a){var n=[];if(e&&e[t])for(var d=e[t],i=this._get_relevant_blocked_zones(r,s,d,a),_=0;_<i.length;_++)n=this._add_timespan_zones(n,i[_].zones);return n},scheduler._get_relevant_blocked_zones=function(e,t,r,s){return r[t]&&r[t][s]?r[t][s]:r[e]&&r[e][s]?r[e][s]:[]},scheduler.attachEvent("onMouseDown",function(e){return!(e==r)}),scheduler.attachEvent("onBeforeDrag",function(e){return!e||d(scheduler.getEvent(e))}),scheduler.attachEvent("onClick",function(e){return d(scheduler.getEvent(e))}),scheduler.attachEvent("onBeforeLightbox",function(e){var r=scheduler.getEvent(e);return t=[r.start_date,r.end_date],d(r)}),scheduler.attachEvent("onEventSave",function(e,t){if(!t.start_date||!t.end_date){var r=scheduler.getEvent(e);t.start_date=new Date(r.start_date),t.end_date=new Date(r.end_date)}if(t.rec_type){var s=scheduler._lame_clone(t);return scheduler._roll_back_dates(s),d(s)}return d(t)}),scheduler.attachEvent("onEventAdded",function(e){if(!e)return!0;var t=scheduler.getEvent(e);return!d(t)&&scheduler.config.limit_start&&scheduler.config.limit_end&&(t.start_date<scheduler.config.limit_start&&(t.start_date=new Date(scheduler.config.limit_start)),t.start_date.valueOf()>=scheduler.config.limit_end.valueOf()&&(t.start_date=this.date.add(scheduler.config.limit_end,-1,"day")),t.end_date<scheduler.config.limit_start&&(t.end_date=new Date(scheduler.config.limit_start)),t.end_date.valueOf()>=scheduler.config.limit_end.valueOf()&&(t.end_date=this.date.add(scheduler.config.limit_end,-1,"day")),t.start_date.valueOf()>=t.end_date.valueOf()&&(t.end_date=this.date.add(t.start_date,this.config.event_duration||this.config.time_step,"minute")),t._timed=this.isOneDayEvent(t)),!0}),scheduler.attachEvent("onEventChanged",function(e){if(!e)return!0;var r=scheduler.getEvent(e);if(!d(r)){if(!t)return!1;r.start_date=t[0],r.end_date=t[1],r._timed=this.isOneDayEvent(r)}return!0}),scheduler.attachEvent("onBeforeEventChanged",function(e){return d(e)}),scheduler.attachEvent("onBeforeEventCreated",function(e){var t=scheduler.getActionData(e).date,r={_timed:!0,start_date:t,end_date:scheduler.date.add(t,scheduler.config.time_step,"minute")};return d(r)}),scheduler.attachEvent("onViewChange",function(){scheduler._mark_now()}),scheduler.attachEvent("onSchedulerResize",function(){return window.setTimeout(function(){scheduler._mark_now()},1),!0}),scheduler.attachEvent("onTemplatesReady",function(){scheduler._mark_now_timer=window.setInterval(function(){scheduler._is_initialized()&&scheduler._mark_now()},6e4)}),scheduler._mark_now=function(e){var t="dhx_now_time";this._els[t]||(this._els[t]=[]);var r=scheduler._currentDate(),s=this.config;if(scheduler._remove_mark_now(),!e&&s.mark_now&&r<this._max_date&&r>this._min_date&&r.getHours()>=s.first_hour&&r.getHours()<s.last_hour){var a=this.locate_holder_day(r);this._els[t]=scheduler._append_mark_now(a,r)}},scheduler._append_mark_now=function(e,t){var r="dhx_now_time",s=scheduler._get_zone_minutes(t),a={zones:[s,s+1],css:r,type:r};if(!this._table_view){if(this._props&&this._props[this._mode]){var n,d,i=this._props[this._mode],_=i.size||i.options.length;i.days>1?(n=e,d=e+_):d=(n=0)+_;for(var l=[],c=n;c<d;c++){var h=c;a.days=h;var u=scheduler._render_marked_timespan(a,null,h)[0];l.push(u)}return l}return a.days=e,scheduler._render_marked_timespan(a,null,e)}if("month"==this._mode)return a.days=+scheduler.date.date_part(t),scheduler._render_marked_timespan(a,null,null)},scheduler._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],r=0;r<t.length;r++){var s=t[r],a=s.parentNode;a&&a.removeChild(s)}this._els[e]=[]},scheduler._marked_timespans={global:{}},scheduler._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},scheduler._prepare_timespan_options=function(e){var t=[],r=[];if("fullweek"==e.days&&(e.days=[0,1,2,3,4,5,6]),e.days instanceof Array){for(var a=e.days.slice(),n=0;n<a.length;n++){var d=scheduler._lame_clone(e);d.days=a[n],t.push.apply(t,scheduler._prepare_timespan_options(d))}return t}if(!e||!(e.start_date&&e.end_date&&e.end_date>e.start_date||e.days!==undefined&&e.zones)&&!e.type)return t;var i=0,_=1440;"fullday"==e.zones&&(e.zones=[i,_]),e.zones&&e.invert_zones&&(e.zones=scheduler.invertZones(e.zones)),e.id=scheduler.uid(),e.css=e.css||"",e.type=e.type||s;var l=e.sections;if(l){for(var c in l)if(l.hasOwnProperty(c)){var h=l[c];h instanceof Array||(h=[h]);for(n=0;n<h.length;n++){(g=scheduler._lame_copy({},e)).sections={},g.sections[c]=h[n],r.push(g)}}}else r.push(e);for(var u=0;u<r.length;u++){var o=r[u],f=o.start_date,m=o.end_date;if(f&&m)for(var p=scheduler.date.date_part(new Date(f)),v=scheduler.date.add(p,1,"day");p<m;){var g;delete(g=scheduler._lame_copy({},o)).start_date,delete g.end_date,g.days=p.valueOf();var y=f>p?scheduler._get_zone_minutes(f):i,k=m>v||m.getDate()!=p.getDate()?_:scheduler._get_zone_minutes(m);g.zones=[y,k],t.push(g),p=v,v=scheduler.date.add(v,1,"day")}else o.days instanceof Date&&(o.days=scheduler.date.date_part(o.days).valueOf()),o.zones=e.zones.slice(),t.push(o)}return t},scheduler._get_dates_by_index=function(e,t,r){var s=[];t=scheduler.date.date_part(new Date(t||scheduler._min_date)),r=new Date(r||scheduler._max_date);for(var a=t.getDay(),n=e-a>=0?e-a:7-t.getDay()+e,d=scheduler.date.add(t,n,"day");d<r;d=scheduler.date.add(d,1,"week"))s.push(d);return s},scheduler._get_css_classes_by_config=function(e){var t=[];return e.type==r&&(t.push(r),e.css&&t.push(r+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")},scheduler._get_block_by_config=function(e){var t=document.createElement("DIV");return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),t},scheduler._render_marked_timespan=function(e,t,r){var s=[],a=scheduler.config,n=this._min_date,d=this._max_date,i=!1;if(!a.display_marked_timespans)return s;if(!r&&0!==r){if(e.days<7)r=e.days;else{var _=new Date(e.days);if(i=+_,!(+d>+_&&+n<=+_))return s;r=_.getDay()}var l=n.getDay();l>r?r=7-(l-r):r-=l}var c=e.zones,h=scheduler._get_css_classes_by_config(e);if(scheduler._table_view&&"month"==scheduler._mode){var u=[],o=[];if(t)u.push(t),o.push(r);else{o=i?[i]:scheduler._get_dates_by_index(r);for(var f=0;f<o.length;f++)u.push(this._scales[o[f]])}for(f=0;f<u.length;f++){t=u[f],r=o[f];var m=Math.floor((this._correct_shift(r,1)-n.valueOf())/(864e5*this._cols.length)),p=this.locate_holder_day(r,!1)%this._cols.length;if(!this._ignores[p]){var v=scheduler._get_block_by_config(e),g=Math.max(t.offsetHeight-1,0),y=Math.max(t.offsetWidth-1,0),k=this._colsS[p],w=this._colsS.heights[m]+(this._colsS.height?this.xy.month_scale_height+2:2)-1;v.className=h,v.style.top=w+"px",v.style.lineHeight=v.style.height=g+"px";for(var z=0;z<c.length;z+=2){var b=c[f];if((M=c[f+1])<=b)return[];(O=v.cloneNode(!0)).style.left=k+Math.round(b/1440*y)+"px",O.style.width=Math.round((M-b)/1440*y)+"px",t.appendChild(O),s.push(O)}}}}else{var D=r;if(this._ignores[this.locate_holder_day(r,!1)])return s;if(this._props&&this._props[this._mode]&&e.sections&&e.sections[this._mode]){var x=this._props[this._mode];D=x.order[e.sections[this._mode]];var E=x.order[e.sections[this._mode]];if(x.days>1)D=D*(x.size||x.options.length)+E;else D=E,x.size&&D>x.position+x.size&&(D=0)}t=t||scheduler.locate_holder(D);for(f=0;f<c.length;f+=2){var M,O;b=Math.max(c[f],60*a.first_hour);if((M=Math.min(c[f+1],60*a.last_hour))<=b){if(f+2<c.length)continue;return[]}(O=scheduler._get_block_by_config(e)).className=h;var C=24*this.config.hour_size_px+1,T=36e5;O.style.top=Math.round((60*b*1e3-this.config.first_hour*T)*this.config.hour_size_px/T)%C+"px",O.style.lineHeight=O.style.height=Math.max(Math.round(60*(M-b)*1e3*this.config.hour_size_px/T)%C,1)+"px",t.appendChild(O),s.push(O)}}return s},scheduler._mark_timespans=function(){var e=this._els.dhx_cal_data[0],t=[];if(scheduler._table_view&&"month"==scheduler._mode)for(var r in this._scales){var s=new Date(+r);t.push.apply(t,scheduler._on_scale_add_marker(this._scales[r],s))}else{s=new Date(scheduler._min_date);for(var a=0,n=e.childNodes.length;a<n;a++){var d=e.childNodes[a];d.firstChild&&scheduler._getClassName(d.firstChild).indexOf("dhx_scale_hour")>-1||(t.push.apply(t,scheduler._on_scale_add_marker(d,s)),s=scheduler.date.add(s,1,"day"))}}return t},scheduler.markTimespan=function(e){var t=!1;this._els.dhx_cal_data||(scheduler.get_elements(),t=!0);var r=scheduler._marked_timespans_ids,s=scheduler._marked_timespans_types,a=scheduler._marked_timespans;scheduler.deleteMarkedTimespan(),scheduler.addMarkedTimespan(e);var n=scheduler._mark_timespans();return t&&(scheduler._els=[]),scheduler._marked_timespans_ids=r,scheduler._marked_timespans_types=s,scheduler._marked_timespans=a,n},scheduler.unmarkTimespan=function(e){if(e)for(var t=0;t<e.length;t++){var r=e[t];r.parentNode&&r.parentNode.removeChild(r)}},scheduler._addMarkerTimespanConfig=function(e){var t="global",r=scheduler._marked_timespans,s=e.id,a=scheduler._marked_timespans_ids;a[s]||(a[s]=[]);var n=e.days,d=e.sections,i=e.type;if(e.id=s,d){for(var _ in d)if(d.hasOwnProperty(_)){r[_]||(r[_]={});var l=d[_],c=r[_];c[l]||(c[l]={}),c[l][n]||(c[l][n]={}),c[l][n][i]||(c[l][n][i]=[],scheduler._marked_timespans_types||(scheduler._marked_timespans_types={}),scheduler._marked_timespans_types[i]||(scheduler._marked_timespans_types[i]=!0));var h=c[l][n][i];e._array=h,h.push(e),a[s].push(e)}}else{r[t][n]||(r[t][n]={}),r[t][n][i]||(r[t][n][i]=[]),scheduler._marked_timespans_types||(scheduler._marked_timespans_types={}),scheduler._marked_timespans_types[i]||(scheduler._marked_timespans_types[i]=!0);h=r[t][n][i];e._array=h,h.push(e),a[s].push(e)}},scheduler._marked_timespans_ids={},scheduler.addMarkedTimespan=function(e){var t=scheduler._prepare_timespan_options(e);if(t.length){for(var r=t[0].id,s=0;s<t.length;s++)scheduler._addMarkerTimespanConfig(t[s]);return r}},scheduler._add_timespan_zones=function(e,t){var r=e.slice();if(t=t.slice(),!r.length)return t;for(var s=0;s<r.length;s+=2)for(var a=r[s],n=r[s+1],d=s+2==r.length,i=0;i<t.length;i+=2){var _=t[i],l=t[i+1];if(l>n&&_<=n||_<a&&l>=a)r[s]=Math.min(a,_),r[s+1]=Math.max(n,l),s-=2;else{if(!d)continue;var c=a>_?0:2;r.splice(s+c,0,_,l)}t.splice(i--,2);break}return r},scheduler._subtract_timespan_zones=function(e,t){for(var r=e.slice(),s=0;s<r.length;s+=2)for(var a=r[s],n=r[s+1],d=0;d<t.length;d+=2){var i=t[d],_=t[d+1];if(_>a&&i<n){var l=!1;a>=i&&n<=_&&r.splice(s,2),a<i&&(r.splice(s,2,a,i),l=!0),n>_&&r.splice(l?s+2:s,l?0:2,_,n),s-=2;break}}return r},scheduler.invertZones=function(e){return scheduler._subtract_timespan_zones([0,1440],e.slice())},scheduler._delete_marked_timespan_by_id=function(e){var t=scheduler._marked_timespans_ids[e];if(t)for(var r=0;r<t.length;r++)for(var s=t[r],a=s._array,n=0;n<a.length;n++)if(a[n]==s){a.splice(n,1);break}},scheduler._delete_marked_timespan_by_config=function(e){var t,r=scheduler._marked_timespans,a=e.sections,n=e.days,d=e.type||s;if(a){for(var i in a)if(a.hasOwnProperty(i)&&r[i]){var _=a[i];r[i][_]&&(t=r[i][_])}}else t=r.global;if(t)if(n!==undefined)t[n]&&t[n][d]&&(scheduler._addMarkerTimespanConfig(e),scheduler._delete_marked_timespans_list(t[n][d],e));else for(var l in t)if(t[l][d]){var c=scheduler._lame_clone(e);e.days=l,scheduler._addMarkerTimespanConfig(c),scheduler._delete_marked_timespans_list(t[l][d],e)}},scheduler._delete_marked_timespans_list=function(e,t){for(var r=0;r<e.length;r++){var s=e[r],a=scheduler._subtract_timespan_zones(s.zones,t.zones);if(a.length)s.zones=a;else{e.splice(r,1),r--;for(var n=scheduler._marked_timespans_ids[s.id],d=0;d<n.length;d++)if(n[d]==s){n.splice(d,1);break}}}},scheduler.deleteMarkedTimespan=function(e){if(arguments.length||(scheduler._marked_timespans={global:{}},scheduler._marked_timespans_ids={},scheduler._marked_timespans_types={}),"object"!=typeof e)scheduler._delete_marked_timespan_by_id(e);else{e.start_date&&e.end_date||(e.days!==undefined||e.type||(e.days="fullweek"),e.zones||(e.zones="fullday"));var t=[];if(e.type)t.push(e.type);else for(var r in scheduler._marked_timespans_types)t.push(r);for(var s=scheduler._prepare_timespan_options(e),a=0;a<s.length;a++)for(var n=s[a],d=0;d<t.length;d++){var i=scheduler._lame_clone(n);i.type=t[d],scheduler._delete_marked_timespan_by_config(i)}}},scheduler._get_types_to_render=function(e,t){var r=e?scheduler._lame_copy({},e):{};for(var s in t||{})t.hasOwnProperty(s)&&(r[s]=t[s]);return r},scheduler._get_configs_to_render=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push.apply(t,e[r]);return t},scheduler._on_scale_add_marker=function(e,t){if(!scheduler._table_view||"month"==scheduler._mode){var r=t.getDay(),s=t.valueOf(),a=this._mode,n=scheduler._marked_timespans,d=[],i=[];if(this._props&&this._props[a]){var _=this._props[a],l=_.options,c=l[scheduler._get_unit_index(_,t)];if(_.days>1){var h=864e5,u=Math.round((t-scheduler._min_date)/h);t=scheduler.date.add(scheduler._min_date,Math.floor(u/l.length),"day"),t=scheduler.date.date_part(t)}else t=scheduler.date.date_part(new Date(this._date));if(r=t.getDay(),s=t.valueOf(),n[a]&&n[a][c.key]){var o=n[a][c.key],f=scheduler._get_types_to_render(o[r],o[s]);d.push.apply(d,scheduler._get_configs_to_render(f))}}var m=n.global,p=m[s]||m[r];d.push.apply(d,scheduler._get_configs_to_render(p));for(var v=0;v<d.length;v++)i.push.apply(i,scheduler._render_marked_timespan(d[v],e,t));return i}},scheduler.attachEvent("onScaleAdd",function(){scheduler._on_scale_add_marker.apply(scheduler,arguments)}),scheduler.dblclick_dhx_marked_timespan=function(e,t){scheduler.callEvent("onScaleDblClick",[scheduler.getActionData(e).date,t,e]),scheduler.config.dblclick_create&&scheduler.addEventNow(scheduler.getActionData(e).date,null,e)}},scheduler._temp_limit_scope();