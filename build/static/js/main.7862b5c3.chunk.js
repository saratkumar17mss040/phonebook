(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),a=n(15),o=n.n(a),u=n(6),i=n(3),s=n(0),l=function(e){var t=e.name;return Object(s.jsx)("h2",{children:t})},d=function(e){var t=e.newName,n=e.newNumber,r=e.addNewName,c=e.updateByField;return Object(s.jsxs)("form",{onSubmit:r,children:[Object(s.jsxs)("div",{children:["Name:"," ",Object(s.jsx)("input",{type:"text",value:t,onChange:c("name"),required:!0})]}),Object(s.jsxs)("div",{children:["Phone number:"," ",Object(s.jsx)("input",{type:"number",value:n,onChange:c("number"),required:!0})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var t=e.filterName,n=e.updateByField;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("p",{children:"Filter shown with:"}),Object(s.jsx)("input",{onChange:n("filterName"),type:"text",value:t})]})},b=function(e){var t=e.persons,n=e.deletePerson;return t.map((function(e){var t=e.id,r=e.name,c=e.number;return Object(s.jsxs)("div",{children:[Object(s.jsxs)("p",{children:[r," ",c]}),Object(s.jsx)("button",{onClick:function(){return n(t)},type:"button",children:"delete"})]},t)}))},f=function(e){var t=e.filterName,n=e.persons,r=e.deletePerson;if(""===t)return Object(s.jsx)(b,{persons:n,deletePerson:r});var c=n.filter((function(e){return e.name.toLowerCase()===t.toLowerCase()}));return Object(s.jsx)(b,{persons:c,deletePerson:r})},m=n(4),h=n.n(m),p="/api/persons",O={getAll:function(){return h.a.get(p).then((function(e){return e.data}))},create:function(e){return h.a.post(p,e).then((function(e){return e.data}))},update:function(e,t){return h.a.put("".concat(p,"/").concat(e),t).then((function(e){return e.data}))},remove:function(e){return h.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))}},v=function(e){var t=e.message;return null===t?null:Object(s.jsx)("div",{className:"I"===t[0]?"error":"notification",children:Object(s.jsx)("em",{children:Object(s.jsx)("p",{children:t})})})},x=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),o=Object(i.a)(a,2),b=o[0],m=o[1],h=Object(r.useState)(""),p=Object(i.a)(h,2),x=p[0],w=p[1],N=Object(r.useState)(""),g=Object(i.a)(N,2),y=g[0],C=g[1],k=Object(r.useState)(null),P=Object(i.a)(k,2),S=P[0],F=P[1];Object(r.useEffect)((function(){O.getAll().then((function(e){c(e)})).catch((function(e){console.error(e)}))}),[]);var B=function(e){return function(t){"name"===e?m(t.target.value):"number"===e?w(t.target.value):"filterName"===e&&C(t.target.value)}};return Object(s.jsxs)("div",{className:"main",children:[Object(s.jsx)(v,{message:S}),Object(s.jsx)(l,{name:"Phonebook"}),Object(s.jsx)(j,{filterName:y,updateByField:B}),Object(s.jsx)(l,{name:"Add a new person"}),Object(s.jsx)(d,{newName:b,newNumber:x,addNewName:function(e){e.preventDefault();var t=n.filter((function(e){return e.name.toLowerCase()===b.toLowerCase()}));if(0!==t.length){var r=t[0].number,a=t[0],o=Object(u.a)(Object(u.a)({},a),{},{number:x}),i=window.confirm("".concat(b," is already added to the phonebook, replace the old number with a new one ?"));i&&r===x?alert("".concat(b,", it seems the new number is same as the old one. Try entering a new number")):i?O.update(o.id,o).then((function(e){c(n.map((function(t){return t.id===a.id?e:t}))),F("".concat(e.name," was successfully updated")),setTimeout((function(){F(null)}),2e3),m(""),w("")})).catch((function(e){c(n.filter((function(e){return e.id!==o.id}))),F("Information of ".concat(o.name," was already deleted from the server")),setTimeout((function(){F(null)}),2e3)})):alert("Update operation got cancelled")}else{var s={name:b,number:x};O.create(s).then((function(e){c(n.concat(e))})).catch((function(e){console.error(e)})),console.log(s),F("Added ".concat(b)),setTimeout((function(){F(null)}),2e3)}m(""),w("")},updateByField:B}),Object(s.jsx)(l,{name:"Numbers"}),Object(s.jsx)(f,{filterName:y,persons:n,deletePerson:function(e){var t=n.filter((function(t){return t.id===e})),r="Delete ".concat(t[0].name," ?"),a=t[0].name;window.confirm(r)&&(O.remove(e).catch((function(e){return console.error(e)})),alert("".concat(a," successfully deleted !")),c(n.filter((function(t){return t.id!==e}))))}})]})};n(39);o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.7862b5c3.chunk.js.map