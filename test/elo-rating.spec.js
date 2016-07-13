const chai = require('chai');
var expect = chai.expect;
var EloRating = require('./../src/elo-rating');

describe('EloRating', () => {
    describe('k factor', () => {
        it('should have a default k factor of 20', () => {
            expect(EloRating.k).to.equal(20);
        });
    });

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
            var result = EloRating.calculate(1650, 1650);
            expect(result.playerRating).to.equal(1660);
            expect(result.opponentRating).to.equal(1640);
        });

        it('should calculate rating for player win with higher rating', () => {
            var result = EloRating.calculate(1750, 1535);
            expect(result.playerRating).to.equal(1754);
            expect(result.opponentRating).to.equal(1531);
        });

        it('should calculate rating for player win with lower rating', () => {
            var result = EloRating.calculate(1832, 1756);
            expect(result.playerRating).to.equal(1839);
            expect(result.opponentRating).to.equal(1749);
        });

        it('should calculate rating for player loss with equal rating', () => {
            var result = EloRating.calculate(1650, 1650, false);
            expect(result.playerRating).to.equal(1640);
            expect(result.opponentRating).to.equal(1660);
        });

        it('should calculate rating for player loss with higher rating', () => {
            var result = EloRating.calculate(1750, 1535, false);
            expect(result.playerRating).to.equal(1735);
            expect(result.opponentRating).to.equal(1550);
        });

        it('should calculate rating for player loss with lower rating', () => {
            var result = EloRating.calculate(1832, 1756, false);
            expect(result.playerRating).to.equal(1820);
            expect(result.opponentRating).to.equal(1768);
        });
    });
});