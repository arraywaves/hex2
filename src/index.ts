#!/usr/bin/env node

import {
	formatCss,
	formatHsl,
	formatRgb,
	oklch,
	rgb,
} from "culori";

const hexArg = process.argv[2];
if (!hexArg) {
	console.error("Usage: hex2 <hex>");
	process.exit(1);
}

const hexColor = hexArg.startsWith("#") ? hexArg : `#${hexArg}`;

const hex = hexColor.slice(0, 7);
const alpha =
	hexColor.length > 7
		? parseInt(hexColor.slice(7, 9), 16) / 255
		: 1;

const rgbColor = rgb(hex);
if (!rgbColor) {
	console.error("Invalid hex color");
	process.exit(1);
}

rgbColor.alpha = alpha;

const rgba = formatRgb(rgbColor);
const hsla = formatHsl(rgbColor);
const oklchColor = oklch(rgbColor);
const oklchStr = formatCss(oklchColor);

console.log(`RGB(A): ${rgba}`);
console.log(`HSL(A): ${hsla}`);
console.log(`OKLCH: ${oklchStr}`);
