/**
 * Created by vadasz on 2014.10.06..
 */
export class Controller {
    constructor (target){
        this._coord = {x: 0, y: 0};
        target.addEventListener('mousemove', this._move.bind(this));
    }

    _move (event){
        this._coord = {x: event.offsetX, y: event.offsetY};
    }

    getCoord (){
        return this._coord;
    }
}