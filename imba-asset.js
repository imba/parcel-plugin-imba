const JSAsset = require('parcel-bundler/src/assets/JSAsset');
var compiler = require('imba/lib/compiler/compiler');

class ImbaAsset extends JSAsset {

	async parse (code) {
		var opts = {
			filename: this.filename,
			sourceMap: this.sourceMap,
			sourcePath: this.name,
			target: 'web',
			ENV_DEBUG: this.debug
			//ENV_WEBPACK: true
		};
		this.contents = compiler.compile(this.contents, opts).toString();
	
		return await super.parse(this.contents);
	}
}

module.exports = ImbaAsset;