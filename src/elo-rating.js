// https://en.wikipedia.org/wiki/Elo_rating_system
const EloRating = {
    /**
     * Calculates the difference between two ratings.
     * The difference is capped at +400 and -400.
     * @param {number} playerRating Rating of player one.
     * @param {number} opponentRating Rating of player two.
     * @return Difference between playerRating and opponentRating.
     */
    ratingDifference(playerRating, opponentRating) {
        return Math.max(Math.min(playerRating - opponentRating, 400), -400);
    },

    /**
     * Calculates the expected outcome of a game between two players of the
     * ratings playerRating and opponentRating.
     *
     * Formular: E = 1 / 1 + 10^((OR - PR)/400)
     * E: Expected value
     * PR: Player Rating
     * OR: Opponent Rating
     *
     * @param {number} playerRating Rating of player one.
     * @param {number} opponentRating Rating of player two.
     * @return The expected outcome for player one.
     */
    expected(playerRating, opponentRating) {
        return 1 / (1 + Math.pow(10, this.ratingDifference(opponentRating, playerRating) / 400));
    },

    /**
     * Calculates the new ratings based on the given ratings and a flag
     * indicating if player one has won.
     * @param {number} playerRating Rating of player one.
     * @param {number} opponentRating Rating of player two.
     * @param {bool} playerWin Flag indicating if player one has won.
     * @param {number} k K Factor. By default 20.
     * @return New rating of the player and his opponent.
     */
    calculate(playerRating, opponentRating, playerWin = true, k = 20) {
        const playerExpected = this.expected(playerRating, opponentRating);
        const ratingChange = parseInt(k * (!!playerWin - playerExpected), 10);

        return {
            playerRating: playerRating + ratingChange,
            opponentRating: opponentRating + ratingChange * -1
        };
    }
};

module.exports = EloRating;