class Mover {
	constructor(x, y, hue, scl1, scl2, ang1, ang2, xMin, xMax, yMin, yMax, xRandDivider, yRandDivider) {
		this.x = x;
		this.y = y;
		this.initHue = hue;
		this.initSat = random([0, 10, 40, 40, 50, 50, 60, 80, 80, 90, 100]);
		this.initBri =
			features.theme === 'bright' && features.colormode !== 'monochrome'
				? random([0, 10, 20, 20, 40, 40, 60, 70, 80, 90, 100])
				: features.theme === 'bright' && features.colormode === 'monochrome'
				? random([0, 0, 10, 20, 20, 30, 40])
				: random([40, 60, 70, 70, 80, 80, 80, 90, 100]);
		this.initAlpha = 100;
		this.initS = 0.7 * MULTIPLIER;
		this.hue = this.initHue;
		this.sat = features.colormode === 'monochrome' ? 0 : this.initSat;
		this.bri = this.initBri;
		this.a = this.initAlpha;
		this.hueStep =
			features.colormode === 'monochrome' || features.colormode === 'fixed'
				? 1
				: features.colormode === 'dynamic'
				? 6
				: 25;
		this.satStep = features.colormode === 'monochrome' ? 0 : 4;
		this.briStep = 1;
		this.s = this.initS;
		this.scl1 = scl1;
		this.scl2 = scl2;
		this.ang1 = ang1;
		this.ang2 = ang2;
		this.xRandDivider = 0.1;
		this.yRandDivider = 0.1;
		this.xRandSkipper = 0;
		this.yRandSkipper = 0;
		this.xRandSkipperVal = features.strokestyle === 'thin' ? 0.1 : features.strokestyle === 'bold' ? 0.5 : 0.25;
		this.yRandSkipperVal = features.strokestyle === 'thin' ? 0.1 : features.strokestyle === 'bold' ? 0.5 : 0.25;
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;
		this.oct = Number(features.complexity);
		this.clampvaluearray = features.clampvalue.split(',').map(Number);
		this.uvalue = 4;
		this.isBordered = features.bordertype === 'limited' || features.bordertype === 'JDL mode' ? true : false;
	}

	show() {
		fill(this.hue, this.sat, this.bri, this.a);
		noStroke();
		rect(this.x, this.y, this.s, this.s);
	}

	move() {
		let p = superCurve(this.x, this.y, this.scl1, this.scl2, this.ang1, this.ang2, this.oct);

		this.xRandSkipper = random(-this.xRandSkipperVal * MULTIPLIER, this.xRandSkipperVal * MULTIPLIER);
		this.yRandSkipper = random(-this.xRandSkipperVal * MULTIPLIER, this.xRandSkipperVal * MULTIPLIER);

		this.x += (p.x * MULTIPLIER) / this.xRandDivider + this.xRandSkipper;
		this.y += (p.y * MULTIPLIER) / this.yRandDivider + this.yRandSkipper;

		let pxy = p.x - p.y;
		this.hue += mapValue(pxy, -this.uvalue * 2, this.uvalue * 2, -this.hueStep, this.hueStep, true);
		this.hue = this.hue > 360 ? 0 : this.hue < 0 ? 360 : this.hue;
		this.sat += mapValue(p.x, -this.uvalue * 2, this.uvalue * 2, -this.satStep, this.satStep, true);
		this.sat = this.sat > 100 ? 0 : this.sat < 0 ? 100 : this.sat;
		this.bri += mapValue(p.y, -this.uvalue * 2, this.uvalue * 2, -this.briStep, this.briStep, true);
		this.bri = this.bri > 100 ? 0 : this.bri < 0 ? 100 : this.bri;

		/* 		if (this.isBordered) {
			this.x =
				this.x <= this.xMin * width
					? this.xMax * width + random(0 * MULTIPLIER, 0)
					: this.x > this.xMax * width
					? this.xMin * width + random(0, 0 * MULTIPLIER)
					: this.x;
			this.y =
				this.y < this.yMin * height
					? this.yMax * height + random(0 * MULTIPLIER, 0)
					: this.y > this.yMax * height
					? this.yMin * height + random(0, 0 * MULTIPLIER)
					: this.y;
		} */
		if (this.isBordered) {
			if (this.x < (this.xMin - 0.015) * width) {
				this.x = (this.xMax + 0.015) * width;
				if (features.bordertype != 'JDL mode') {
					this.a = 0;
				}
			}
			if (this.x > (this.xMax + 0.015) * width) {
				this.x = (this.xMin - 0.015) * width;
				if (features.bordertype != 'JDL mode') {
					this.a = 0;
				}
			}
			if (this.y < (this.yMin - 0.015) * height) {
				this.y = (this.yMax + 0.015) * height;
				if (features.bordertype != 'JDL mode') {
					this.a = 0;
				}
			}
			if (this.y > (this.yMax + 0.015) * height) {
				this.y = (this.yMin - 0.015) * height;
				if (features.bordertype != 'JDL mode') {
					this.a = 0;
				}
			}
		}
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

	let u = map(un, -0.015, 0.015, -5, 5, true);
	let v = map(vn, -0.0015, 0.0015, -15, 15, true);

	let p = createVector(u, v);
	return p;
}
