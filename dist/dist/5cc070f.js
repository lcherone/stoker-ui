(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{724:function(t,e,n){"use strict";n.r(e);n(175);var r={props:{data:{type:Object,required:!0},index:{type:Number,required:!0},column:{type:String,required:!0}},data:function(){return{branch:"",submitted:!1,result:{output:"",error:"",return_value:0}}},beforeMount:function(){this.branch=this.data[this.column]},methods:{close:function(){this.$emit("refresh"),this.$modal.hide()},setBranch:function(){var t=this;this.branch&&(this.$storage.deployments=[],this.submitted=!0,this.$ajax.post("/deployment/change",{handle:this.data.Handle,machine:this.data.Machine,env:this.data.Env,alias:this.data.Alias,branch:this.branch}).then((function(e){t.result=e})))},setMaster:function(){this.branch="master",this.setBranch()}}},o=n(77),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal-dialog modal-lg"},[e("div",{staticClass:"modal-content"},[e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[t._v("\n        Deployment Branch\n      ")]),t._v(" "),e("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(e){return t.close()}}},[t._v("\n        ×\n      ")])]),t._v(" "),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label",attrs:{for:"branch-name"}},[t._v("Branch")]),t._v(" "),e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.branch,expression:"branch"}],staticClass:"form-control",attrs:{id:"branch-name",type:"text",placeholder:"Enter branch name..."},domProps:{value:t.branch},on:{input:function(e){e.target.composing||(t.branch=e.target.value)}}}),t._v(" "),e("span",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-success",attrs:{type:"button",disabled:t.submitted},on:{click:t.setBranch}},[t._v("\n              "+t._s(t.submitted?"Updated":"Change")+"\n            ")])]),t._v(" "),e("span",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-dark",attrs:{type:"button",disabled:t.submitted},on:{click:t.setMaster}},[t._v("\n              "+t._s(t.submitted?"Updated":"Set to Master")+"\n            ")])])])]),t._v(" "),t.submitted?e("div",[t.result.return_value?e("h4",[t._v("\n          Deployment Error\n        ")]):e("h4",[t._v("\n          Updating deployment\n        ")]),t._v(" "),t.result.output?e("pre",[t._v(t._s(t.result.output))]):t._e(),t._v(" "),t.result.error?e("pre",[t._v(t._s(t.result.error))]):t._e()]):t._e()]),t._v(" "),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:function(e){return t.close()}}},[t._v("\n        Close\n      ")])])])])}),[],!1,null,null,null);e.default=component.exports}}]);