function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire9dbf;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequire9dbf=o),o.register("gC69E",(function(t,n){var r,o;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("gC69E").register(JSON.parse('{"kU46l":"index.e3fc186b.js","gxgTN":"sw.js"}'));const i=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),a=Boolean(navigator.share),d=document.getElementById("date-input"),l=document.getElementById("submit"),s=(document.getElementById("submit"),document.getElementById("result")),u=document.getElementById("share"),c=document.getElementById("install-area"),g=document.getElementById("install-button");var m;m=new URL(o("gC69E").resolve("gxgTN"),import.meta.url).toString(),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register(m).then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))}));const f=new URLSearchParams(location.search).get("date");let h;function v(e){return new Intl.DateTimeFormat("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(e)}function p(){a&&u.classList.add("show");const e=d.valueAsNumber;s.classList.add("show");const t=e+1728e5,n=e+5184e5,r=e+33696e5,o=e+85536e5,i=e+863136e5;document.getElementById("hari-1").innerText=v(e),document.getElementById("hari-3").innerText=v(t),document.getElementById("hari-7").innerText=v(n),document.getElementById("hari-40").innerText=v(r),document.getElementById("hari-100").innerText=v(o),document.getElementById("hari-1000").innerText=v(i)}f&&(d.value=f,l.disabled=!1,p()),window.addEventListener("beforeinstallprompt",(e=>{i&&(e.preventDefault(),h=e,c.classList.add("show"))})),g.addEventListener("click",(async e=>{e.preventDefault(),h.prompt()})),window.addEventListener("appinstalled",(()=>{c.classList.remove("show"),h=null})),d.addEventListener("change",(e=>{const t=e.target.valueAsNumber;l.disabled=!Boolean(t),document.getElementById("hari-1").innerText=v(t),document.getElementById("hari-3").innerText="--",document.getElementById("hari-7").innerText="--",document.getElementById("hari-40").innerText="--",document.getElementById("hari-100").innerText="--",document.getElementById("hari-1000").innerText="--"})),share.addEventListener("click",(()=>{const e=v(d.valueAsNumber);navigator.share({title:"Tungtang - Hitung Tanggal",text:"Cek perhitungan dari tanggal "+e,url:location.href})})),l.addEventListener("click",(e=>{if(p(),history.pushState){const e=window.location.protocol+"//"+window.location.host+window.location.pathname+`?date=${d.value}`;window.history.pushState({path:e},"",e)}}));