import e from"react";!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}(".textBtn{\n    display: inline-flex;\n    outline: 0;\n    border: 0;\n    font-family: 'Lato';\n    color: #008CFF;\n    font-size: 14px;\n    background: none;\n    cursor: pointer;\n    font-weight: 700;\n}");const t=({text:t,onClick:n=(()=>{}),buttonColor:o="#008CFF",fontSize:i,customClass:l})=>e.createElement("button",{className:`textBtn ${l||""}`,style:{fontSize:i,color:o},onClick:n},t);export{t as default};
