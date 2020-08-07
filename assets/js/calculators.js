Vue.config.devtools = true;

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
