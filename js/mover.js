class Mover {
	constructor(x, y, hue, scl1, scl2, ang1, ang2, xMin, xMax, yMin, yMax, xRandDivider, yRandDivider) {
		this.x = x;
		this.y = y;
		this.prevx = x;
		this.prevy = y;
		this.initHue = hue;
		this.initSat = random([0, 20, 40, 60, 80, 100]);
		this.initBri =
			features.theme === 'bright' && features.colormode !== 'monochrome'
				? random([20, 20, 40, 40, 60, 70, 80])
				: features.theme === 'bright' && features.colormode === 'monochrome'
				? random([0, 10, 20, 20, 30, 40, 60])
				: random([70, 70, 80, 80, 80, 90, 100]);
		this.initAlpha = 100;
		this.initS = 0.8 * MULTIPLIER;
		this.hue = this.initHue;
		this.sat = features.colormode === 'monochrome' ? 0 : this.initSat + random(-10, 10);
		this.bri = this.initBri + random(-10, 10);
		this.a = this.initAlpha;
		this.hueStep =
			features.colormode === 'monochrome' || features.colormode === 'fixed'
				? 1
				: features.colormode === 'dynamic'
				? 6
				: 25;
		this.satStep = 1;
		this.briStep = 1;
		this.s = this.initS;
		this.scl1 = scl1;
		this.scl2 = scl2;
		this.ang1 = ang1;
		this.ang2 = ang2;
		this.xRandDivider = xRandDivider;
		this.yRandDivider = yRandDivider;
		this.xRandSkipper = 0;
		this.yRandSkipper = 0;
		this.xRandSkipperVal = features.strokestyle === 'thin' ? 0.1 : features.strokestyle === 'bold' ? 1 : 0.5;
		this.yRandSkipperVal = features.strokestyle === 'thin' ? 0.1 : features.strokestyle === 'bold' ? 1 : 0.5;
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;
		this.oct = Number(features.complexity);
		this.clampvaluearray = features.clampvalue.split(',').map(Number);
		this.uvalue = 10;
		this.isRestrained = features.rangetype === 'limited' ? true : false;
	}

	show() {
		noStroke();
		fill(this.hue, this.sat, this.bri, this.a);
		circle(this.x, this.y, this.initS);
	}

	move() {
		let p = superCurve(
			this.x,
			this.y,
			this.scl1,
			this.scl2,
			this.ang1,
			this.ang2,
			this.oct,
			this.clampvaluearray,
			this.uvalue
		);

		this.xRandSkipper = random(-this.xRandSkipperVal * MULTIPLIER, this.xRandSkipperVal * MULTIPLIER);
		this.yRandSkipper = random(-this.xRandSkipperVal * MULTIPLIER, this.xRandSkipperVal * MULTIPLIER);

		this.x += (p.x * MULTIPLIER) / this.xRandDivider + this.xRandSkipper;
		this.y += (p.y * MULTIPLIER) / this.yRandDivider + this.yRandSkipper;

		let pxy = p.x - p.y;
		this.hue += mapValue(pxy, -this.uvalue * 2, this.uvalue * 2, -this.hueStep, this.hueStep, true);
		this.hue = this.hue > 360 ? 0 : this.hue < 0 ? 360 : this.hue;
		this.sat += random(-this.satStep, this.satStep);
		this.sat = this.sat > 100 ? 100 : this.sat < 0 ? 0 : this.sat;
		this.bri += random(-this.briStep, this.briStep);
		this.bri = this.bri > 100 ? 100 : this.bri < 0 ? 0 : this.bri;

		if (this.isRestrained) {
			if (this.x < (this.xMin - 0.015) * width) {
				this.x = (this.xMax + 0.015) * width;
				if (features.jdlmode != 'yes') {
					this.a = 0;
				}
			}
			if (this.x > (this.xMax + 0.015) * width) {
				this.x = (this.xMin - 0.015) * width;
				if (features.jdlmode != 'yes') {
					this.a = 0;
				}
			}
			if (this.y < (this.yMin - 0.015) * height) {
				this.y = (this.yMax + 0.015) * height;
				if (features.jdlmode != 'yes') {
					this.a = 0;
				}
			}
			if (this.y > (this.yMax + 0.015) * height) {
				this.y = (this.yMin - 0.015) * height;
				if (features.jdlmode != 'yes') {
					this.a = 0;
				}
			}
		}
	}
}
function superCurve(x, y, scl1, scl2, ang1, ang2, octave, clampvalueArr, uvalue) {
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

	/* 	let u = mapValue(un, -clampvalueArr[0], clampvalueArr[1], -uvalue, uvalue, true);
	let v = mapValue(vn, -clampvalueArr[2], clampvalueArr[3], -uvalue, uvalue, true);
 */
	let p = createVector(u, v);
	return p;
}
