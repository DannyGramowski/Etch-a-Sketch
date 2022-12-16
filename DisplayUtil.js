export class Coordinate{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    distance(coord) {
        let xDist = this.x - coord.x;
        let yDist = this.y - coord.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    }

    hash() {
        return 31 * this.x + this.y;
    }
}

