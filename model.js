/* Núcleo didáctico comprobable. Sin dependencias ni sintaxis de un fabricante. */
(function(root){
  'use strict';
  const logic=(mode,a,b)=>mode==='AND'?Boolean(a&&b):mode==='OR'?Boolean(a||b):!a;
  const seal=(previous,start,stopOK,overloadOK)=>Boolean(stopOK&&overloadOK&&(start||previous));
  const timer=(previous,input,seconds,preset)=>({
    elapsed:input?Math.min(preset,previous.elapsed+Math.max(0,seconds)):0,
    q:Boolean(input&&previous.elapsed+Math.max(0,seconds)>=preset)
  });
  const counter=(previous,input,reset,preset)=>({
    value:reset?0:previous.value+(input&&!previous.previousInput?1:0),
    previousInput:Boolean(input),
    q:!reset&&(previous.value+(input&&!previous.previousInput?1:0))>=preset
  });
  const interlock=(forward,reverse,permission)=>({
    forward:Boolean(permission&&forward&&!reverse),
    reverse:Boolean(permission&&reverse&&!forward)
  });
  const model={logic,seal,timer,counter,interlock};
  if(typeof module!=='undefined'&&module.exports)module.exports=model;
  else root.PLCModel=model;
})(typeof window!=='undefined'?window:this);
