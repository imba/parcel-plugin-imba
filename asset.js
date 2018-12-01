const { Asset } = require('parcel-bundler');
const compiler = require('imba/lib/compiler');
const helpers = require('imba/lib/compiler/helpers');

module.exports = class ImbaAsset extends Asset {
	constructor(name, options) {
    	super(name, options);
    	this.type = 'js';
	}

	async generate() {

		const opts = {
			sourceMap: this.options.sourceMaps,
			sourcePath: this.relativeName,
			ENV_WEBPACK: true,
			comments: false,
			target: 'web'
		};

		try {
				let result = compiler.compile(this.contents, opts);
				let js = result.toString();
				if(result.warnings && true){
					result.warnings.forEach(function(warn){
						let msg = helpers.printWarning(result.source,warn);
						let err = new Error(msg);
					});
				}
				if(this.options.sourceMaps) return [{type: 'js', value: js}]
				else return [{type: 'js', value: (js, result.sourcemap)}]
			} catch(e) {
				console.log('');
				console.log('--------------------------------------');
				if(e.prettyMessage){
					let err = new Error(e.prettyMessage ? e.prettyMessage() : e.message);
					console.log(e.prettyMessage());
				}
				else
				{
					let err = new Error(e.message);
					console.log(err);
				}
				console.log('--------------------------------------');
				return [{type: 'js', value: undefined}]
		}
	}
}