/**
 * Created by vadasz on 2014.09.29..
 */

import {Controller} from './input';
import {Ball} from './ball';

var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext("2d"),
    ctxW = canvas.width,
    ctxH = canvas.height,
    ctrl = new Controller(canvas),
    ball = new Ball(5, ctxW / 2, ctxH / 2);

function loop(){
    clear();
    render();
    //window.requestAnimationFrame(loop);
}

loop();


function render(){
    var {x ,y} = ctrl.getCoord();
    ctx.fillStyle = '#000';
    ctx.fillRect(x-30, ctxH-10, 60, 10);

    ball.render(ctx);
}

function clear(){
    ctx.clearRect(0, 0, ctxW, ctxH);
}

