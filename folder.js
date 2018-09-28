'use strict';
const os = require('os');
const path = require('path');

function homedir() {
	const env = process.env;
	const home = env.HOME;
	const user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;

	if (process.platform === 'win32') {
		return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
	}

	if (process.platform === 'darwin') {
		return home || (user ? '/Users/' + user : null);
	}

	if (process.platform === 'linux') {
		return home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
	}

	return home || null;
}

function yarn_global_node_modules() {
	let home = homedir();
	let local = path.join(home, '.config', 'yarn');

	if (process.platform === 'win32') {
		if (process.env.LOCALAPPDATA) {
			local = path.join(process.env.LOCALAPPDATA, 'Yarn', 'Data');
		} else local = path.join(home, 'AppData', 'Local', 'Yarn', 'Data')
	}
	return path.join(local, 'global', 'node_modules');
}

module.exports.homedir = typeof os.homedir === 'function' ? os.homedir : homedir;
module.exports.global = yarn_global_node_modules;