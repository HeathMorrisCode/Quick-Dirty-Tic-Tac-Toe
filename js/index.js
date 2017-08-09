"use strict";

var app = new Vue({
	el: "#app",
	data: {
		test: "lulz",
		squares: {
			1: "",
			2: "",
			3: "",
			4: "",
			5: "",
			6: "",
			7: "",
			8: "",
			9: ""
		},
		wipe: {
			1: false,
			2: false,
			3: false,
			4: false,
			5: false,
			6: false,
			7: false,
			8: false,
			9: false
		},
		winConditions: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],

		// startDisabled:false,
		// pattern: [],
		// gameLength:10,
		// userConsole: "Hit start, get to round 10 to win!",
		// counter: 0,
		playerTurn: true
	},
	methods: {
		squareTrigger: function squareTrigger(square) {
			if (this.playerTurn) {
				if (this.squares[square] === "") {
					console.log("Player clicked a square that was open. Square: " + square);
					this.squares[square] = "X";
					this.playerTurn = false;
					if (!this.didHumanWin()) {
						this.computerTurn();
					} else {
						this.restartGame("Human");
					}
				} else {
					console.log("Player clicked a Square that wasn't open. Square: " + square);
				}
			} else {
				console.log("Player clicked a Square when it wasn't their turn. Square: " + square);
			}
		},
		computerTurn: function computerTurn() {
			// Bad AI starts here
			var opensquares = [];
			for (var square in this.squares) {
				if (this.squares[square] === "") {
					opensquares.push(square);
				}
			}
			if (opensquares.length) {
				var random = Math.ceil(Math.random() * opensquares.length) - 1;
				console.log("Computer picked Square #" + opensquares[random]);
				console.log("Random num is: " + random);
				console.log("Open Squares are:" + opensquares);
				this.squares[opensquares[random]] = "O";

				if (this.didComputerWin()) {
					this.restartGame("Computer");
				} else {
					this.playerTurn = true;
				}
			} else {
				console.log("That's a draw, Huss");
				this.restartGame();
			}
		},
		didHumanWin: function didHumanWin() {
			// console.log("Start testing for Human Win \n \n \n");

			var humanSquares = [];
			for (var square in this.squares) {
				if (this.squares[square] === "X") {
					humanSquares.push(square);
				}
			}
			// console.log("Human Squares are: " + humanSquares);

			for (var w = 0; w < this.winConditions.length; w++) {
				// console.log("Current WinCond testing for is: "+ this.winConditions[w]);

				var counter = 0;
				for (var h = 0; h < humanSquares.length; h++) {
					// console.log("Current Human Square being tested is: "+ humanSquares[h]);
					// console.log (this.winConditions[w].indexOf(parseInt(humanSquares[h])));

					if (this.winConditions[w].indexOf(parseInt(humanSquares[h])) != -1) {
						counter++;
					}
				}

				// console.log("Human has " + counter + " out of 3 for this Win Condition");

				if (counter == 3) {
					console.log("Human Wins!");
					return true;
				}
			}

			// console.log("End testing for Human Win \n \n \n");
			return false;
		},
		didComputerWin: function didComputerWin() {

			var compSquares = [];
			for (var square in this.squares) {
				if (this.squares[square] === "O") {
					compSquares.push(square);
				}
			}
			// console.log("Human Squares are: " + humanSquares);

			for (var w = 0; w < this.winConditions.length; w++) {
				// console.log("Current WinCond testing for is: "+ this.winConditions[w]);

				var counter = 0;
				for (var c = 0; c < compSquares.length; c++) {
					// console.log("Current Human Square being tested is: "+ humanSquares[h]);
					// console.log (this.winConditions[w].indexOf(parseInt(humanSquares[h])));

					if (this.winConditions[w].indexOf(parseInt(compSquares[c])) != -1) {
						counter++;
					}
				}

				// console.log("Human has " + counter + " out of 3 for this Win Condition");

				if (counter == 3) {
					console.log("Computer Wins!");
					return true;
				}
			}

			// console.log("End testing for Human Win \n \n \n");
			return false;
		},
		restartGame: function restartGame(winner) {
			var _this = this;

			setTimeout(function () {
				console.log("Wiping Game Board...");

				var i = 1;
				var boardWipe = setInterval(function () {

					if (winner == "Human") {
						_this.squares[i] = "X";
					} else if (winner == "Computer") {
						_this.squares[i] = "O";
					} else {
						console.log("Draw Wipe");
						_this.wipeSquare(i);
					}

					i++;
					if (i == 10) {
						clearInterval(boardWipe);

						setTimeout(function () {
							_this.squares[1] = "";
							_this.squares[2] = "";
							_this.squares[3] = "";
							_this.squares[4] = "";
							_this.squares[5] = "";
							_this.squares[6] = "";
							_this.squares[7] = "";
							_this.squares[8] = "";
							_this.squares[9] = "";
							_this.playerTurn = true;
						}, 1001);
					}
				}, 50);
			}, 1500);
		},
		wipeSquare: function wipeSquare(square) {
			var _this2 = this;

			this.wipe[square] = true;
			setTimeout(function () {
				_this2.squares[square] = "";
				_this2.wipe[square] = false;
			}, 100);
		}
	}
});