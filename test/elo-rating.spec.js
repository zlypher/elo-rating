const chai = require('chai');
var expect = chai.expect;
var EloRating = require('./../src/elo-rating');

describe('EloRating', () => {
    describe('rating difference', () => {
        it('should calculate the rating difference', () => {
            expect(EloRating.ratingDifference(1000, 1300)).to.equal(-300);
            expect(EloRating.ratingDifference(2000, 1750)).to.equal(250);
        })

        it('should cap the rating difference at +400/-400', () => {
            expect(EloRating.ratingDifference(1000, 2000)).to.equal(-400);
            expect(EloRating.ratingDifference(3000, 2000)).to.equal(400);
        });
    });

    describe('expected value', () => {
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
        });
    });

    describe('calculate', () => {
        it('should calculate rating for player win with equal rating', () => {
            const result = EloRating.calculate(1650, 1650);
            expect(result.playerRating).to.equal(1660);
            expect(result.opponentRating).to.equal(1640);
        });

        it('should calculate rating for player win with higher rating', () => {
            const result = EloRating.calculate(1750, 1535);
            expect(result.playerRating).to.equal(1754);
            expect(result.opponentRating).to.equal(1531);
        });

        it('should calculate rating for player win with lower rating', () => {
            const result = EloRating.calculate(1832, 1756);
            expect(result.playerRating).to.equal(1839);
            expect(result.opponentRating).to.equal(1749);
        });

        it('should calculate rating for player loss with equal rating', () => {
            const result = EloRating.calculate(1650, 1650, false);
            expect(result.playerRating).to.equal(1640);
            expect(result.opponentRating).to.equal(1660);
        });

        it('should calculate rating for player loss with higher rating', () => {
            const result = EloRating.calculate(1750, 1535, false);
            expect(result.playerRating).to.equal(1735);
            expect(result.opponentRating).to.equal(1550);
        });

        it('should calculate rating for player loss with lower rating', () => {
            const result = EloRating.calculate(1832, 1756, false);
            expect(result.playerRating).to.equal(1820);
            expect(result.opponentRating).to.equal(1768);
        });
    });

    describe('k factor', () => {
        it('should be able to define a custom k factor', () => {
            const result = EloRating.calculate(1234, 1212, true, 10);
            expect(result.playerRating).to.equal(1238);
            expect(result.opponentRating).to.equal(1208);
        });

        it('should use a k factor of 20 by default', () => {
            const resultOne = EloRating.calculate(1425, 1435, true);
            const resultTwo = EloRating.calculate(1425, 1435, true, 20);
            expect(resultOne).to.deep.equal(resultTwo);
        });
    })
});