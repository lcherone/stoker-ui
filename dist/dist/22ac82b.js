(window.webpackJsonp=window.webpackJsonp||[]).push([[12,2,9],{701:function(t,e,n){var content=n(704);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(104).default)("409a058e",content,!0,{sourceMap:!1})},702:function(t,e,n){"use strict";n.r(e);n(34),n(102);var r={props:{title:{type:String,default:""},description:{type:String,default:""},keywords:{type:String,default:""},canonical:{type:String,default:""}},head:function(){return{title:this.$trim(this.title),meta:[{hid:"description",name:"description",content:this.$trim(this.description)},{hid:"keywords",name:"keywords",content:this.keywords},{hid:"canonical",rel:"canonical",href:this.canonical}]}}},o=n(77),component=Object(o.a)(r,(function(){this._self._c;return this._e()}),[],!1,null,null,null);e.default=component.exports},703:function(t,e,n){"use strict";n(701)},704:function(t,e,n){var r=n(103)((function(i){return i[1]}));r.push([t.i,".alert[data-v-6832c19c]{border-radius:0;margin-bottom:10px;margin-top:10px;padding:.75rem 1.25rem}@media(min-width:0px)and (max-width:480px){.alert[data-v-6832c19c]{padding:.5rem}}.alert .close[data-v-6832c19c]{font-size:28px;padding:.5rem 1rem;text-shadow:none!important}@media(min-width:0px)and (max-width:480px){.alert .close[data-v-6832c19c]{font-size:24px;padding:3px 5px}}",""]),r.locals={},t.exports=r},705:function(t,e,n){"use strict";n.r(e);var r={props:{alert:{type:Object,default:function(){return{type:void 0,dismissible:!1,message:""}}}},methods:{close:function(){this.alert.type=this.alert.message=void 0}}},o=(n(703),n(77)),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return t.alert.type?e("div",{class:["alert fade show",t.alert.type,{"alert-dismissible":t.alert.dismissible}],attrs:{role:"alert"}},[t.alert.dismissible?e("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.close()}}},[e("span",[t._v("×")])]):t._e(),t._v(" "),e("span",{domProps:{innerHTML:t._s(t.alert.message)}})]):t._e()}),[],!1,null,"6832c19c",null);e.default=component.exports},713:function(t,e,n){"use strict";n.r(e);n(34),n(30),n(40),n(41),n(25),n(13),n(29);var r=n(8),o=n(88);function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var c={name:"Domains",data:function(){return{res:null,alert:{message:"",type:"",dismissible:!0},items:[],tableColumns:["Name","Status","Offsite","Dme Id","Created"],tableOptions:{headings:{Name:"Name",Status:"Status",Offsite:"Offsite","Dme Id":"Dme Id",Created:"Created"},sortable:["Name","Created"],filterable:["Name","Dme Id"]}}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},Object(o.b)({header:function(t){return t.header}})),beforeCreate:function(){this.items=this.$storage.domains||[]},beforeMount:function(){this.$nextTick(this.init)},methods:{init:function(){var t=this;this.$ajax.get("/domains").then((function(e){t.items=e,t.$storage.domains=e})).catch((function(){t.alert={message:"Failed to load domains, refresh page or try again.",type:"alert-danger",dismissible:!0}}))}}},d=c,m=n(77),component=Object(m.a)(d,(function(){var t=this,e=t._self._c;return e("div",[e("SEOHead",{attrs:{title:"Domains",description:"View and manage domains",canonical:"/domains"}}),t._v(" "),e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[t.alert.message?e("alert",{attrs:{alert:t.alert}}):t._e(),t._v(" "),e("v-client-table",{attrs:{columns:t.tableColumns,options:t.tableOptions},model:{value:t.items,callback:function(e){t.items=e},expression:"items"}})],1)])])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{SEOHead:n(702).default,Alert:n(705).default})}}]);