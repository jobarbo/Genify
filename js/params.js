//* PARAMS *//
// put global settings here if needed

//* COMPOSITION TYPE DEFINITION *//
// CATEGORISE VARIABILITY INSIDE ARRAYS //

const complexityArr = [
	['1', 40],
	['2', 25],
	['3', 15],
	['4', 10],
	['5', 5],
	['6', 5],
];

const themeArr = [
	['bright', 50],
	['dark', 50],
];

const compositionArr = [
	['semiconstrained', 35],
	['constrained', 35],
	['compressed', 15],
	['micro', 15],
];

const colorModeArr = [
	['monochrome', 25],
	['fixed', 25],
	['dynamic', 25],
	['iridescent', 25],
];

const strokestyleArr = [
	['thin', 33],
	['regular', 33],
	['bold', 33],
];

const clampvalueArr = [
	['0.0000015,0.0000015', 20],
	['0.0015,0.0015', 10],
	['0.015,0.0015', 10],
	['0.015,0.0000015', 20],
];

const speedvalueArr = [
	['5,15', 15],
	['5,5', 15],
	['15,5', 15],
	['5,10', 10],
	['10,5', 10],
	['10,10', 10],
	['10,15', 5],
	['15,10', 5],
	['15,15', 5],
	['5,20', 5],
	['20,5', 5],
];

const rangeTypeArr = [
	['free', 10],
	['limited', 90],
];

const jdlModeArr = [
	['yes', 10],
	['no', 90],
];

// all input parameters are optional, they will be chosen at random if not passed into the function
function generate_composition_params(
	complexity,
	theme,
	composition,
	colormode,
	strokestyle,
	clampvalue,
	rangetype,
	jdlmode,
	speedvalue
) {
	// SET DEFAULTS IF NOT PASSED IN
	if (complexity === undefined) {
		complexity = weighted_choice(complexityArr);
	}

	if (theme === undefined) {
		theme = weighted_choice(themeArr);
	}

	if (colormode === undefined) {
		colormode = weighted_choice(colorModeArr);
	}

	if (strokestyle === undefined) {
		strokestyle = weighted_choice(strokestyleArr);
	}

	if (clampvalue === undefined) {
		clampvalue = weighted_choice(clampvalueArr);
	}

	if (composition === undefined) {
		composition = weighted_choice(compositionArr);
	}

	if (jdlmode === undefined) {
		jdlmode = weighted_choice(jdlModeArr);
	}

	if (speedvalue === undefined) {
		speedvalue = weighted_choice(speedvalueArr);
	}

	if (rangetype === undefined) {
		rangetype = weighted_choice(rangeTypeArr);
		if (composition === 'micro') {
			rangetype = 'free';
			jdlmode = 'yes';
		}
		if (rangetype === 'free') {
			jdlmode = 'yes';
		}
	}

	//* EXCEPTIONS AND OVER-RIDES *//
	// if necessary, add exceptions and over-rides here

	//* PACK PARAMETERS INTO OBJECT *//
	var composition_params = {
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

	//* RETURN PARAMETERS *//
	return composition_params;
}
