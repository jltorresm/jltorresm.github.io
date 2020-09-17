Vue.config.devtools = false;

const DIR_HORIZONTAL = "horizontal";
const DIR_VERTICAL = "vertical";

const COLOR_CURRENT = "red";
const COLOR_MAZE = "white";
const COLOR_WALL = "black";

// Simple Visual Prim's algorithm implementation.
new Vue({
	el: "#prims-visualization",

	// Change delimiters to avoid conflicts
	delimiters: ['[[', ']]'],

	// App's initial state
	data: {
		// Options
		availableDelays: {slow: 500, faster: 100, fastest: 0},
		availableSizes: ["small", "medium", "big", "massive"],
		delay: 100,
		size: "medium",

		// State
		isRunning: false,

		// Internal config
		shouldDebug: false,
		cellSize: {width: 5, height: 5},
		matrixSizes: {
			small: {width: 10, height: 10},
			medium: {width: 20, height: 20},
			big: {width: 30, height: 30},
			massive: {width: 100, height: 100},
		},

		// References to DOM
		canvas: null,
		ctx: null,

		// Prim's data
		pending: [],
		visited: [],
	},

	// computed properties
	computed: {
		canvasSize: function () {
			const containerWidth = document.getElementById("maze-container").clientWidth;
			this.cellSize.width = Math.floor(containerWidth / this.matrixSizes[this.size].width / 2);
			// We want square renderings
			this.cellSize.height = this.cellSize.width;

			return {
				width: this.cellSize.width * (this.matrixSizes[this.size].width * 2 - 1),
				height: this.cellSize.height * (this.matrixSizes[this.size].height * 2 - 1),
			};
		},
	},

	// methods that implement data logic.
	methods: {
		debug: function (...args) {
			if (this.shouldDebug) {
				console.debug(...args);
			}
		},

		start: async function () {
			this.debug("starting the generator...");
			this.isRunning = true;

			this.canvas = document.getElementById("maze");
			this.ctx = this.canvas.getContext("2d");

			await this.reset();
			await this.cleanCanvas();
			await this.randomPrim();

			this.isRunning = false;
			this.debug("finished generating the maze.");
		},

		cleanCanvas: async function () {
			this.debug("cleaning the canvas...");
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		},

		randomPrim: async function () {
			// Mark the first cell as part of the maze
			const {x: firstX, y: firstY} = this.getRandomCell();
			this.debug("Starting at: [", firstX, ",", firstY, "]");
			this.paintCoord(firstX, firstY, COLOR_MAZE);
			await this.visitCell(firstX, firstY);

			// While there are pending walls to be analysed
			while (this.pending.length > 0) {
				// Pick a random wall and remove it from the pending list
				const {x, y} = await this.popRandomWall();
				this.paintCoord(x, y, COLOR_CURRENT);

				// For visualization purposes
				await sleep(this.delay);

				// See if it separates an unvisited cell
				const {shouldOpen, newCell} = this.analyseWall(x, y);

				if (shouldOpen) {
					// Open the wall
					this.paintCoord(x, y, COLOR_MAZE);
					this.paintCoord(newCell.x, newCell.y, COLOR_MAZE);

					// The walls should also be considered visited at this point
					this.visited.push(this.coordToString(x, y));

					// Visit the cells
					await this.visitCell(newCell.x, newCell.y);
				} else {
					this.paintCoord(x, y, COLOR_WALL);
				}
			}
		},

		visitCell: async function (x, y) {
			this.debug("visiting [", x, ",", y, "]");

			// Add it to the visited cells list
			this.visited.push(this.coordToString(x, y));

			// Add the neighboring walls to the pending list
			const adjacent = this.getAdjacentWalls(x, y);
			this.debug("adjacent walls: ", adjacent);

			for (let i = 0; i < adjacent.length; i++) {
				if (this.isValidNeighbor(adjacent[i].x, adjacent[i].y)) {
					this.debug("pushing pending [", adjacent[i].x, ",", adjacent[i].y, "]")
					this.pending.push(this.coordToString(adjacent[i].x, adjacent[i].y));
				}
			}
		},

		coordToString: function (x, y) {
			return x + "," + y;
		},

		isValidNeighbor: function (x, y) {
			const matrixSize = this.matrixSizes[this.size];

			// Lower bound is always 0, upper bound corresponds to the matrix size
			// plus the implicit inner wall matrix.
			const inBounds = x >= 0
				&& y >= 0
				&& x < (matrixSize.width * 2 - 1)
				&& y < (matrixSize.height * 2 - 1);

			const coordinates = this.coordToString(x, y);

			const alreadyVisited = this.visited.indexOf(coordinates) !== -1;
			const alreadyPending = this.pending.indexOf(coordinates) !== -1;

			return inBounds && !alreadyVisited && !alreadyPending;
		},

		popRandomWall: async function () {
			this.debug("getting a random pending wall...");

			const max = this.pending.length;

			const idx = Math.floor(Math.random() * max);
			const [x, y] = this.pending.splice(idx, 1)[0].split(",");

			return {x: parseInt(x), y: parseInt(y)};
		},

		reset: async function () {
			this.debug("resetting internal lists.");
			this.pending = [];
			this.visited = [];
		},

		getAdjacentWalls: function (x, y) {
			return [
				{x: x, y: y - 1}, // north
				{x: x, y: y + 1}, // south
				{x: x + 1, y: y}, // east
				{x: x - 1, y: y}, // west
			];
		},

		analyseWall: function (x, y) {
			this.debug("analysing wall [", x, ",", y, "]");

			// Determine orientation
			const orientation = x % 2 === 1 ? DIR_HORIZONTAL : DIR_VERTICAL;

			// Get the next cell coordinates
			let newCell = {x: x, y: y + 1};
			if (orientation === DIR_HORIZONTAL) {
				newCell = {x: x + 1, y: y};
			}

			// If the new cell is free (not visited yet) we should open the wall
			let shouldOpen = this.visited.indexOf(this.coordToString(newCell.x, newCell.y)) === -1;

			// If already visited check the other side just in case
			if (!shouldOpen) {
				newCell = {x: x, y: y - 1};
				if (orientation === DIR_HORIZONTAL) {
					newCell = {x: x - 1, y: y};
				}
				shouldOpen = this.visited.indexOf(this.coordToString(newCell.x, newCell.y)) === -1;
			}

			return {shouldOpen, newCell};
		},

		paintCoord: function (x, y, color) {
			this.ctx.fillStyle = color;

			const offsetX = this.cellSize.width * x;
			const offsetY = this.cellSize.height * y;

			this.ctx.fillRect(offsetX, offsetY, this.cellSize.width, this.cellSize.height);
		},

		getRandomCell: function () {
			const max = this.matrixSizes[this.size];
			const x = Math.floor(Math.random() * (max.width - 1));
			const y = Math.floor(Math.random() * (max.height - 1));

			return {x: x * 2, y: y * 2};
		},
	},
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
