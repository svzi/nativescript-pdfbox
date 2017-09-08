var Pdfbox = require("nativescript-pdfbox").Pdfbox;
var pdfbox = new Pdfbox();

describe("greet function", function() {
    it("exists", function() {
        expect(pdfbox.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(pdfbox.greet()).toEqual("Hello, NS");
    });
});