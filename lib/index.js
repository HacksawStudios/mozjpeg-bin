import { execa } from 'execa';
import process from 'node:process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getArch() {
	switch (process.arch) {
		case 'x32':
			return 'x86';
		case 'x64':
			return 'x64'
		case 'arm':
			return 'arm';
		case 'arm64':
			return 'arm64';
		default:
			return null;
	}
}

function getPlatform() {
	switch (process.platform) {
		case 'darwin':
			return 'macos';
		case 'linux':
			return 'linux';
		case 'win32':
			return 'win';
		default:
			return null;
	}
}

const bin = {
	path: function () {
		const arch = getArch();
		const platform = getPlatform();
		if (!arch || !platform) {
			return null;
		}
		const dir = `${__dirname}/../vendor`
		return platform == 'win'
			? `${dir}/${platform}/cjpeg.exe`
			: `${dir}/${platform}/${arch}/cjpeg`
	},
	dest: function () {
		return import.meta.url;
	},
	run: function (args) {
		return execa(this.path(), args);
	}
}

export default bin;