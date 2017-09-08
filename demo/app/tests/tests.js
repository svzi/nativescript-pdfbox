var Pdfbox = require('nativescript-pdfbox').Pdfbox;
var pdfbox = new Pdfbox();

describe('greet function', function() {
	it('exists', function() {
		expect(pdfbox.getText).toBeDefined();
	});

	it('returns a string', function() {
		expect(pdfbox.getText()).toEqual('Hello, NS');
	});
});
