//* PARAMS *//
// put global settings here if needed

//* COMPOSITION TYPE DEFINITION *//
// CATEGORISE VARIABILITY INSIDE ARRAYS //

const complexityArr = [
	['1', 10],
	['2', 35],
	['3', 20],
	['4', 15],
	['5', 10],
	['6', 10],
];

const themeArr = [
	['bright', 50],
	['dark', 50],
];

const compositionArr = [
	['semiconstrained', 1],
	['constrained', 4],
	['compressed', 10],
	['micro', 85],
];

const colorModeArr = [
	['monochrome', 15],
	['fixed', 10],
	['dynamic', 45],
	['iridescent', 30],
];

const strokestyleArr = [
	['thin', 70],
	['regular', 20],
	['bold', 10],
];

const clampvalueArr = [
	['0.0000015,0.0000015', 20],
	['0.00015,0.00015', 20],
	['0.0015,0.0015', 20],
	['0.015,0.0015', 10],
	['0.015,0.00015', 10],
	['0.015,0.0000015', 20],
];

const speedvalueArr = [
	['5,7', 20],
	['5,15', 10],
	['5,10', 20],
	['5,5', 25],
	['4,4', 10],
	['7,7', 15],
];

const rangeTypeArr = [
	['free', 30],
	['limited', 70],
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
