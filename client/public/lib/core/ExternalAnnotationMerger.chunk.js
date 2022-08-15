/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[8],{398:function(Ca,ua,r){r.r(ua);var pa=r(1),ja=r(425),ka=r(426),ea;(function(da){da[da.EXTERNAL_XFDF_NOT_REQUESTED=0]="EXTERNAL_XFDF_NOT_REQUESTED";da[da.EXTERNAL_XFDF_NOT_AVAILABLE=1]="EXTERNAL_XFDF_NOT_AVAILABLE";da[da.EXTERNAL_XFDF_AVAILABLE=2]="EXTERNAL_XFDF_AVAILABLE"})(ea||(ea={}));Ca=function(){function da(ba){this.aa=ba;this.state=ea.EXTERNAL_XFDF_NOT_REQUESTED}da.prototype.e6=function(){var ba=this;return function(w,y,
f){return Object(pa.b)(ba,void 0,void 0,function(){var e,a,b,n,h,x,z,ha=this,la;return Object(pa.d)(this,function(aa){switch(aa.label){case 0:if(this.state!==ea.EXTERNAL_XFDF_NOT_REQUESTED)return[3,2];e=this.aa.getDocument().kq();return[4,this.z4(e)];case 1:a=aa.ea(),b=this.d0(a),this.vE=null!==(la=null===b||void 0===b?void 0:b.parse())&&void 0!==la?la:null,this.state=null===this.vE?ea.EXTERNAL_XFDF_NOT_AVAILABLE:ea.EXTERNAL_XFDF_AVAILABLE,aa.label=2;case 2:if(this.state===ea.EXTERNAL_XFDF_NOT_AVAILABLE)return f(w),
[2];n=new DOMParser;h=n.parseFromString(w,"text/xml");y.forEach(function(ca){ha.merge(h,ha.vE,ca-1)});x=new XMLSerializer;z=x.serializeToString(h);f(z);return[2]}})})}};da.prototype.GH=function(ba){this.z4=ba};da.prototype.Zd=function(){this.vE=void 0;this.state=ea.EXTERNAL_XFDF_NOT_REQUESTED};da.prototype.d0=function(ba){return ba?Array.isArray(ba)?new ja.a(ba):"string"!==typeof ba?null:(new DOMParser).parseFromString(ba,"text/xml").querySelector("xfdf > add")?new ja.a(ba):new ka.a(ba):null};da.prototype.merge=
function(ba,w,y){var f=this;0===y&&(this.t8(ba,w.qn),this.v8(ba,w.hE));var e=w.ca[y];e&&(this.w8(ba,e.xl),this.y8(ba,e.yU,w.It),this.x8(ba,e.page,y),this.u8(ba,e.FM));e=this.aa.Gb();if(y===e-1){var a=w.It;Object.keys(a).forEach(function(b){a[b].AF||f.bQ(ba,b,a[b])})}};da.prototype.t8=function(ba,w){null!==w&&(ba=this.Us(ba),this.Do(ba,"calculation-order",w))};da.prototype.v8=function(ba,w){null!==w&&(ba=this.Us(ba),this.Do(ba,"document-actions",w))};da.prototype.w8=function(ba,w){var y=this,f=this.Ts(ba.querySelector("xfdf"),
"annots");Object.keys(w).forEach(function(e){y.Do(f,'[name="'+e+'"]',w[e])})};da.prototype.y8=function(ba,w,y){var f=this;if(0!==w.length){var e=this.Us(ba);w.forEach(function(a){var b=a.getAttribute("field"),n=y[b];n&&(f.bQ(ba,b,n),f.Do(e,"null",a))})}};da.prototype.bQ=function(ba,w,y){var f=this.Us(ba);null!==y.Qy&&this.Do(f,'ffield [name="'+w+'"]',y.Qy);ba=this.Ts(ba.querySelector("xfdf"),"fields");w=w.split(".");this.ZG(ba,w,0,y.value);y.AF=!0};da.prototype.x8=function(ba,w,y){null!==w&&(ba=this.Us(ba),
ba=this.Ts(ba,"pages"),this.Do(ba,'[number="'+(y+1)+'"]',w))};da.prototype.u8=function(ba,w){Object.keys(w).forEach(function(y){(y=ba.querySelector('annots [name="'+y+'"]'))&&y.parentElement.removeChild(y)})};da.prototype.ZG=function(ba,w,y,f){if(y===w.length)w=document.createElementNS("","value"),w.textContent=f,this.Do(ba,"value",w);else{var e=w[y];this.Ts(ba,'[name="'+e+'"]',"field").setAttribute("name",e);ba=ba.querySelectorAll('[name="'+e+'"]');1===ba.length?this.ZG(ba[0],w,y+1,f):(e=this.l3(ba),
this.ZG(y===w.length-1?e:this.tda(ba,e),w,y+1,f))}};da.prototype.l3=function(ba){for(var w=null,y=0;y<ba.length;y++){var f=ba[y];if(0===f.childElementCount||1===f.childElementCount&&"value"===f.children[0].tagName){w=f;break}}return w};da.prototype.tda=function(ba,w){for(var y=0;y<ba.length;y++)if(ba[y]!==w)return ba[y];return null};da.prototype.Do=function(ba,w,y){w=ba.querySelector(w);null!==w&&ba.removeChild(w);ba.appendChild(y)};da.prototype.Us=function(ba){var w=ba.querySelector("pdf-info");
if(null!==w)return w;w=this.Ts(ba.querySelector("xfdf"),"pdf-info");w.setAttribute("xmlns","http://www.pdftron.com/pdfinfo");w.setAttribute("version","2");w.setAttribute("import-version","4");return w};da.prototype.Ts=function(ba,w,y){var f=ba.querySelector(w);if(null!==f)return f;f=document.createElementNS("",y||w);ba.appendChild(f);return f};return da}();ua["default"]=Ca},411:function(Ca,ua){Ca=function(){function r(){}r.prototype.Cx=function(pa){var ja={qn:null,hE:null,It:{},ca:{}};pa=(new DOMParser).parseFromString(pa,
"text/xml");ja.qn=pa.querySelector("pdf-info calculation-order");ja.hE=pa.querySelector("pdf-info document-actions");ja.It=this.s9(pa);ja.ca=this.E9(pa);return ja};r.prototype.s9=function(pa){var ja=pa.querySelector("fields");pa=pa.querySelectorAll("pdf-info > ffield");if(null===ja&&null===pa)return{};var ka={};this.XY(ka,ja);this.UY(ka,pa);return ka};r.prototype.XY=function(pa,ja){if(null!==ja&&ja.children){for(var ka=[],ea=0;ea<ja.children.length;ea++){var da=ja.children[ea];ka.push({name:da.getAttribute("name"),
element:da})}for(;0!==ka.length;)for(ja=ka.shift(),ea=0;ea<ja.element.children.length;ea++)da=ja.element.children[ea],"value"===da.tagName?pa[ja.name]={value:da.textContent,Qy:null,AF:!1}:da.children&&ka.push({name:ja.name+"."+da.getAttribute("name"),element:da})}};r.prototype.UY=function(pa,ja){ja.forEach(function(ka){var ea=ka.getAttribute("name");pa[ea]?pa[ea].Qy=ka:pa[ea]={value:null,Qy:ka,AF:!1}})};r.prototype.E9=function(pa){var ja=this,ka={};pa.querySelectorAll("pdf-info widget").forEach(function(ea){var da=
parseInt(ea.getAttribute("page"),10)-1;ja.Lz(ka,da);ka[da].yU.push(ea)});pa.querySelectorAll("pdf-info page").forEach(function(ea){var da=parseInt(ea.getAttribute("number"),10)-1;ja.Lz(ka,da);ka[da].page=ea});this.jO(pa).forEach(function(ea){var da=parseInt(ea.getAttribute("page"),10),ba=ea.getAttribute("name");ja.Lz(ka,da);ka[da].xl[ba]=ea});this.VN(pa).forEach(function(ea){var da=parseInt(ea.getAttribute("page"),10);ea=ea.textContent;ja.Lz(ka,da);ka[da].FM[ea]=!0});return ka};r.prototype.Lz=function(pa,
ja){pa[ja]||(pa[ja]={xl:{},FM:{},yU:[],page:null})};return r}();ua.a=Ca},425:function(Ca,ua,r){var pa=r(1),ja=r(0);r.n(ja);Ca=function(ka){function ea(da){var ba=ka.call(this)||this;ba.Y2=Array.isArray(da)?da:[da];return ba}Object(pa.c)(ea,ka);ea.prototype.parse=function(){var da=this,ba={qn:null,hE:null,It:{},ca:{}};this.Y2.forEach(function(w){ba=Object(ja.merge)(ba,da.Cx(w))});return ba};ea.prototype.jO=function(da){var ba=[];da.querySelectorAll("add > *").forEach(function(w){ba.push(w)});da.querySelectorAll("modify > *").forEach(function(w){ba.push(w)});
return ba};ea.prototype.VN=function(da){return da.querySelectorAll("delete > *")};return ea}(r(411).a);ua.a=Ca},426:function(Ca,ua,r){var pa=r(1);Ca=function(ja){function ka(ea){var da=ja.call(this)||this;da.Z2=ea;return da}Object(pa.c)(ka,ja);ka.prototype.parse=function(){return this.Cx(this.Z2)};ka.prototype.jO=function(ea){return ea.querySelectorAll("annots > *")};ka.prototype.VN=function(){return[]};return ka}(r(411).a);ua.a=Ca}}]);}).call(this || window)
