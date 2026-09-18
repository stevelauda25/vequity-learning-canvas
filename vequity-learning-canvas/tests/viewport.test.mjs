import test from 'node:test';
import assert from 'node:assert/strict';
import { zoomAt, fitRegion } from '../lib/viewport.ts';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
test('Zoom preserves the world location under the pointer, including zoom limits',()=>{
 for(const factor of [0.0001,.7,1.5,100]){
  const before={x:-713,y:223,scale:.65},point={x:347,y:291};
  const after=zoomAt(before,factor,point);
  close((point.x-before.x)/before.scale,(point.x-after.x)/after.scale);
  close((point.y-before.y)/before.scale,(point.y-after.y)/after.scale);
  assert.ok(after.scale>=.035&&after.scale<=1.8);
 }
});
test('Fitting any chapter keeps its full bounds inside the usable desktop viewport',()=>{
 const regions=[{x:80,y:80,w:1080,h:740},{x:1390,y:2120,w:1080,h:920}];
 for(const size of [{w:1204,h:834},{w:814,h:702}])for(const r of regions){
  const c=fitRegion(r,size);
  assert.ok(c.x+r.x*c.scale>=47.999);
  assert.ok(c.x+(r.x+r.w)*c.scale<=size.w-47.999);
  assert.ok(c.y+r.y*c.scale>=75.999);
  assert.ok(c.y+(r.y+r.h)*c.scale<=size.h-93.999);
 }
});
test('The entire board remains contained when fitting all chapters',()=>{
 const r={x:30,y:30,w:2490,h:4170};
 for (const size of [{w:1204,h:834},{w:900,h:634},{w:375,h:500}]) {
 const c=fitRegion(r,size,true);
 assert.ok(c.x+r.x*c.scale>=0);
 assert.ok(c.y+r.y*c.scale>=0);
 assert.ok(c.x+(r.x+r.w)*c.scale<=size.w);
 assert.ok(c.y+(r.y+r.h)*c.scale<=size.h);
 }
});
