/**
 * Created by vadasz on 2014.10.06..
 */

/**
 * Vector type
 * @class
 */
export class Vector{
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * Add vectors
     *
     * @param {Vector}v     Other vector
     * return {Vector}      Added vector
     */
    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }

    /**
     * Subtract vectors
     *
     * @param {Vector}v     Other vector
     * @returns {Vector}    Subtracted vector
     */
    sub(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    /**
     * @returns {Vector}    Negated vector
     */
    neg(){
        return new Vector(-this.x, -this.y);
    }

    /**
     * Scale vector
     *
     * @param {number}s     Scale factor
     * @returns {Vector}    Scaled vector
     */
    scale(s){
        return new Vector(this.x * s, this.y * s);
    }

    /**
     * Multiply vectors
     *
     * @param {Vector} v    Other vector
     * @returns {Vector}    Multiplied vector
     */
    mul(v){
        return new Vector(this.x * v.x, this.y * v.y);
    }

    /**
     * Divide vectors
     *
     * @param {Vector} v    Other vector
     * @returns {Vector}    Divided vector
     */
    div(v){
        return new Vector(this.x / v.x, this.y / v.y);
    }

    /**
     * Dot multiply vectors
     *
     * @param {Vector} v    Other vector
     * @returns {number}    Dot multiplied number
     */
    dot(v){
        return this.x * v.x + this.y * v.y;
    }

    /**
     * @returns {number}    Length
     */
    len(){
        return Math.sqrt(this.sqrLen());
    }

    /**
     * @returns {number}    Squared length
     */
    sqrLen(){
        var {x, y} = this;
        return x * x + y * y;
    }

    /**
     * Normalize vector
     *
     * @returns {Vector}    Normalized vector
     */
    normalize(){
        var len = this.len();
        if (len !== 0){
            var num = 1.0 / len;
            this.x *= num;
            this.y *= num;
        }
        return this;
    }

    /**
     * Distance between vectors
     *
     * @param {Vector}v     Other vector
     * @returns {number}    Distance
     */
    distance(v){
        return Math.sqrt(this.sqrDistance(v));
    }

    /**
     * Square distance between vectors
     *
     * @param {Vector}v     Other vector
     * @returns {number}    Squared distance
     */
    sqrDistance(v){
        var x = this.x - v.x,
            y = this.y - v.y;
        return x * x + y * y;
    }

    /**
     * Compare vectors
     *
     * @param {Vector}v     Other vector
     * @returns {boolean}   `true` if the tho vector are equal else `false`
     */
    equals(v){
        return this.x === v.x && this.y === v.y;
    }

    toString (){
        return `[${this.x}, ${this.x}]`;
    }

    toArray(){
        return [this.x, this.y];
    }

    clone(){
        return new Vector(this.x, this.y);
    }
}