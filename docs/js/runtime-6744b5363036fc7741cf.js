(()=>{"use strict";var e,r,t,o,n,a,i,c,l,s,u={},f={};function p(e){var r=f[e];if(void 0!==r)return r.exports;var t=f[e]={exports:{}};return u[e].call(t.exports,t,t.exports,p),t.exports}p.m=u,e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",r="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",t=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},o=e=>!--e.r&&e(),n=(e,r)=>e?e.push(r):o(r),p.a=(a,i,c)=>{var l,s,u,f=c&&[],p=a.exports,d=!0,b=!1,h=(r,t,o)=>{b||(b=!0,t.r+=r.length,r.map(((r,n)=>r[e](t,o))),b=!1)},v=new Promise(((e,r)=>{u=r,s=()=>(e(p),t(f),f=0)}));v[r]=p,v[e]=(e,r)=>{if(d)return o(e);l&&h(l,e,r),n(f,e),v.catch(r)},a.exports=v,i((a=>{if(!a)return s();var i,c;l=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[e])return a;if(a.then){var i=[];a.then((e=>{c[r]=e,t(i),i=0}));var c={[e]:(e,r)=>(n(i,e),a.catch(r))};return c}}return{[e]:e=>o(e),[r]:a}})))(a);var u=new Promise(((e,t)=>{(i=()=>e(c=l.map((e=>e[r])))).r=0,h(l,i,t)}));return i.r?u:c})).then(s,u),d=!1},a=[],p.O=(e,r,t,o)=>{if(!r){var n=1/0;for(l=0;l<a.length;l++){for(var[r,t,o]=a[l],i=!0,c=0;c<r.length;c++)(!1&o||n>=o)&&Object.keys(p.O).every((e=>p.O[e](r[c])))?r.splice(c--,1):(i=!1,o<n&&(n=o));i&&(a.splice(l--,1),e=t())}return e}o=o||0;for(var l=a.length;l>0&&a[l-1][2]>o;l--)a[l]=a[l-1];a[l]=[r,t,o]},p.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return p.d(r,{a:r}),r},c=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,p.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var t=Object.create(null);p.r(t);var o={};i=i||[null,c({}),c([]),c(c)];for(var n=2&r&&e;"object"==typeof n&&!~i.indexOf(n);n=c(n))Object.getOwnPropertyNames(n).forEach((r=>o[r]=()=>e[r]));return o.default=()=>e,p.d(t,o),t},p.d=(e,r)=>{for(var t in r)p.o(r,t)&&!p.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},p.f={},p.e=e=>Promise.all(Object.keys(p.f).reduce(((r,t)=>(p.f[t](e,r),r)),[])),p.u=e=>"js/"+{73:"encrypted_save_games",139:"oss",580:"i18n",720:"faq"}[e]+"-"+{73:"59610a831f7522c42480",139:"18335e03e2595ba2ab11",580:"9463e68d493ec8b12e54",720:"38dab7f0d6277d10643f"}[e]+".js",p.miniCssF=e=>"css/"+{216:"vendors",826:"index"}[e]+"-"+{216:"cb7bf08bcd14dc3639e4",826:"e8f2607f42c3de0cc396"}[e]+".css",p.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),p.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),l={},s="exponentialidle-savegameeditor:",p.l=(e,r,t,o)=>{if(l[e])l[e].push(r);else{var n,a;if(void 0!==t)for(var i=document.getElementsByTagName("script"),c=0;c<i.length;c++){var u=i[c];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==s+t){n=u;break}}n||(a=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,p.nc&&n.setAttribute("nonce",p.nc),n.setAttribute("data-webpack",s+t),n.src=e),l[e]=[r];var f=(r,t)=>{n.onerror=n.onload=null,clearTimeout(d);var o=l[e];if(delete l[e],n.parentNode&&n.parentNode.removeChild(n),o&&o.forEach((e=>e(t))),r)return r(t)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=f.bind(null,n.onerror),n.onload=f.bind(null,n.onload),a&&document.head.appendChild(n)}},p.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;p.g.importScripts&&(e=p.g.location+"");var r=p.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),p.p=e+"../"})(),(()=>{var e={666:0};p.f.j=(r,t)=>{var o=p.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else if(666!=r){var n=new Promise(((t,n)=>o=e[r]=[t,n]));t.push(o[2]=n);var a=p.p+p.u(r),i=new Error;p.l(a,(t=>{if(p.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+n+": "+a+")",i.name="ChunkLoadError",i.type=n,i.request=a,o[1](i)}}),"chunk-"+r,r)}else e[r]=0},p.O.j=r=>0===e[r];var r=(r,t)=>{var o,n,[a,i,c]=t,l=0;for(o in i)p.o(i,o)&&(p.m[o]=i[o]);if(c)var s=c(p);for(r&&r(t);l<a.length;l++)n=a[l],p.o(e,n)&&e[n]&&e[n][0](),e[a[l]]=0;return p.O(s)},t=self.webpackChunkexponentialidle_savegameeditor=self.webpackChunkexponentialidle_savegameeditor||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();
//# sourceMappingURL=runtime-6744b5363036fc7741cf.js.map