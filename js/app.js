var Features = {
	shape: 'circle',
};

//Genify.setGenFeatures(Features);
//features = window.$genFeatures;

let movers = [];
let scl1;
let scl2;
let ang1;
let ang2;
let rseed;
let nseed;
let xMin;
let xMax;
let yMin;
let yMax;
let startTime;
let maxFrames = 60;
let C_WIDTH;
let MULTIPLIER;

function setup() {
	console.time('setup');
	var ua = window.navigator.userAgent;
	var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
	var webkit = !!ua.match(/WebKit/i);
	var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

	// if safari mobile use pixelDensity(2.0) to make the canvas bigger else use pixelDensity(3.0)
	if (iOSSafari) {
		pixelDensity(1.0);
	} else {
		pixelDensity(3.0);
	}
	C_WIDTH = min(windowWidth, windowHeight);
	MULTIPLIER = C_WIDTH / 1600;
	c = createCanvas(C_WIDTH, C_WIDTH * 1.375);

	/*
		window.addEventListener('resize', onResize);
		onResize();
		*/

	rectMode(CENTER);
	randomSeed(seed);
	noiseSeed(seed);
	colorMode(HSB, 360, 100, 100, 100);
	startTime = frameCount;
	INIT();
}

function draw() {
	// put drawing code here
	for (let i = 0; i < movers.length; i++) {
		for (let j = 0; j < 1; j++) {
			movers[i].show();
			movers[i].move();
		}
	}
	let elapsedTime = frameCount - startTime;
	if (elapsedTime > maxFrames) {
		noLoop();
	}
}

///////////////////////////////////////////////////////
// -------------------- UTILS ------------------------
//////////////////////////////////////////////////////

function INIT() {
	movers = [];
	scl1 = random(0.0001, 0.005);
	scl2 = random(0.0001, 0.005);
	ang1 = int(random(1000));
	ang2 = int(random(1000));

	let xRandDivider = random([0.08, 0.09, 0.1, 0.11, 0.12]);
	let yRandDivider = xRandDivider;

	xMin = 0.15;
	xMax = 0.85;
	yMin = 0.15;
	yMax = 0.85;
	xMin = -0.05;
	xMax = 1.05;
	yMin = -0.05;
	yMax = 1.05;
	let hue = random(360);
	for (let i = 0; i < 200000; i++) {
		/* 		// distribue the movers within a circle using polar coordinates
		let r = randomGaussian(4, 2);
		let theta = random(0, TWO_PI);
		let x = width / 2 + r * cos(theta) * 100;
		let y = height / 2 + r * sin(theta) * 100; */

		let x = random(xMin, xMax) * width;
		let y = random(yMin, yMax) * height;

		let initHue = hue + random(-10, 10);
		initHue = initHue > 360 ? initHue - 360 : initHue < 0 ? initHue + 360 : initHue;
		movers.push(
			new Mover(
				x,
				y,
				initHue,
				scl1 / MULTIPLIER,
				scl2 / MULTIPLIER,
				ang1 * MULTIPLIER,
				ang2 * MULTIPLIER,
				xMin,
				xMax,
				yMin,
				yMax,
				xRandDivider,
				yRandDivider
			)
		);
	}
	bgCol = color(random(0, 360), random([0, 2, 5]), 93, 100);

	background(bgCol);
}
