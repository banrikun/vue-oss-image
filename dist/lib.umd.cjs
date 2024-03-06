(function(i,s){typeof exports=="object"&&typeof module<"u"?module.exports=s():typeof define=="function"&&define.amd?define(s):(i=typeof globalThis<"u"?globalThis:i||self,i.VueOssImage=s())})(this,function(){"use strict";var p=Object.defineProperty;var $=(i,s,l)=>s in i?p(i,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[s]=l;var c=(i,s,l)=>($(i,typeof s!="symbol"?s+"":s,l),l);const i=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s=t=>{t.keys.forEach(e=>{if(i(t.source,e)){const r=e;t.target[r]=t.source[r]}})},l=typeof(window==null?void 0:window.devicePixelRatio)=="number"?window.devicePixelRatio:1,u=(t,e)=>{if(!t)return;t.tagName.toLowerCase()==="img"?t.setAttribute("src",e):t.style.backgroundImage=`url(${e})`},f=(t,e)=>{const r=(t||"").replace(/\/$/,""),o=(e||"").replace(/^\.*\//,"");return/^https?:\/\//.test(o)?o:`${r}/${o}`},y=t=>{const e=t.resizeMode||"fill",r=typeof t.ratio=="number"&&t.ratio>=1?t.ratio:l,o=[];return t.width||t.height?(t.width&&o.push(`w_${Math.floor(t.width*r)}`),t.height&&o.push(`h_${Math.floor(t.height*r)}`)):(t.long||t.short)&&(t.long&&o.push(`l_${Math.floor(t.long*r)}`),t.short&&o.push(`s_${Math.floor(t.short*r)}`)),o.length?["resize",`m_${e}`].concat(o).join(","):""},U=t=>typeof t=="number"&&t>=1&&t<100?`quality,q_${Math.floor(t)}`:"",_=t=>t&&typeof t=="string"?`format,${t}`:"",w=t=>/^data:image/.test(t),h=t=>{if(!t.path)return"";if(w(t.path))return t.path;const e=f(t.host,t.path),r=[y(t),U(t.quality),_(t.format)].filter(n=>!!n),o=r.length?["?x-oss-process=image"].concat(r).join("/"):"";return e+o};class g{constructor(e={}){c(this,"attr");c(this,"path");c(this,"loading");c(this,"error");s({source:e,target:this,keys:["attr","host","quality","format","resizeMode","ratio","loading","error"]})}compose(e){return h(e)}getUrl(e){if(!e)return"";const r={};return s({source:this,target:r,keys:["host","quality","format","resizeMode","ratio","width","height","long","short"]}),r.path=e,this.compose(r)}get url(){return this.getUrl(this.path)}get loadingUrl(){return this.getUrl(this.loading)}get errorUrl(){return this.getUrl(this.error)}setUrl(e,r){e&&(this.attr&&typeof this.attr=="string"?e.setAttribute(this.attr,r):u(e,r))}}const a=t=>{class e extends g{constructor(o){super(t),s({source:typeof o=="string"?{path:o}:o||{},target:this,keys:["attr","host","path","quality","format","resizeMode","ratio","width","height","long","short","loading","error"]})}}return e},d=t=>{const e=(r,o)=>{if(!o.url)return;const n=new Image;n.onload=()=>{o.setUrl(r,o.url)},o.errorUrl&&(n.onerror=()=>{o.setUrl(r,o.errorUrl)}),n.src=o.url};return{mounted(r,o){const n=new t(o.value);n.loadingUrl||n.errorUrl?(n.loadingUrl&&n.setUrl(r,n.loadingUrl),e(r,n)):n.url&&n.setUrl(r,n.url)},updated(r,o){const n=new t(o.value);e(r,n)}}};return{install:(t,e)=>{const r=(e==null?void 0:e.prototype)instanceof g?e:a(e),o=d(r);t.directive("img",o)},create:a,createHooks:d,compose:h,copyKeys:s,setImageUrl:u}});
