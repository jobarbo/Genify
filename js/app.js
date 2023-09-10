let w;
let h;

var Features = {
	shape: 'circle',
};

let mtn = {
	peak: 0,
	tl: 0,
	tr: 0,
	bl: 0,
	br: 0,
	mp: 0,
	bg: 0,
	nodeNum: 10,
};

let ball_arr = [];

function setup() {
	colorMode(HSB, 360, 100, 100, 100);
	window.addEventListener('resize', onResize);
	onResize();
	createCanvas(window.innerWidth, window.innerHeight);
	background(255);
	Genify.setGenFeatures(Features);

	// create a mountain range
	mtn.peak = height / 2;
	mtn.tl = createVector(-200, random(mtn.peak - 100, 300));
	mtn.tr = createVector(width + 200, random(mtn.peak - 100, 300));
	mtn.bl = createVector(-200, height + 200);
	mtn.br = createVector(width + 200, height + 200);
	// create mid point
	mtn.mp = createVector(width / 2, mtn.peak);

	// create a mountain color
	mtn.bg = color(random(360), 100, 100, 10);

	mtn.nodeNum = width / 10;

	// create vector points for the mountain shape
	noFill();
	strokeWeight(10);
	beginShape();
	vertex(mtn.br.x, mtn.br.y);
	vertex(mtn.bl.x, mtn.bl.y);
	vertex(mtn.tl.x, mtn.tl.y);
	// distribute the points between the top left and top right points aka width
	for (let i = -200; i < width + 200; i += mtn.nodeNum) {
		curveVertex(i, random(mtn.peak - 100, mtn.peak + 100));
	}

	vertex(mtn.tr.x, mtn.tr.y);
	endShape(CLOSE);
}

function draw() {}

function onResize() {
	w = window.innerWidth;
	h = window.innerHeight;
	Genify.reset();
	draw();
}

///////////////////////////////////////////////////////
// -------------------- UTILS ------------------------
//////////////////////////////////////////////////////
