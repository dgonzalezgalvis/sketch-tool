import { AngleCalculator } from './angle-calculator.service';

describe('Angle Calculator Service testing', function () {
    it('Creates instance', function () {
        const service = new AngleCalculator();
        expect(service!==null).toEqual(true);
    });

    it('Calculates rect angle', function () {
        const service = new AngleCalculator();
        const a = {
            x: 50,
            y: 50
        }
        const b = {
            x: 50,
            y: 100
        }
        const c = {
            x: 100,
            y: 100
        }
        const angle = service.findAngleDegrees(a, b, c);
        console.log(angle);
        expect(angle).toEqual(90);
    });

    it('Calculates other angles', function () {
        const service = new AngleCalculator();
        const a = {
            x: 100,
            y: 100
        }
        const b = {
            x: 50,
            y: 50
        }
        const c = {
            x: 50,
            y: 100
        }
        const angle = service.findAngleDegrees(a, b, c);
        expect(Math.round(angle)).toEqual(45);
    });
});