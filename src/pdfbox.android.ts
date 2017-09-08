import * as application from 'tns-core-modules/application';

declare var com: any;
declare var java: any;

export class PdfBox {
	private _pdfStripper: any = null;

	constructor() {
		com.tom_roush.pdfbox.util.PDFBoxResourceLoader.init(this.getContext());
		this._pdfStripper = new com.tom_roush.pdfbox.text.PDFTextStripper();
	}

	public getText(pathOrUri: any, removeLineBreaks: boolean = false): Promise<string> {
		console.log('PdfBox::getText(), pathOrUri: ' + pathOrUri);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const strPath: string = pathOrUri as string;
				console.log('PdfBox::getText(), strPath: "' + strPath + '"');
				console.log('PdfBox::getText(), typeof pathOrUri: ' + typeof pathOrUri);

				if (typeof pathOrUri === 'object') {
					console.log('PdfBox::getText(), found uri...');
					let is: java.io.FileInputStream = null;
					try {
						const ctx = this.getContext();
						const cr: android.content.ContentResolver = ctx.getContentResolver();
						const fd: android.os.ParcelFileDescriptor = cr.openFileDescriptor(pathOrUri, 'r');
						is = new java.io.FileInputStream(fd.getFileDescriptor());
					} catch (error) {
						console.log(error);
					}

					if (is) {
						this.parseText(is, removeLineBreaks)
							.then(resolve)
							.catch(reject);
					} else {
						reject('could not create input stream!');
					}
				} else {
					console.log('PdfBox::getText(), found path...');
					const file: java.io.File = new java.io.File(pathOrUri);
					console.log('file: ' + file);

					this.parseText(file, removeLineBreaks)
						.then(resolve)
						.catch(reject);
				}
			}, 100);
		});
	}

	private parseText(doc: any, removeLineBreaks: boolean = false): Promise<string> {
		return new Promise((resolve, reject) => {
			let parsedText: string = '';

			try {
				const document = com.tom_roush.pdfbox.pdmodel.PDDocument.load(doc);
				this._pdfStripper.setStartPage(0);
				parsedText = this._pdfStripper.getText(document);

				if (document != null) {
					document.close();
				}

				if (removeLineBreaks) {
					resolve(this.removeLineBreaks(parsedText));
				} else {
					resolve(parsedText);
				}
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

	private removeLineBreaks(text: string): string {
		let newText: string = '';
		const lines: string[] = text.split('\n');

		if (lines.length > 1) {
			newText = lines[0];
			let counter: number = 1;
			while (counter < lines.length - 1) {
				const line = lines[counter];

				if (line.trim().length > 0) {
					newText = newText.concat(line);
				} else if (line.trim().length === 0) {
					newText = newText.concat('\n\n');
				}
				counter++;
			}
		} else if (lines.length === 1) {
			newText = text;
		}
		return newText;
	}

	// helper function to get current app context
	private getContext() {
		if (application.android.context) {
			return application.android.context;
		}
		let ctx = java.lang.Class
			.forName('android.app.AppGlobals')
			.getMethod('getInitialApplication', null)
			.invoke(null, null);
		if (ctx) {
			return ctx;
		}

		ctx = java.lang.Class
			.forName('android.app.ActivityThread')
			.getMethod('currentApplication', null)
			.invoke(null, null);
		return ctx;
	}
}
