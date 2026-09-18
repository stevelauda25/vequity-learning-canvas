export type Camera = { x:number; y:number; scale:number };
export const clampScale = (value:number) => Math.min(1.8, Math.max(0.035,value));
export function zoomAt(camera:Camera, factor:number, point:{x:number;y:number}):Camera {
 const scale=clampScale(camera.scale*factor);
 return {scale,x:point.x-(point.x-camera.x)/camera.scale*scale,y:point.y-(point.y-camera.y)/camera.scale*scale};
}
export function fitRegion(region:{x:number;y:number;w:number;h:number},size:{w:number;h:number},all=false):Camera{
 const pad=all?40:48,top=76,bottom=94;
 const scale=Math.max(.035,Math.min((size.w-pad*2)/region.w,(size.h-top-bottom)/region.h,all?1.8:1));
 return {scale,x:(size.w-region.w*scale)/2-region.x*scale,y:top+(size.h-top-bottom-region.h*scale)/2-region.y*scale};
}
