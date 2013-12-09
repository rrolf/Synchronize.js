/**
 * Synchronize.js
 * Version 1.0.0
 *
 * Copyright 2013 Denis Meyer
 */
!function(n){function e(n,e,r){return!isNaN(n)&&!isNaN(e)&&!isNaN(r)&&r>=e?n>=e&&r>=n:!1}function r(e){return e?o()?videojs(e):n("#"+e):void 0}function t(n){return n?o()?videojs(n):r(n).get(0):void 0}function o(){return!("undefined"==typeof videojs)}function u(n){return o()&&n?n.Q:n}function i(n){return n?(t(n).play(),!0):!1}function a(n){return n?(o()?t(n).volume(0):t(n).muted=!0,void 0):void 0}function f(n){return n?t(n).pause():!1}function s(n){return n?o()?t(n).paused():t(n).paused:!1}function g(n){return n?o()?t(n).duration():t(n).duration:-1}function d(n){return n?o()?t(n).currentTime():t(n).currentTime:-1}function c(n,e){return n&&!isNaN(e)&&e>=0&&e<=g(n)?(o()?t(n).currentTime(e):t(n).currentTime=e,!0):!1}function l(n){return n?o()?t(n).buffered():t(n).buffered:void 0}function v(n,e){var r=g(n);return-1!=r&&!isNaN(e)&&e>=0&&r>=e?c(n,e):(c(n,r),!1)}function m(){for(var r,t=d(T),o=0;o<R.length;++o)R[o]!=T&&(r=d(R[o]),-1==t||-1==r||e(r,t-V,t)||(n(document).trigger("sjs:synchronizing",[t,R[o]]),v(R[o],t)&&i(R[o])))}function h(){if(N()){var e=r(T);e.on("play",function(){n(document).trigger("sjs:masterPlay",[d(T)]),q=!1,C||(C=!0,j());for(var e=0;e<R.length;++e)R[e]!=T&&(r(R[e]).on("play",function(){a(R[e])}),i(R[e]))}),e.on("pause",function(){n(document).trigger("sjs:masterPause",[d(T)]),q=!S&&L&&!0,S=S?!S:S;for(var e=0;e<R.length;++e)R[e]!=T&&(f(R[e]),m())}),e.on("ended",function(){n(document).trigger("sjs:masterEnded",[g(T)]),q=!0;for(var e=0;e<R.length;++e)R[e]!=T&&(m(),f(R[e]))}),e.on("timeupdate",function(){n(document).trigger("sjs:masterTimeupdate",[d(T)]),q=!0;var e=Date.now();if(e-E>Q||s(T)){E=e;for(var r,t=0;t<R.length;++t)R[t]!=T&&(a(R[t]),r=s(R[t]),m(),(r||s(T))&&f(R[t]))}})}else for(var t=0;t<R.length;++t)f(R[t])}function j(){P=window.setInterval(function(){for(var e=!0,r=d(T),t=0;t<R.length;++t){var o=l(R[t]),u=o.length,a=o.start(0),s=o.end(0),c=s-a;if(o&&u>0){var v=g(R[t]),m=r+x;m=m>v?v:m,e=e&&c>=m}else e=!1}if(e)L&&!q?(L=!1,i(T),q=!1,n(document).trigger("sjs:bufferedAndAutoplaying",[])):L&&(L=!1,n(document).trigger("sjs:bufferedButNotAutoplaying",[]));else{L=!0,S=!0;for(var t=0;t<R.length;++t)f(R[t]);q=!1,n(document).trigger("sjs:buffering",[])}},D)}function p(e){z=e<R.length?e:0,T=R[z],n(document).trigger("sjs:masterSet",[T])}function y(n,e){n&&e&&r(n).on("loadeddata",function(){e()})}function N(){if(o()){for(var n=0;n<R.length;++n)if(!I[R[n]])return!1;return!0}return B==R.length}function b(){for(var n=0;n<R.length;++n)f(R[n]);k=!0}function w(){for(var n=0;n<R.length;++n)f(R[n]);k=!1}var T,P,R=[],A={},I={},z=0,B=0,E=0,Q=2e3,V=1,k=!1,C=!1,D=1e3,L=!1,S=!1,q=!1,x=1.5;n.synchronizeVideos=function(e){z=e;for(var t=!0,a=1;a<arguments.length;++a)t=t&&arguments[a]&&n("#"+arguments[a]).length,t?(R[R.length]=arguments[a],A[R[a-1]]=!1,I[R[a-1]]=!1):n(document).trigger("sjs:invalidId",[arguments[a]]);if(t&&R.length>1)if(o())for(var a=0;a<R.length;++a){n(document).trigger("sjs:idRegistered",[R[a]]);var f=e;r(R[a]).on("play",b),r(R[a]).on("pause",w),r(R[a]).ready(function(){var e=u(this);A[e]=!0,y(e,function(){if(I[e]=!0,n(document).trigger("sjs:playerLoaded",[e]),N()){p(f);for(var t=0;t<R.length;++t)r(R[t]).off("play",b),r(R[t]).off("pause",w);h(),k&&i(T),n(document).trigger("sjs:allPlayersReady",[])}})})}else for(var a=0;a<R.length;++a){n(document).trigger("sjs:idRegistered",[R[a]]);var f=e;r(R[a]).on("play",b),r(R[a]).on("pause",w),r(R[a]).ready(function(){if(++B,B==R.length){p(f);for(var e=0;e<R.length;++e)r(R[e]).off("play",b),r(R[e]).off("pause",w);h(),k&&i(T),n(document).trigger("sjs:allPlayersReady",[])}})}else n(document).trigger("sjs:notEnoughVideos",[]);n(document).on("sjs:cleanBufferChecker",function(){window.clearInterval(P)})}}(jQuery);