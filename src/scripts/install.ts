#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { execSync } from "child_process";

const isWindows = process.platform === "win32";
const homedir = os.homedir();
const binPath = isWindows
	? path.join(homedir, "AppData", "Local", "bin")
	: path.join(homedir, "bin");
const sourcePath = path.resolve("dist", "index.js");
const targetPath = path.join(
	binPath,
	isWindows ? "hex2.cmd" : "hex2",
);

if (!fs.existsSync(binPath)) {
	fs.mkdirSync(binPath, { recursive: true });
}

if (!isWindows) {
	execSync(`chmod +x ${sourcePath}`);
}

const addToPath = () => {
	if (isWindows) {
		try {
			const userPath = execSync("echo %PATH%")
				.toString()
				.trim();
			if (!userPath.includes(binPath)) {
				execSync(`setx PATH "${binPath};%PATH%"`);
				console.log(
					"Added to PATH. Restart your terminal to apply changes.",
				);
			}
		} catch (e) {
			console.error(
				"Failed to update PATH. Please add it manually.",
			);
		}
	} else {
		const shell = process.env.SHELL || "/bin/bash";
		const profileFile = shell.includes("zsh")
			? path.join(homedir, ".zshrc")
			: path.join(homedir, ".bashrc");

		if (fs.existsSync(profileFile)) {
			const content = fs.readFileSync(
				profileFile,
				"utf8",
			);
			if (
				!content.includes(
					`export PATH="${binPath}:$PATH"`,
				)
			) {
				fs.appendFileSync(
					profileFile,
					`\nexport PATH="${binPath}:$PATH"\n`,
				);
				console.log(
					"Added to PATH. Run 'source " +
						profileFile +
						"' or restart your terminal.",
				);
			}
		}
	}
};

if (isWindows) {
	fs.writeFileSync(
		targetPath,
		`@node "%~dp0\\..\\..\\${path.relative(homedir, sourcePath)}" %*`,
	);
	console.log(`Created Windows command at ${targetPath}`);
	addToPath();
} else {
	try {
		if (fs.existsSync(targetPath)) {
			fs.unlinkSync(targetPath);
		}
		fs.symlinkSync(sourcePath, targetPath);
		console.log(`Symlink created at ${targetPath}`);
		addToPath();
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error(
				`Failed to create symlink: ${e.message}`,
			);
		} else {
			console.error(
				`Failed to create symlink: ${String(e)}`,
			);
		}
	}
}
