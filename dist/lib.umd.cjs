(function(i,n){typeof exports=="object"&&typeof module<"u"?module.exports=n():typeof define=="function"&&define.amd?define(n):(i=typeof globalThis<"u"?globalThis:i||self,i.VueOssImage=n())})(this,function(){"use strict";var U=Object.defineProperty;var _=(i,n,l)=>n in i?U(i,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[n]=l;var c=(i,n,l)=>(_(i,typeof n!="symbol"?n+"":n,l),l);const i=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n=t=>{t.keys.forEach(e=>{if(i(t.source,e)){const r=e;t.target[r]=t.source[r]}})},l=typeof window.devicePixelRatio=="number"?window.devicePixelRatio:1,f=(t,e)=>{const r=(t||"").replace(/\/$/,""),o=(e||"").replace(/^\.*\//,"");return/^https?:\/\//.test(o)?o:`${r}/${o}`},a=t=>{const e=t.resizeMode||"fill",r=typeof t.ratio=="number"&&t.ratio>=1?t.ratio:l,o=[];return t.width||t.height?(t.width&&o.push(`w_${Math.floor(t.width*r)}`),t.height&&o.push(`h_${Math.floor(t.height*r)}`)):(t.long||t.short)&&(t.long&&o.push(`l_${Math.floor(t.long*r)}`),t.short&&o.push(`s_${Math.floor(t.short*r)}`)),o.length?["resize",`m_${e}`].concat(o).join(","):""},y=t=>typeof t=="number"&&t>=1&&t<100?`quality,q_${Math.floor(t)}`:"",p=t=>typeof t=="string"?`format,${t}`:"",u=t=>{if(!t.path)return"";const e=f(t.host,t.path),r=[a(t),y(t.quality),p(t.format)].filter(s=>!!s),o=r.length?["?x-oss-process=image"].concat(r).join("/"):"";return e+o};class h{constructor(e={}){c(this,"path");c(this,"loading");c(this,"error");n({source:e,target:this,keys:["host","quality","format","resizeMode","ratio","loading","error"]})}compose(e){return u(e)}getUrl(e){if(!e)return"";const r={};return n({source:this,target:r,keys:["host","quality","format","resizeMode","ratio","width","height","long","short"]}),r.path=e,this.compose(r)}get url(){return this.getUrl(this.path)}get loadingUrl(){return this.getUrl(this.loading)}get errorUrl(){return this.getUrl(this.error)}setUrl(e,r){if(!e)return;e.tagName.toLowerCase()==="img"?e.setAttribute("src",r):e.style.backgroundImage=`url(${r})`}}const g=t=>{class e extends h{constructor(o){super(t),n({source:typeof o=="string"?{path:o}:o||{},target:this,keys:["host","path","quality","format","resizeMode","ratio","width","height","long","short","loading","error"]})}}return e},d=t=>{const e=(r,o)=>{if(!o.url)return;const s=new Image;s.onload=()=>{o.setUrl(r,o.url)},o.errorUrl&&(s.onerror=()=>{o.setUrl(r,o.errorUrl)}),s.src=o.url};return{mounted(r,o){const s=new t(o.value);s.loadingUrl&&s.setUrl(r,s.loadingUrl),e(r,s)},updated(r,o){const s=new t(o.value);e(r,s)}}};return{install:(t,e)=>{const r=e.prototype&&e.prototype instanceof h?e:g(e),o=d(r);t.directive("img",o)},create:g,createHooks:d,compose:u}});
