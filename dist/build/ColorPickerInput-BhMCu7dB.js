import{r as n,u as w,a as P,b as R,j as r,F as o,c,P as p,T as h,d as y,g as d,B as T,e as i,f as _}from"./strapi-xQBhG2Ef.js";import{Z as F}from"./index-BZVPsdYi.js";const B=i.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${e=>e.color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`,E=i(F)`
  && {
    width: 100%;
    aspect-ratio: 1.5;
  }

  .react-colorful__pointer {
    width: ${({theme:e})=>e.spaces[3]};
    height: ${({theme:e})=>e.spaces[3]};
  }

  .react-colorful__saturation {
    border-radius: ${({theme:e})=>e.spaces[1]};
    border-bottom: none;
  }

  .react-colorful__hue {
    border-radius: 10px;
    height: ${({theme:e})=>e.spaces[3]};
    margin-top: ${({theme:e})=>e.spaces[2]};
  }
`,I=i(_)`
  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  svg {
    width: ${({theme:e})=>e.spaces[2]};
    height: ${({theme:e})=>e.spaces[2]};
  }

  svg > path {
    fill: ${({theme:e})=>e.colors.neutral500};
    justify-self: flex-end;
  }
`,M=i(p.Content)`
  padding: ${({theme:e})=>e.spaces[2]};
  min-height: 270px;
`,O=n.forwardRef(({hint:e,disabled:u,labelAction:g,label:x,name:s,required:f,...j},C)=>{const[m,b]=n.useState(!1),k=n.useRef(null),{formatMessage:l}=w(),a=P(s),t=a.value??"#000000",v=R(C,k);return r.jsx(o.Root,{name:s,id:s,error:a.error,hint:e,required:f,children:r.jsxs(c,{direction:"column",alignItems:"stretch",gap:1,children:[r.jsx(o.Label,{action:g,children:x}),r.jsxs(p.Root,{onOpenChange:b,children:[r.jsx(p.Trigger,{children:r.jsxs(I,{ref:v,"aria-label":l({id:d("color-picker.toggle.aria-label"),defaultMessage:"Color picker toggle"}),"aria-controls":"color-picker-value","aria-haspopup":"dialog","aria-expanded":m,"aria-disabled":u,disabled:u,variant:"tertiary",size:"L",children:[r.jsxs(c,{children:[r.jsx(B,{color:t}),r.jsx(h,{style:{textTransform:"uppercase"},textColor:a.value?void 0:"neutral600",variant:"omega",children:t})]}),r.jsx(y,{"aria-hidden":!0})]})}),r.jsxs(M,{sideOffset:4,children:[r.jsx(E,{color:t,onChange:$=>a.onChange(s,$)}),r.jsxs(c,{paddingTop:3,paddingLeft:4,justifyContent:"flex-end",children:[r.jsx(T,{paddingRight:2,children:r.jsx(h,{variant:"omega",tag:"label",textColor:"neutral600",children:l({id:d("color-picker.input.format"),defaultMessage:"HEX"})})}),r.jsx(o.Root,{children:r.jsx(o.Input,{"aria-label":l({id:d("color-picker.input.aria-label"),defaultMessage:"Color picker input"}),style:{textTransform:"uppercase"},name:s,defaultValue:t,placeholder:"#000000",onChange:a.onChange,...j})})]})]})]}),r.jsx(o.Hint,{}),r.jsx(o.Error,{})]})})});export{O as ColorPickerInput};
