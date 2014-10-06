/**
 * Created by vadasz on 2014.10.06..
 */

import {Vector} from './utils/vector';

var ANGLE_360 = Math.PI * 2;

export class Ball{
    constructor(radius, x, y){
        this.r = radius;
        this.pos = new Vector(x, y);
    }

    render (ctx){
        var pos = this.pos;

        ctx.beginPath();
        ctx.fillStyle = '#f00';
        ctx.arc(pos.x, pos.y, this.r, 0, ANGLE_360, false);
        ctx.fill();
        ctx.closePath();
    }
}
