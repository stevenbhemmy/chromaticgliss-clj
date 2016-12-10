// Compiled by ClojureScript 1.7.228 {}
goog.provide('ajax.xml_http_request');
goog.require('cljs.core');
goog.require('ajax.protocols');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
return new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null).call(null,e.target.readyState);
});
XMLHttpRequest.prototype.ajax$protocols$AjaxImpl$ = true;

XMLHttpRequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__11353,handler){
var map__11354 = p__11353;
var map__11354__$1 = ((((!((map__11354 == null)))?((((map__11354.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11354.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11354):map__11354);
var uri = cljs.core.get.call(null,map__11354__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.call(null,map__11354__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.call(null,map__11354__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.call(null,map__11354__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.call(null,map__11354__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.call(null,map__11354__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.call(null,map__11354__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
this$__$1.withCredentials = with_credentials;

this$__$1.onreadystatechange = ((function (this$__$1,map__11354,map__11354__$1,uri,method,body,headers,timeout,with_credentials,response_format){
return (function (p1__11352_SHARP_){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state.call(null,p1__11352_SHARP_))){
return handler.call(null,this$__$1);
} else {
return null;
}
});})(this$__$1,map__11354,map__11354__$1,uri,method,body,headers,timeout,with_credentials,response_format))
;

this$__$1.open(method,uri,true);

this$__$1.timeout = timeout;

var temp__4425__auto___11362 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__4425__auto___11362)){
var response_type_11363 = temp__4425__auto___11362;
this$__$1.responseType = cljs.core.name.call(null,response_type_11363);
} else {
}

var seq__11356_11364 = cljs.core.seq.call(null,headers);
var chunk__11357_11365 = null;
var count__11358_11366 = (0);
var i__11359_11367 = (0);
while(true){
if((i__11359_11367 < count__11358_11366)){
var vec__11360_11368 = cljs.core._nth.call(null,chunk__11357_11365,i__11359_11367);
var k_11369 = cljs.core.nth.call(null,vec__11360_11368,(0),null);
var v_11370 = cljs.core.nth.call(null,vec__11360_11368,(1),null);
this$__$1.setRequestHeader(k_11369,v_11370);

var G__11371 = seq__11356_11364;
var G__11372 = chunk__11357_11365;
var G__11373 = count__11358_11366;
var G__11374 = (i__11359_11367 + (1));
seq__11356_11364 = G__11371;
chunk__11357_11365 = G__11372;
count__11358_11366 = G__11373;
i__11359_11367 = G__11374;
continue;
} else {
var temp__4425__auto___11375 = cljs.core.seq.call(null,seq__11356_11364);
if(temp__4425__auto___11375){
var seq__11356_11376__$1 = temp__4425__auto___11375;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11356_11376__$1)){
var c__6945__auto___11377 = cljs.core.chunk_first.call(null,seq__11356_11376__$1);
var G__11378 = cljs.core.chunk_rest.call(null,seq__11356_11376__$1);
var G__11379 = c__6945__auto___11377;
var G__11380 = cljs.core.count.call(null,c__6945__auto___11377);
var G__11381 = (0);
seq__11356_11364 = G__11378;
chunk__11357_11365 = G__11379;
count__11358_11366 = G__11380;
i__11359_11367 = G__11381;
continue;
} else {
var vec__11361_11382 = cljs.core.first.call(null,seq__11356_11376__$1);
var k_11383 = cljs.core.nth.call(null,vec__11361_11382,(0),null);
var v_11384 = cljs.core.nth.call(null,vec__11361_11382,(1),null);
this$__$1.setRequestHeader(k_11383,v_11384);

var G__11385 = cljs.core.next.call(null,seq__11356_11376__$1);
var G__11386 = null;
var G__11387 = (0);
var G__11388 = (0);
seq__11356_11364 = G__11385;
chunk__11357_11365 = G__11386;
count__11358_11366 = G__11387;
i__11359_11367 = G__11388;
continue;
}
} else {
}
}
break;
}

this$__$1.send((function (){var or__6142__auto__ = body;
if(cljs.core.truth_(or__6142__auto__)){
return or__6142__auto__;
} else {
return "";
}
})());

return this$__$1;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxRequest$ = true;

XMLHttpRequest.prototype.ajax$protocols$AjaxRequest$_abort$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.abort();
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$ = true;

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_body$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.response;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_status$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.status;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_status_text$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.statusText;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_get_response_header$arity$2 = (function (this$,header){
var this$__$1 = this;
return this$__$1.getResponseHeader(header);
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_was_aborted$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core._EQ_.call(null,(0),this$__$1.readyState);
});