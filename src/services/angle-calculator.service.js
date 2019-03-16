export class AngleCalculator {
    constructor() {

    }

    findAngle(pointA, pointB, pointC) {
        var AB = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
        var BC = Math.sqrt(Math.pow(pointB.x - pointC.x, 2) + Math.pow(pointB.y - pointC.y, 2));
        var AC = Math.sqrt(Math.pow(pointC.x - pointA.x, 2) + Math.pow(pointC.y - pointA.y, 2));
        return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
    }

    findAngleDegrees(pointA, pointB, pointC) {
        return (this.findAngle(pointA, pointB, pointC) * 180) / Math.PI;
    }
}