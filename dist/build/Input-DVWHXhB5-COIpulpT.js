import{r as s,bV as w,bW as E,K as y,bX as m,j as n,bY as D,M as f,N as M,O as R,k as U}from"./strapi-D1Jqx4dh.js";function L(e,i){const[l,o]=s.useState(e);return s.useEffect(()=>{const a=setTimeout(()=>{o(e)},i);return()=>{clearTimeout(a)}},[e,i]),l}const P=U.div`
  width: 2em;
  height: 2em;
  display: inline-block;
  margin-right: 0.75em;
  vertical-align: middle;
  background-color: currentColor;
  ${({src:e,colorMask:i})=>i?`
    mask-image: url(${e});
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
    -webkit-mask-image: url(${e});
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
  `:`
    background-image: url(${e});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  `}
`,x=({src:e,alt:i,colorMask:l})=>n.jsx(P,{src:e,"aria-label":i,colorMask:l}),q=e=>{const i=w(),{get:l}=E(),o=e.attribute.customField,a=y(e.name),[I,g]=s.useState(!0),[u,v]=s.useState(void 0),[j,F]=s.useState(""),b=L(j,600),[c,S]=s.useState(void 0),[d,k]=s.useState(void 0),C=s.useCallback(async t=>{const r=await l(`/${m}/config/custom-fields/${t}`);S(r.data)},[]),$=s.useCallback(async()=>{if(c){if(g(!0),!u||c.searchable)if(e.disabled){if(a.value){const t=await l(`/${m}/custom-fields/${o}/item?value=${encodeURIComponent(a.value)}`);v([t.data])}}else{const t=new URLSearchParams;c.searchable&&b&&t.set("query",b);const r=await l(`/${m}/custom-fields/${o}/items?${t.toString()}`);if(a.value&&!r.data.items.find(h=>h.value===a.value)){const h=await l(`/${m}/custom-fields/${o}/item?value=${encodeURIComponent(a.value)}`);r.data.items.push(h.data)}v(r.data.items)}g(!1)}},[e.disabled,c,b]);return s.useEffect(()=>{C(o).catch(t=>{console.error(`Error fetching custom field config for CustomField[${o}]:`,t)})},[C,o]),s.useEffect(()=>{c&&$().catch(t=>{console.error(`Error fetching items for CustomField[${o}]:`,t)})},[$,c]),s.useEffect(()=>{a.value?k(u?.find(t=>t.value===a.value)):k(void 0)},[a.value,u]),n.jsx(D,{theme:i,children:n.jsxs(f.Root,{disabled:e.disabled,required:e.required,hint:e.hint,name:e.name,id:e.name,error:a.error,children:[n.jsx(f.Label,{children:e.label}),n.jsx(M,{onChange:t=>a.onChange(e.name,t??""),value:a.value,placeholder:e.placeholder,disabled:e.disabled,loading:I,autocomplete:{type:"list",filter:"contains"},onInputChange:t=>F(t.target.value),filterValue:c?.searchable?"":void 0,startIcon:d?.icon?n.jsx(x,{src:d.icon.src,alt:d.label,colorMask:d.icon.colorMask}):null,onClear:()=>a.onChange(e.name,""),children:u?.map(t=>n.jsxs(R,{value:t.value,children:[t.icon?n.jsx(x,{src:t.icon.src,alt:t.label,colorMask:t.icon.colorMask}):null,t.label]},t.value))}),n.jsx(f.Hint,{}),n.jsx(f.Error,{})]})})};export{q as Input};
