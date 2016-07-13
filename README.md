# elo-rating.js

elo-rating.js is a simple utility to calculate elo ratings for Node.js. See [https://en.wikipedia.org/wiki/Elo_rating_system](https://en.wikipedia.org/wiki/Elo_rating_system) for more information about elo rating.

# Installion

```
npm install elo-rating
```

# Usage

TODO...
```
var EloRating = require('elo-rating');

var playerWin = false;
var result = EloRating.calculate(1750, 1535, playerWin);

console.log(result.playerRating) // Output: 1735
console.log(result.opponentRating) // Output: 1550

result = EloRating.calculate(1750, 1535);

console.log(result.playerRating) // Output: 1754
console.log(result.opponentRating) // Output: 1531
```

# Similar modules

There are several other modules for Node.js, which provide similar functionality. Check them out as well:

* https://github.com/dmamills/elo-rank
* https://github.com/moroshko/elo.js
* https://github.com/PhobosRising/node-arpad
* https://github.com/jbrooksuk/node-elo