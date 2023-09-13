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
let hue = 0;
let startTime;
let maxFrames = 7;
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
		movers[i].show();
		movers[i].move();
	}
	let elapsedTime = frameCount - startTime;
	if (elapsedTime > maxFrames) {
		console.log('elapsedTime', elapsedTime);
		noLoop();
	}
}

///////////////////////////////////////////////////////
// -------------------- UTILS ------------------------
//////////////////////////////////////////////////////

function INIT() {
	console.log('INIT');
	let hue = random(360);
	bgCol = color(random(0, 360), random([0, 2, 5]), 93, 100);
	background(bgCol);

	drawTexture(hue);
	movers = [];
	scl1 = 0.001;
	scl2 = 0.001;
	ang1 = 1090;
	ang2 = 1000;

	let xRandDivider = random([0.1]);
	let yRandDivider = xRandDivider;

	xMin = 0.1;
	xMax = 0.9;
	yMin = 0.85;
	yMax = 0.95;
	/* 	xMin = -0.05;
	xMax = 1.05;
	yMin = -0.05;
	yMax = 1.05; */

	for (let i = 0; i < 200000; i++) {
		let x = random(xMin, xMax) * width;
		let y = random(yMin, yMax) * height;

		let initHue = hue + random(-1, 1);
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
}

function drawTexture(hue) {
	// draw 200000 small rects to create a texture
	console.log('drawTexture');
	for (let i = 0; i < 100000; i++) {
		let x = random(width);
		let y = random(height);
		let sw = 0.45;
		let h = hue + random(-1, 1);
		let s = random([0, 20, 40, 60, 80, 100]);
		let b = random([0, 10, 10, 20, 20, 40, 60, 70, 90]);
		fill(h, s, b, 100);
		noStroke();
		rect(x, y, sw);
	}
}
