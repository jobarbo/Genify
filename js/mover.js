class Mover {
	constructor(x, y, hue, scl1, scl2, ang1, ang2, xMin, xMax, yMin, yMax, xRandDivider, yRandDivider) {
		this.x = x;
		this.y = y;
		this.initHue = hue;
		this.initSat = random([0, 20, 40, 60, 80, 100]);
		this.initBri = random([0, 10, 10, 20, 20, 40, 60, 70, 90]);
		this.initAlpha = 100;
		this.initS = 0.65 * MULTIPLIER;
		this.hue = this.initHue;
		this.sat = this.initSat;
		this.bri = this.initBri;
		this.a = this.initAlpha;
		this.hueStep = 16;
		this.s = this.initS;
		this.scl1 = scl1;
		this.scl2 = scl2;
		this.ang1 = ang1;
		this.ang2 = ang2;
		this.xRandDivider = xRandDivider;
		this.yRandDivider = yRandDivider;
		this.xRandSkipper = 0;
		this.yRandSkipper = 0;
		this.xRandSkipperVal = 0.1;
		this.yRandSkipperVal = 0.1;
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;
		this.oct = 1;
		this.centerX = width / 2;
		this.centerY = height / 2;
		this.borderX = width / 3.5;
		this.borderY = height / 2.75;
		this.uvalue = 5;
	}

	show() {
		fill(this.hue, this.sat, this.bri, this.a);
		noStroke();
		rect(this.x, this.y, this.s);
	}

	move() {
		let p = superCurve(this.x, this.y, this.scl1, this.scl2, this.ang1, this.ang2, this.oct);

		/* 		this.xRandDivider = random([0.1, 30, 50, 100]);
		this.yRandDivider = random([0.1, 30, 50, 100]); */
		this.xRandDivider = 0.1;
		this.yRandDivider = 0.1;
		/* this.xRandDivider = random(0.01, 12);
		this.yRandDivider = random(0.01, 12); */
		this.xRandSkipper = random(-this.xRandSkipperVal * MULTIPLIER, this.xRandSkipperVal * MULTIPLIER);
		this.yRandSkipper = random(-this.xRandSkipperVal * MULTIPLIER, this.xRandSkipperVal * MULTIPLIER);

		//shortand for if this.x is less than 0, set this.x to width and vice versa
		this.x += (p.x * MULTIPLIER) / this.xRandDivider + this.xRandSkipper;
		this.y += (p.y * MULTIPLIER) / this.yRandDivider + this.yRandSkipper;

		//let pxy = p.x - p.y;

		//this.a = map(p.x, -4, 4, this.initAlpha - 5, this.initAlpha + 5, true);
		//this.s = map(p.x, -24, 24, this.initS + 10, this.initS - 10, true);
		let pxy = p.x - p.y;
		this.hue += mapValue(pxy, -this.uvalue * 2, this.uvalue * 2, -this.hueStep, this.hueStep, true);
		this.hue = this.hue > 360 ? this.hue - 360 : this.hue < 0 ? this.hue + 360 : this.hue;
		//this.sat = map(p.x, -2, 2, 0, 20, true);
		//this.bri = map(p.x, -2, 2, 0, 40, true);

		this.x =
			this.x <= this.centerX - this.borderX
				? this.centerX + this.borderX + random(-4 * MULTIPLIER, 0)
				: this.x >= this.centerX + this.borderX
				? this.centerX - this.borderX + random(0, 4 * MULTIPLIER)
				: this.x;
		this.y =
			this.y <= this.centerY - this.borderY
				? this.centerY + this.borderY + random(-4 * MULTIPLIER, 0)
				: this.y >= this.centerY + this.borderY
				? this.centerY - this.borderY + random(0, 4 * MULTIPLIER)
				: this.y;
	}
}

function superCurve(x, y, scl1, scl2, ang1, ang2, octave) {
	let nx = x,
		ny = y,
		a1 = ang1,
		a2 = ang2,
		scale1 = scl1,
		scale2 = scl2,
		dx,
		dy;

	dx = oct(nx, ny, scale1, 0, octave);
	dy = oct(nx, ny, scale2, 2, octave);
	nx += dx * a1;
	ny += dy * a2;

	dx = oct(nx, ny, scale1, 1, octave);
	dy = oct(nx, ny, scale2, 3, octave);
	nx += dx * a1;
	ny += dy * a2;

	dx = oct(nx, ny, scale1, 1, octave);
	dy = oct(nx, ny, scale2, 2, octave);
	nx += dx * a1;
	ny += dy * a2;

	let un = oct(nx, ny, scale1, 3, octave);
	let vn = oct(nx, ny, scale2, 2, octave);

	let u = mapValue(un, -0.015, 0.015, -25, 5, true);
	let v = mapValue(vn, -0.0015, 0.0015, -5, 25, true);

	let p = createVector(u, v);
	return p;
}
