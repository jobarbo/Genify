let composition_params;

composition_params = generate_composition_params();

var {complexity, theme, composition, colormode, strokestyle, clampvalue, bordertype} = composition_params;
console.log(composition);
var Features = {
	complexity: complexity,
	theme: theme,
	composition: composition,
	colormode: colormode,
	strokestyle: strokestyle,
	clampvalue: clampvalue,
	bordertype: bordertype,
};

Genify.setGenFeatures(Features);
features = window.$genFeatures;
console.log(features);

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
		movers[i].show();
		movers[i].move();
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
	let hue = random(360);
	let bgCol = color(random(0, 360), random([0, 2, 5]), 95, 100);

	background(bgCol);

	drawTexture(hue);
	movers = [];
	scl1 = random(0.0001, 0.005);
	scl2 = random(0.0001, 0.005);
	ang1 = int(random(1000));
	ang2 = int(random(1000));

	let xRandDivider = 0.1;
	let yRandDivider = xRandDivider;

	xMin =
		features.composition === 'semiconstrained'
			? 0.1
			: features.composition === 'constrained'
			? 0.15
			: features.composition === 'compressed'
			? 0.2
			: -0.05;
	xMax =
		features.composition === 'semiconstrained'
			? 0.9
			: features.composition === 'constrained'
			? 0.85
			: features.composition === 'compressed'
			? 0.8
			: 1.05;
	yMin =
		features.composition === 'semiconstrained'
			? 0.05
			: features.composition === 'constrained'
			? 0.1
			: features.composition === 'compressed'
			? 0.15
			: -0.05;
	yMax =
		features.composition === 'semiconstrained'
			? 0.95
			: features.composition === 'constrained'
			? 0.9
			: features.composition === 'compressed'
			? 0.85
			: 1.05;

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
	for (let i = 0; i < 200000; i++) {
		let x = random(width);
		let y = random(height);
		let sw = 0.45;
		let h = hue + random(-1, 1);
		let s = random([0, 20, 40, 60, 80, 100]);
		let b = random([0, 10, 10, 20, 20, 40, 60, 70, 90, 90, 100]);
		fill(h, s, b, 100);
		noStroke();
		rect(x, y, sw);
	}
}
