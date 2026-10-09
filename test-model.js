'use strict';
const assert = require('node:assert/strict');
const m = require('./model.js');
for (const a of [false,true]) for (const b of [false,true]) {
  assert.equal(m.logic('AND',a,b),a&&b);
  assert.equal(m.logic('OR',a,b),a||b);
  assert.equal(m.logic('NOT',a,b),!a);
}
assert.equal(m.seal(false,true,true,true),true);
assert.equal(m.seal(true,false,true,true),true);
assert.equal(m.seal(true,true,false,true),false);
assert.equal(m.seal(true,false,true,false),false);
assert.equal(m.seal(false,false,true,true),false);
let t={elapsed:0,q:false};
t=m.timer(t,true,2,3); assert.equal(t.q,false);
t=m.timer(t,true,1,3); assert.deepEqual(t,{elapsed:3,q:true});
t=m.timer(t,false,0,3); assert.deepEqual(t,{elapsed:0,q:false});
let c={value:0,previousInput:false,q:false};
c=m.counter(c,true,false,3); assert.equal(c.value,1);
for(let i=0;i<20;i++)c=m.counter(c,true,false,3);
assert.equal(c.value,1);
for(let i=0;i<2;i++){c=m.counter(c,false,false,3);c=m.counter(c,true,false,3);}
assert.equal(c.value,3);assert.equal(c.q,true);
c=m.counter(c,true,true,3);assert.equal(c.value,0);assert.equal(c.q,false);
c=m.counter(c,true,false,3);assert.equal(c.value,0);
assert.deepEqual(m.interlock(true,true,true),{forward:false,reverse:false});
console.log('OK: AND/OR/NOT, marcha-paro, TON, CTU y exclusión mutua.');
