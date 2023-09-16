let composition_params;

composition_params = generate_composition_params();

var {complexity, theme, composition, colormode, strokestyle, clampvalue, rangetype, jdlmode, speedvalue} =
	composition_params;
console.log(composition);
var Features = {
	complexity: complexity,
	theme: theme,
	composition: composition,
	colormode: colormode,
	strokestyle: strokestyle,
	clampvalue: clampvalue,
	rangetype: rangetype,
	jdlmode: jdlmode,
	speedvalue: speedvalue,
};

Genify.setGenFeatures(Features);
features = window.$genFeatures;
console.table(features);

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
let maxFrames = 30;
let C_WIDTH;
let MULTIPLIER;
let cycle = 0;
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
		pixelDensity(1.0);
	}
	C_WIDTH = min(windowWidth, windowHeight);
	MULTIPLIER = C_WIDTH / 2000;
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
		let firstCycle = cycle === 0 ? true : false;
		movers[i].show(firstCycle);
		movers[i].move(firstCycle);
	}
	let elapsedTime = frameCount - startTime;
	if (elapsedTime > maxFrames) {
		window.rendered = c.canvas;
		document.complete = true;
		noLoop();
	}
	cycle++;
}

///////////////////////////////////////////////////////
// -------------------- UTILS ------------------------
//////////////////////////////////////////////////////

function INIT() {
	let hue = random(360);
	bgCol = color(random(0, 360), random([0, 2, 5]), features.theme == 'bright' ? 95 : 10, 100);

	background(bgCol);

	drawTexture(hue);
	movers = [];
	let scaleValues = [0.008, 0.005, 0.003, 0.002, 0.001, 0.0008];
	let angValues = [
		random([1, 5, 20, 50]),
		random([5, 20, 50, 100, 150]),
		random([200, 300, 400]),
		random([400, 500, 600]),
		random([400, 500, 600, 1500, 2000, 2500]),
		random([600, 1000, 1500, 2000, 2500, 3000, 3500]),
	];
	scl1 = random(scaleValues);
	scl2 = scl1;

	// map the scale values array to the ang values array
	let selector = scaleValues.indexOf(scl1);
	ang1 = angValues[selector];
	ang2 = ang1;

	let xRandDivider = random([0.08, 0.09, 0.1, 0.11, 0.12]);
	let yRandDivider = xRandDivider;

	xMin =
		features.composition === 'micro'
			? 0.35
			: features.composition === 'semiconstrained'
			? 0.15
			: features.composition === 'constrained'
			? 0.2
			: features.composition === 'compressed'
			? 0.25
			: -0.05;
	xMax =
		features.composition === 'micro'
			? 0.65
			: features.composition === 'semiconstrained'
			? 0.85
			: features.composition === 'constrained'
			? 0.8
			: features.composition === 'compressed'
			? 0.75
			: 1.05;
	yMin =
		features.composition === 'micro'
			? 0.35
			: features.composition === 'semiconstrained'
			? 0.1
			: features.composition === 'constrained'
			? 0.15
			: features.composition === 'compressed'
			? 0.2
			: -0.05;
	yMax =
		features.composition === 'micro'
			? 0.65
			: features.composition === 'semiconstrained'
			? 0.9
			: features.composition === 'constrained'
			? 0.85
			: features.composition === 'compressed'
			? 0.8
			: 1.05;

	for (let i = 0; i < 200000; i++) {
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
}

function drawTexture(hue) {
	// draw 200000 small rects to create a texture
	for (let i = 0; i < 200000; i++) {
		let x = random(width);
		let y = random(height);
		let sw = 0.65 * MULTIPLIER;
		let h = hue + random(-10, 10);
		let s = features.colormode === 'monochrome' ? 0 : random([0, 10, 40, 40, 50, 50, 60, 80, 80, 90, 100]);
		let b =
			features.theme === 'bright' && features.colormode !== 'monochrome'
				? random([0, 10, 20, 20, 40, 40, 60, 70, 80, 90, 100])
				: features.theme === 'bright' && features.colormode === 'monochrome'
				? random([0, 0, 10, 20, 20, 30, 40])
				: random([40, 60, 70, 70, 80, 80, 80, 90, 100]);
		fill(h, s, b, 100);
		noStroke();
		rect(x, y, sw);
	}
}
