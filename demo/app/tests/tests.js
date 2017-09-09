var fs = require('tns-core-modules/file-system');

var PdfBox = require('nativescript-pdfbox').PdfBox;
var pdfbox = new PdfBox();

describe('greet function', function() {
	it('exists', function() {
		expect(pdfbox.getText).toBeDefined();
	});

	it('returns a string', function() {
		var appPath = fs.knownFolders.currentApp().path;
		var mySampleFile = appPath + '/sample.pdf';

		pdfbox.getText(mySampleFile, true).then(function(text) {
			expect(text).toEqual(
				'The Apache PDFBox® library is an open source Java tool for working with PDF documents. This project allows creation of new PDF documents, manipulation of existing documents and the ability to extract content from documents. Apache PDFBox also includes several command-line utilities. Apache PDFBox is published under the Apache License v2.0. '
			);
		});
	});
});
