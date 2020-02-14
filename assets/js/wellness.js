/*******************************************************************************
 * START :: Commons
 ******************************************************************************/
//
// Timer "Class"
//
function Timer(initialValue, onRender, onFinish) {
	//
	// Timer properties :: Logic
	//
	this.initialValue = initialValue;
	this.currentValue = initialValue;
	this.interval = null;
	this.running = false;

	//
	// Timer properties :: DOM
	//
	this.renderCallback = onRender;
	this.finishCallback = onFinish;
}

//
// Starts the timer
//
Timer.prototype.start = function () {
	const me = this;
	me.running = true;

	// First adjust any discrepancy with the ui
	me.render();

	me.interval = setInterval(function () {
		me.currentValue--;
		me.render();
		if (me.currentValue === 0) {
			me.finish();
		}
	}, 1000);
};

//
// Stops the timer
//
Timer.prototype.stop = function () {
	this.running = false;
	clearInterval(this.interval);
	this.render();
};

//
// Starts or stops the timer
//
Timer.prototype.startStop = function () {
	const isRunning = this.isRunning();
	if (isRunning) {
		this.stop();
	} else {
		this.start();
	}

	return !isRunning;
};

//
// Returns true if the timer is running
//
Timer.prototype.isRunning = function () {
	return this.running;
};

//
// Resets the timer
//
Timer.prototype.reset = function () {
	this.stop();
	this.currentValue = this.initialValue;
	this.render();
};

//
// Calls the render callback
//
Timer.prototype.render = function () {
	this.renderCallback(this.currentValue, this.running);
};

//
// Calls the finish callback
//
Timer.prototype.finish = function () {
	this.reset();
	this.finishCallback(this.initialValue);
};

//
// Format string as mm:ss clock format
//
String.prototype.toMMSS = function () {
	let total = parseInt(this, 10);
	let minutes = Math.floor(total / 60);
	let seconds = total - (minutes * 60);

	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	return minutes + ':' + seconds;
};

// TODO: Merge pomodoro and timerswitcher classes into a generic periodic timer class.

//
// Pomodoro "Class"
//
function Pomodoro(pomodoro, short, long, onRender, onSwitch) {
	this.pomodoroDuration = pomodoro;
	this.short = short;
	this.long = long;
	this.cycle = 8;
	this.iteration = 0;

	this.timer = new Timer(this.pomodoroDuration, this.manageRender.bind(this), this.switchPeriod.bind(this));

	this.renderCallback = onRender;
	this.switchCallback = onSwitch;
}

Pomodoro.prototype.startStop = function () {
	if (this.timer.isRunning()) {
		this.timer.stop();
	} else {
		this.timer.start();
	}
};

Pomodoro.prototype.reset = function () {
	this.timer.reset();
};

Pomodoro.prototype.manageRender = function (currentValue, isRunning) {
	this.renderCallback(this.getStage(), currentValue, isRunning);
};

Pomodoro.prototype.switchPeriod = function () {
	this.iteration++;

	this.switchCallback(this.getNotification());

	if (this.getStage() === "s")
		this.timer = new Timer(this.short, this.manageRender.bind(this), this.switchPeriod.bind(this));
	else if (this.getStage() === "l")
		this.timer = new Timer(this.long, this.manageRender.bind(this), this.switchPeriod.bind(this));
	else
		this.timer = new Timer(this.pomodoroDuration, this.manageRender.bind(this), this.switchPeriod.bind(this));

	this.startStop();
};

Pomodoro.prototype.getNotification = function () {
	let msg = "Time to start a new pomodoro";

	if (this.getStage() === "s")
		msg = "Time to take a short break";
	else if (this.getStage() === "l")
		msg = "Time to take a long break";

	return msg;
};

Pomodoro.prototype.getStage = function () {
	const map = "pspspspl";
	let i = this.iteration;
	return map[i % this.cycle];
};

//
// Switches between 2 different intervals
//
function TimerSwitcher(main, alt, onRender, onSwitch) {
	this.mainDuration = main;
	this.altDuration = alt;

	this.cycle = 2;
	this.iteration = 0;

	this.timer = new Timer(this.mainDuration, this.manageRender.bind(this), this.switchPeriod.bind(this));

	this.renderCallback = onRender;
	this.switchCallback = onSwitch;
}

TimerSwitcher.prototype.startStop = function () {
	if (this.timer.isRunning()) {
		this.timer.stop();
	} else {
		this.timer.start();
	}
};

TimerSwitcher.prototype.reset = function () {
	this.timer.reset();
};

TimerSwitcher.prototype.manageRender = function (currentValue, isRunning) {
	this.renderCallback(this.getStage(), currentValue, isRunning);
};

TimerSwitcher.prototype.switchPeriod = function () {
	this.iteration++;

	this.switchCallback(this.getNotification());

	if (this.getStage() === "a")
		this.timer = new Timer(this.altDuration, this.manageRender.bind(this), this.switchPeriod.bind(this));
	else
		this.timer = new Timer(this.mainDuration, this.manageRender.bind(this), this.switchPeriod.bind(this));

	this.startStop();
};

TimerSwitcher.prototype.getNotification = function () {
	let msg = "Time to keep working";

	if (this.getStage() === "a")
		msg = "Time to give your eyes a short break";

	return msg;
};

TimerSwitcher.prototype.getStage = function () {
	const map = "ma";
	let i = this.iteration;
	return map[i % this.cycle];
};

//
// Rings a bell
//
function ringBell(msg) {
	const audio = new Audio('/assets/audio/bell.mp3');
	audio.play();
	notify(msg);
}

//
// Sends a Desktop notification
//
function notify(msg) {
	// Check if the browser support desktop notifications
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}

	// Check if we have permission to notify
	else if (Notification.permission === "granted") {
		new Notification(msg);
	}

	// Otherwise, we need to ask for permission first
	else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(function (permission) {
			notify(msg);
		});
	}

	// At last, if the user has denied notifications, and you
	// want to be respectful there is no need to bother them any more.
}

/*******************************************************************************
 * END :: Commons
 ******************************************************************************/


/*******************************************************************************
 * START :: Pomodoro setup
 ******************************************************************************/
const $etaPom = document.querySelector(".timer.pomodoro #pomodoro");
const $etaShort = document.querySelector(".timer.pomodoro #short");
const $etaLong = document.querySelector(".timer.pomodoro #long");

const $startPom = document.querySelector(".timer.pomodoro button.start");
const $resetPom = document.querySelector(".timer.pomodoro button.reset");

let pomodoro = new Pomodoro(25 * 60, 5 * 60, 15 * 60, renderPomodoro, ringBell);

$startPom.onclick = function () {
	pomodoro.startStop();
};

$resetPom.onclick = function () {
	pomodoro.reset();
};

function renderPomodoro(stage, currentValue, isRunning) {
	let $ele = $etaPom;
	if (stage === "s")
		$ele = $etaShort;
	else if (stage === "l")
		$ele = $etaLong;

	$ele.innerHTML = currentValue.toString().toMMSS();

	if (isRunning) {
		$ele.classList.add("active");
		$startPom.classList.add("active");
		$startPom.querySelector("span").innerHTML = "stop";

	} else {
		$ele.classList.remove("active");
		$startPom.classList.remove("active");
		$startPom.querySelector("span").innerHTML = "start";
	}
}

/*******************************************************************************
 * END :: Pomodoro setup
 ******************************************************************************/


/*******************************************************************************
 * START :: Strain setup
 ******************************************************************************/
const $startStrain = document.querySelector(".timer.strain button.start");
const $resetStrain = document.querySelector(".timer.strain button.reset");
const $eyeStrain = document.querySelector(".timer.strain .timer-row.eye-strain");

const $eyeETA = $eyeStrain.querySelector(".timer-body");
const $eyeLabel = $eyeStrain.querySelector("label");

let strainTimer = new TimerSwitcher(20 * 60, 20, renderTimer, ringBell);

$startStrain.onclick = function () {
	strainTimer.startStop();
};

$resetStrain.onclick = function () {
	strainTimer.reset();
};

function renderTimer(stage, currentValue, isRunning) {
	if (stage === "m") {
		$eyeLabel.innerHTML = "Eye Strain";
		$eyeStrain.classList.remove("rest");
	} else if (stage === "a") {
		$eyeLabel.innerHTML = "Rest";
		$eyeStrain.classList.add("rest");
	}

	$eyeETA.innerHTML = currentValue.toString().toMMSS();

	if (isRunning) {
		$startStrain.classList.add("active");
		$startStrain.querySelector("span").innerHTML = "stop";

	} else {
		$startStrain.classList.remove("active");
		$startStrain.querySelector("span").innerHTML = "start";
	}
}

/*******************************************************************************
 * END :: String setup
 ******************************************************************************/