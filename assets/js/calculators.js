Vue.config.devtools = false;

function asMilliseconds(value) {
	const duration = moment.duration(value);

	if (!duration.isValid()) {
		return 0;
	}

	return duration.as("milliseconds");
}

function formatAsSeconds(milliseconds) {
	const d = moment.duration(milliseconds, "milliseconds");
	return d.asSeconds() + " seconds";
}

function formatAsClock(milliseconds) {
	const d = moment.duration(milliseconds, "milliseconds");
	return d.format("hh[h]mm[m]ss[s]");
}

function formatAsISO(milliseconds) {
	const d = moment.duration(milliseconds, "milliseconds");
	return d.toISOString();
}

// Time Calculator Vue instance
new Vue({
	el: "#time-calculator",

	// Change delimiters to avoid conflicts
	delimiters: ['[[', ']]'],

	// app initial state
	data: {
		uid: 1,
		times: [
			{id: 0, value: "PT5M30S", milliseconds: 330000},
			{id: 1, value: "00:03:30", milliseconds: 210000}
		],
		newTime: "",
		editedTime: null,

		renderTypes: [formatAsSeconds, formatAsClock, formatAsISO],
		totalTimeRenderer: 0,
		averageTimeRenderer: 0,
	},

	// computed properties
	// http://vuejs.org/guide/computed.html
	computed: {
		totalTime: function () {
			return this.times.reduce((acc, time) => acc + time.milliseconds, 0);
		},

		averageTime: function () {
			if (this.times.length === 0) {
				return 0;
			}
			return this.totalTime / this.times.length;
		},

		totalTimeFormatted: function () {
			return this.renderTypes[this.totalTimeRenderer](this.totalTime);
		},

		averageTimeFormatted: function () {
			return this.renderTypes[this.averageTimeRenderer](this.averageTime);
		}
	},

	filters: {},

	// methods that implement data logic.
	// note there's no DOM manipulation here at all.
	methods: {
		clearTimes: function () {
			this.times = [];
		},

		addTime: function () {
			const value = this.newTime && this.newTime.trim();
			if (!value) {
				return;
			}

			const milliseconds = asMilliseconds(value);
			if (milliseconds === 0) {
				return;
			}

			this.times.push({id: this.uid++, value: value, milliseconds: milliseconds});
			this.newTime = "";
		},

		editTime: function (time) {
			this.beforeEditCache = time.value;
			this.editedTime = time;
		},

		removeTime: function (time) {
			this.times.splice(this.times.indexOf(time), 1);
		},

		doneEdit: function (time) {
			if (!this.editedTime) {
				return;
			}
			const trimmedTime = time.value.trim();
			if (!trimmedTime) {
				this.removeTime(time);
				return;
			}

			const milliseconds = asMilliseconds(trimmedTime);
			if (milliseconds === 0) {
				return;
			}

			time.value = trimmedTime;
			time.milliseconds = milliseconds;
			this.editedTime = null;
		},

		cancelEdit: function (time) {
			this.editedTime = null;
			time.value = this.beforeEditCache;
		},

		changeTotalTimeRender: function () {
			this.totalTimeRenderer = ++this.totalTimeRenderer % this.renderTypes.length;
		},

		changeAverageTimeRender: function () {
			this.averageTimeRenderer = ++this.averageTimeRenderer % this.renderTypes.length;
		}
	},

	// a custom directive to wait for the DOM to be updated
	// before focusing on the input field.
	// http://vuejs.org/guide/custom-directive.html
	directives: {
		"time-focus": function (el, binding) {
			if (binding.value) {
				el.focus();
			}
		}
	}
});

const factorTable = {
	km: {m: 1000, km: 1, mi: 0.6213712, yard: 1093.613, feet: 3280.84, inch: 39370.08},
	m: {m: 1, km: 0.001, mi: 0.0006213712, yard: 1.093613, feet: 3.28084, inch: 39.37008},
	mi: {m: 1609.344, km: 1.609344, mi: 1, yard: 1760, feet: 5280, inch: 63360},
	yard: {m: 0.9144, km: 0.0009144, mi: 0.0005681818, yard: 1, feet: 3, inch: 36},
	feet: {m: 0.3048, km: 0.0003048, mi: 0.0001893939, yard: 0.333333264, feet: 1, inch: 12},
	inch: {m: 0.0254, km: 0.0000254, mi: 0.00001578283, yard: 0.0277777808, feet: 0.0833333424, inch: 1},
};

// Distance Conversion Vue instance
new Vue({
	el: "#distance-converter",

	// Change delimiters to avoid conflicts
	delimiters: ['[[', ']]'],

	// app initial state
	data: {
		availableUnits: {km: "kilometre", m: "metre", mi: "mile", yard: "yard", feet: "feet", inch: "inch"},
		distance: null,
		unit: "km",
		error: "",
	},

	// computed properties
	// http://vuejs.org/guide/computed.html
	computed: {},

	watch: {
		distance: function () {
			if (this.distance === "") {
				this.error = "Please use numbers only.";
				return;
			}

			this.error = "";
		}
	},

	filters: {
		capitalize: function (value) {
			if (!value) {
				return "";
			}

			value = value.toString();

			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	},

	// methods that implement data logic.
	// note there's no DOM manipulation here at all.
	methods: {
		convertTo: function (targetUnit) {
			const targetValue = this.distance * factorTable[this.unit][targetUnit];

			if (Number.isInteger(targetValue)) {
				return targetValue;
			}

			return targetValue.toFixed(3);
		}
	},

	// a custom directive to wait for the DOM to be updated
	// before focusing on the input field.
	// http://vuejs.org/guide/custom-directive.html
	directives: {}
});