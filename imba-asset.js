const Asset = require('parcel-bundler')
var compiler = require('imba/lib/compiler')

class ImbaAsset extends Asset {
	constructor(name, pkg, options) {
		super(name, pkg, options);
		this.type = 'js';
	}
	
	async parse (code) {
		// const imba = await this.requireDependencies();
		console.log('inside plugin')
		const options = ['imba']
		this.contents = compiler.compile(this.contents, options).toString();
	
		return this.contents
	  }

	/*
	  async requireDependencies() {
		return await localRequire("imba", this.options.rootDir);
	}	  

	/*
	async parse(code) {
		const config = await this.getConfig(['.svelterc', 'svelte.config.js', 'package.json']);
		this.contents = compiler.compile(this.contents, config).toString();
		return await super.parse(this.contents);
	}
	*/

	/*
	async generate () {
		// const options = await super.getParserOptions()
		// options.plugins = options.plugins ? options.plugins.concat('imba') : ['imba']
		console.log('inside plugin')
		const config = await this.getConfig(['.svelterc', 'svelte.config.js', 'package.json']);
		let code = compiler.compile(this.contents, config).toString();
		//let code = '';
		return [
			{
				type: 'js',
				value: code
				// sourceMap: this.options.sourceMaps ? map : undefined
			}
		];
	}
	*/
}

module.exports = ImbaAsset;