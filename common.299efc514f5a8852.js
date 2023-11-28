"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{5178:(y,h,r)=>{r.d(h,{c:()=>i});var u=r(2364),c=r(7150),l=r(9203);const i=(o,n)=>{let e,t;const g=(a,p,w)=>{if(typeof document>"u")return;const E=document.elementFromPoint(a,p);E&&n(E)?E!==e&&(s(),d(E,w)):s()},d=(a,p)=>{e=a,t||(t=e);const w=e;(0,u.w)(()=>w.classList.add("ion-activated")),p()},s=(a=!1)=>{if(!e)return;const p=e;(0,u.w)(()=>p.classList.remove("ion-activated")),a&&t!==e&&e.click(),e=void 0};return(0,l.createGesture)({el:o,gestureName:"buttonActiveDrag",threshold:0,onStart:a=>g(a.currentX,a.currentY,c.a),onMove:a=>g(a.currentX,a.currentY,c.b),onEnd:()=>{s(!0),(0,c.h)(),t=void 0}})}},4874:(y,h,r)=>{r.d(h,{g:()=>c});var u=r(6225);const c=()=>{if(void 0!==u.w)return u.w.Capacitor}},5149:(y,h,r)=>{r.d(h,{g:()=>u});const u=(n,e,t,g,d)=>l(n[1],e[1],t[1],g[1],d).map(s=>c(n[0],e[0],t[0],g[0],s)),c=(n,e,t,g,d)=>d*(3*e*Math.pow(d-1,2)+d*(-3*t*d+3*t+g*d))-n*Math.pow(d-1,3),l=(n,e,t,g,d)=>o((g-=d)-3*(t-=d)+3*(e-=d)-(n-=d),3*t-6*e+3*n,3*e-3*n,n).filter(a=>a>=0&&a<=1),o=(n,e,t,g)=>{if(0===n)return((n,e,t)=>{const g=e*e-4*n*t;return g<0?[]:[(-e+Math.sqrt(g))/(2*n),(-e-Math.sqrt(g))/(2*n)]})(e,t,g);const d=(3*(t/=n)-(e/=n)*e)/3,s=(2*e*e*e-9*e*t+27*(g/=n))/27;if(0===d)return[Math.pow(-s,1/3)];if(0===s)return[Math.sqrt(-d),-Math.sqrt(-d)];const a=Math.pow(s/2,2)+Math.pow(d/3,3);if(0===a)return[Math.pow(s/2,.5)-e/3];if(a>0)return[Math.pow(-s/2+Math.sqrt(a),1/3)-Math.pow(s/2+Math.sqrt(a),1/3)-e/3];const p=Math.sqrt(Math.pow(-d/3,3)),w=Math.acos(-s/(2*Math.sqrt(Math.pow(-d/3,3)))),E=2*Math.pow(p,1/3);return[E*Math.cos(w/3)-e/3,E*Math.cos((w+2*Math.PI)/3)-e/3,E*Math.cos((w+4*Math.PI)/3)-e/3]}},5085:(y,h,r)=>{r.d(h,{i:()=>u});const u=c=>c&&""!==c.dir?"rtl"===c.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},2779:(y,h,r)=>{r.r(h),r.d(h,{startFocusVisible:()=>i});const u="ion-focused",l=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],i=o=>{let n=[],e=!0;const t=o?o.shadowRoot:document,g=o||document.body,d=M=>{n.forEach(f=>f.classList.remove(u)),M.forEach(f=>f.classList.add(u)),n=M},s=()=>{e=!1,d([])},a=M=>{e=l.includes(M.key),e||d([])},p=M=>{if(e&&void 0!==M.composedPath){const f=M.composedPath().filter(m=>!!m.classList&&m.classList.contains("ion-focusable"));d(f)}},w=()=>{t.activeElement===g&&d([])};return t.addEventListener("keydown",a),t.addEventListener("focusin",p),t.addEventListener("focusout",w),t.addEventListener("touchstart",s,{passive:!0}),t.addEventListener("mousedown",s),{destroy:()=>{t.removeEventListener("keydown",a),t.removeEventListener("focusin",p),t.removeEventListener("focusout",w),t.removeEventListener("touchstart",s),t.removeEventListener("mousedown",s)},setFocus:d}}},5487:(y,h,r)=>{r.d(h,{c:()=>c});var u=r(839);const c=n=>{const e=n;let t;return{hasLegacyControl:()=>{if(void 0===t){const d=void 0!==e.label||l(e),s=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")&&null===e.shadowRoot,a=(0,u.h)(e);t=!0===e.legacy||!d&&!s&&null!==a}return t}}},l=n=>null!==n.shadowRoot&&!!(i.includes(n.tagName)&&null!==n.querySelector('[slot="label"]')||o.includes(n.tagName)&&""!==n.textContent),i=["ION-RANGE"],o=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},7150:(y,h,r)=>{r.d(h,{I:()=>c,a:()=>e,b:()=>t,c:()=>n,d:()=>d,h:()=>g});var u=r(4874),c=function(s){return s.Heavy="HEAVY",s.Medium="MEDIUM",s.Light="LIGHT",s}(c||{});const i={getEngine(){const s=window.TapticEngine;if(s)return s;const a=(0,u.g)();return null!=a&&a.isPluginAvailable("Haptics")?a.Plugins.Haptics:void 0},available(){if(!this.getEngine())return!1;const a=(0,u.g)();return"web"!==(null==a?void 0:a.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate},isCordova:()=>void 0!==window.TapticEngine,isCapacitor:()=>void 0!==(0,u.g)(),impact(s){const a=this.getEngine();if(!a)return;const p=this.isCapacitor()?s.style:s.style.toLowerCase();a.impact({style:p})},notification(s){const a=this.getEngine();if(!a)return;const p=this.isCapacitor()?s.type:s.type.toLowerCase();a.notification({type:p})},selection(){const s=this.isCapacitor()?c.Light:"light";this.impact({style:s})},selectionStart(){const s=this.getEngine();s&&(this.isCapacitor()?s.selectionStart():s.gestureSelectionStart())},selectionChanged(){const s=this.getEngine();s&&(this.isCapacitor()?s.selectionChanged():s.gestureSelectionChanged())},selectionEnd(){const s=this.getEngine();s&&(this.isCapacitor()?s.selectionEnd():s.gestureSelectionEnd())}},o=()=>i.available(),n=()=>{o()&&i.selection()},e=()=>{o()&&i.selectionStart()},t=()=>{o()&&i.selectionChanged()},g=()=>{o()&&i.selectionEnd()},d=s=>{o()&&i.impact(s)}},8360:(y,h,r)=>{r.d(h,{I:()=>n,a:()=>d,b:()=>o,c:()=>p,d:()=>E,f:()=>s,g:()=>g,i:()=>t,p:()=>w,r:()=>M,s:()=>a});var u=r(5861),c=r(839),l=r(6710);const o="ion-content",n=".ion-content-scroll-host",e=`${o}, ${n}`,t=f=>"ION-CONTENT"===f.tagName,g=function(){var f=(0,u.Z)(function*(m){return t(m)?(yield new Promise(v=>(0,c.c)(m,v)),m.getScrollElement()):m});return function(v){return f.apply(this,arguments)}}(),d=f=>f.querySelector(n)||f.querySelector(e),s=f=>f.closest(e),a=(f,m)=>t(f)?f.scrollToTop(m):Promise.resolve(f.scrollTo({top:0,left:0,behavior:m>0?"smooth":"auto"})),p=(f,m,v,O)=>t(f)?f.scrollByPoint(m,v,O):Promise.resolve(f.scrollBy({top:v,left:m,behavior:O>0?"smooth":"auto"})),w=f=>(0,l.b)(f,o),E=f=>{if(t(f)){const v=f.scrollY;return f.scrollY=!1,v}return f.style.setProperty("overflow","hidden"),!0},M=(f,m)=>{t(f)?f.scrollY=m:f.style.removeProperty("overflow")}},3173:(y,h,r)=>{r.d(h,{a:()=>u,b:()=>p,c:()=>e,d:()=>w,e:()=>D,f:()=>n,g:()=>E,h:()=>l,i:()=>c,j:()=>O,k:()=>C,l:()=>t,m:()=>s,n:()=>M,o:()=>d,p:()=>o,q:()=>i,r:()=>v,s:()=>_,t:()=>a,u:()=>f,v:()=>m,w:()=>g});const u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",D="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},2894:(y,h,r)=>{r.d(h,{c:()=>i,g:()=>o});var u=r(6225),c=r(839),l=r(6710);const i=(e,t,g)=>{let d,s;void 0!==u.w&&"MutationObserver"in u.w&&(d=new MutationObserver(E=>{for(const M of E)for(const f of M.addedNodes)if(f.nodeType===Node.ELEMENT_NODE&&f.slot===t)return g(),void(0,c.r)(()=>a(f))}),d.observe(e,{childList:!0}));const a=E=>{var M;s&&(s.disconnect(),s=void 0),s=new MutationObserver(f=>{g();for(const m of f)for(const v of m.removedNodes)v.nodeType===Node.ELEMENT_NODE&&v.slot===t&&w()}),s.observe(null!==(M=E.parentElement)&&void 0!==M?M:E,{subtree:!0,childList:!0})},w=()=>{s&&(s.disconnect(),s=void 0)};return{destroy:()=>{d&&(d.disconnect(),d=void 0),w()}}},o=(e,t,g)=>{const d=null==e?0:e.toString().length,s=n(d,t);if(void 0===g)return s;try{return g(d,t)}catch(a){return(0,l.a)("Exception in provided `counterFormatter`.",a),s}},n=(e,t)=>`${e} / ${t}`},7484:(y,h,r)=>{r.d(h,{K:()=>i,a:()=>l});var u=r(4874),c=function(o){return o.Unimplemented="UNIMPLEMENTED",o.Unavailable="UNAVAILABLE",o}(c||{}),l=function(o){return o.Body="body",o.Ionic="ionic",o.Native="native",o.None="none",o}(l||{});const i={getEngine(){const o=(0,u.g)();if(null!=o&&o.isPluginAvailable("Keyboard"))return o.Plugins.Keyboard},getResizeMode(){const o=this.getEngine();return null!=o&&o.getResizeMode?o.getResizeMode().catch(n=>{if(n.code!==c.Unimplemented)throw n}):Promise.resolve(void 0)}}},1612:(y,h,r)=>{r.r(h),r.d(h,{KEYBOARD_DID_CLOSE:()=>o,KEYBOARD_DID_OPEN:()=>i,copyVisualViewport:()=>C,keyboardDidClose:()=>f,keyboardDidOpen:()=>E,keyboardDidResize:()=>M,resetKeyboardAssist:()=>d,setKeyboardClose:()=>w,setKeyboardOpen:()=>p,startKeyboardAssist:()=>s,trackViewportChanges:()=>O});var u=r(7484);r(4874),r(6225);const i="ionKeyboardDidShow",o="ionKeyboardDidHide";let e={},t={},g=!1;const d=()=>{e={},t={},g=!1},s=_=>{if(u.K.getEngine())a(_);else{if(!_.visualViewport)return;t=C(_.visualViewport),_.visualViewport.onresize=()=>{O(_),E()||M(_)?p(_):f(_)&&w(_)}}},a=_=>{_.addEventListener("keyboardDidShow",D=>p(_,D)),_.addEventListener("keyboardDidHide",()=>w(_))},p=(_,D)=>{m(_,D),g=!0},w=_=>{v(_),g=!1},E=()=>!g&&e.width===t.width&&(e.height-t.height)*t.scale>150,M=_=>g&&!f(_),f=_=>g&&t.height===_.innerHeight,m=(_,D)=>{const L=new CustomEvent(i,{detail:{keyboardHeight:D?D.keyboardHeight:_.innerHeight-t.height}});_.dispatchEvent(L)},v=_=>{const D=new CustomEvent(o);_.dispatchEvent(D)},O=_=>{e=Object.assign({},t),t=C(_.visualViewport)},C=_=>({width:Math.round(_.width),height:Math.round(_.height),offsetTop:_.offsetTop,offsetLeft:_.offsetLeft,pageTop:_.pageTop,pageLeft:_.pageLeft,scale:_.scale})},3459:(y,h,r)=>{r.d(h,{c:()=>n});var u=r(5861),c=r(6225),l=r(7484);const i=e=>{if(void 0===c.d||e===l.a.None||void 0===e)return null;const t=c.d.querySelector("ion-app");return null!=t?t:c.d.body},o=e=>{const t=i(e);return null===t?0:t.clientHeight},n=function(){var e=(0,u.Z)(function*(t){let g,d,s,a;const p=function(){var m=(0,u.Z)(function*(){const v=yield l.K.getResizeMode(),O=void 0===v?void 0:v.mode;g=()=>{void 0===a&&(a=o(O)),s=!0,w(s,O)},d=()=>{s=!1,w(s,O)},null==c.w||c.w.addEventListener("keyboardWillShow",g),null==c.w||c.w.addEventListener("keyboardWillHide",d)});return function(){return m.apply(this,arguments)}}(),w=(m,v)=>{t&&t(m,E(v))},E=m=>{if(0===a||a===o(m))return;const v=i(m);return null!==v?new Promise(O=>{const _=new ResizeObserver(()=>{v.clientHeight===a&&(_.disconnect(),O())});_.observe(v)}):void 0};return yield p(),{init:p,destroy:()=>{null==c.w||c.w.removeEventListener("keyboardWillShow",g),null==c.w||c.w.removeEventListener("keyboardWillHide",d),g=d=void 0},isKeyboardVisible:()=>s}});return function(g){return e.apply(this,arguments)}}()},3830:(y,h,r)=>{r.d(h,{c:()=>c});var u=r(5861);const c=()=>{let l;return{lock:function(){var o=(0,u.Z)(function*(){const n=l;let e;return l=new Promise(t=>e=t),void 0!==n&&(yield n),e});return function(){return o.apply(this,arguments)}}()}}},5857:(y,h,r)=>{r.d(h,{c:()=>l});var u=r(6225),c=r(839);const l=(i,o,n)=>{let e;const t=()=>!(void 0===o()||void 0!==i.label||null===n()),d=()=>{const a=o();if(void 0===a)return;if(!t())return void a.style.removeProperty("width");const p=n().scrollWidth;if(0===p&&null===a.offsetParent&&void 0!==u.w&&"IntersectionObserver"in u.w){if(void 0!==e)return;const w=e=new IntersectionObserver(E=>{1===E[0].intersectionRatio&&(d(),w.disconnect(),e=void 0)},{threshold:.01,root:i});w.observe(a)}else a.style.setProperty("width",.75*p+"px")};return{calculateNotchWidth:()=>{t()&&(0,c.r)(()=>{d()})},destroy:()=>{e&&(e.disconnect(),e=void 0)}}}},3781:(y,h,r)=>{r.d(h,{S:()=>c});const c={bubbles:{dur:1e3,circles:9,fn:(l,i,o)=>{const n=l*i/o-l+"ms",e=2*Math.PI*i/o;return{r:5,style:{top:32*Math.sin(e)+"%",left:32*Math.cos(e)+"%","animation-delay":n}}}},circles:{dur:1e3,circles:8,fn:(l,i,o)=>{const n=i/o,e=l*n-l+"ms",t=2*Math.PI*n;return{r:5,style:{top:32*Math.sin(t)+"%",left:32*Math.cos(t)+"%","animation-delay":e}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(l,i)=>({r:6,style:{left:32-32*i+"%","animation-delay":-110*i+"ms"}})},lines:{dur:1e3,lines:8,fn:(l,i,o)=>({y1:14,y2:26,style:{transform:`rotate(${360/o*i+(i<o/2?180:-180)}deg)`,"animation-delay":l*i/o-l+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(l,i,o)=>({y1:12,y2:20,style:{transform:`rotate(${360/o*i+(i<o/2?180:-180)}deg)`,"animation-delay":l*i/o-l+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(l,i,o)=>({y1:17,y2:29,style:{transform:`rotate(${30*i+(i<6?180:-180)}deg)`,"animation-delay":l*i/o-l+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(l,i,o)=>({y1:12,y2:20,style:{transform:`rotate(${30*i+(i<6?180:-180)}deg)`,"animation-delay":l*i/o-l+"ms"}})}}},8466:(y,h,r)=>{r.r(h),r.d(h,{createSwipeBackGesture:()=>o});var u=r(839),c=r(5085),l=r(9203);r(619);const o=(n,e,t,g,d)=>{const s=n.ownerDocument.defaultView;let a=(0,c.i)(n);const w=v=>a?-v.deltaX:v.deltaX;return(0,l.createGesture)({el:n,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:v=>(a=(0,c.i)(n),(v=>{const{startX:C}=v;return a?C>=s.innerWidth-50:C<=50})(v)&&e()),onStart:t,onMove:v=>{const C=w(v)/s.innerWidth;g(C)},onEnd:v=>{const O=w(v),C=s.innerWidth,_=O/C,D=(v=>a?-v.velocityX:v.velocityX)(v),L=D>=0&&(D>.2||O>C/2),x=(L?1-_:_)*C;let b=0;if(x>5){const T=x/Math.abs(D);b=Math.min(T,540)}d(L,_<=0?.01:(0,u.l)(0,_,.9999),b)}})}},7063:(y,h,r)=>{r.d(h,{w:()=>u});const u=(i,o,n)=>{if(typeof MutationObserver>"u")return;const e=new MutationObserver(t=>{n(c(t,o))});return e.observe(i,{childList:!0,subtree:!0}),e},c=(i,o)=>{let n;return i.forEach(e=>{for(let t=0;t<e.addedNodes.length;t++)n=l(e.addedNodes[t],o)||n}),n},l=(i,o)=>1!==i.nodeType?void 0:(i.tagName===o.toUpperCase()?[i]:Array.from(i.querySelectorAll(o))).find(e=>e.value===i.value)},4281:(y,h,r)=>{r.d(h,{Z:()=>c});var u=r(6689);let c=(()=>{var l;class i{}return(l=i).\u0275fac=function(n){return new(n||l)},l.\u0275cmp=u.Xpm({type:l,selectors:[["app-explore-container"]],inputs:{name:"name"},decls:7,vars:1,consts:[["id","container"],["target","_blank","rel","noopener noreferrer","href","https://ionicframework.com/docs/components"]],template:function(n,e){1&n&&(u.TgZ(0,"div",0)(1,"strong"),u._uU(2),u.qZA(),u.TgZ(3,"p"),u._uU(4,"Explore "),u.TgZ(5,"a",1),u._uU(6,"UI Components"),u.qZA()()()),2&n&&(u.xp6(2),u.Oqu(e.name))},styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}"]}),i})()},3554:(y,h,r)=>{r.d(h,{e:()=>o});var u=r(6814),c=r(95),l=r(6761),i=r(6689);let o=(()=>{var n;class e{}return(n=e).\u0275fac=function(g){return new(g||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[u.ez,c.u5,l.Pc]}),e})()}}]);