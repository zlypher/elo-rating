const chai = require('chai');
var expect = chai.expect;
var EloRating = require('./../src/elo-rating');

describe('EloRating', () => {
    it('should have a default k factor of 20', () => {
        expect(EloRating.k).to.equal(20);
    });

    it('should calculate the rating difference', () => {
        expect(EloRating.ratingDifference(1000, 1300)).to.equal(-300);
        expect(EloRating.ratingDifference(2000, 1750)).to.equal(250);
    })

    it('should cap the rating difference at +400/-400', () => {
        expect(EloRating.ratingDifference(1000, 2000)).to.equal(-400);
        expect(EloRating.ratingDifference(3000, 2000)).to.equal(400);
    });

    it('should have an expected value of 0.5 for equal ratings', () => {
        expect(EloRating.expected(1500, 1500)).to.equal(0.5);
        expect(EloRating.expected(100, 100)).to.equal(0.5);
        expect(EloRating.expected(3100, 3100)).to.equal(0.5);
    });

    it('expected values should add up to 1', () => {
        const p1Rating = 1500;
        const p2Rating = 1200;
        const expectedOne = EloRating.expected(p1Rating, p2Rating);
        const expectedTwo = EloRating.expected(p2Rating, p1Rating);

        expect(expectedOne + expectedTwo).to.equal(1);
    })
});