import { Observable } from 'tns-core-modules/data/observable';
import { PdfBox } from 'nativescript-pdfbox';

import * as fs from 'tns-core-modules/file-system';

export class HelloWorldModel extends Observable {
    public messageNotRemovedLB: string;
    public messageRemovedLB: string;
    private pdfbox: PdfBox;

    constructor() {
        super();

        let appPath = fs.knownFolders.currentApp().path;
        let mySampleFile = appPath + '/sample.pdf';

        this.pdfbox = new PdfBox();
        this.pdfbox
            .getText(mySampleFile, false)
            .then(text => {
                this.messageNotRemovedLB = text;
                super.notifyPropertyChange('messageNotRemovedLB', text);
            })
            .catch(err => {
                console.log('err: ' + err);
            });
        this.pdfbox
            .getText(mySampleFile, true)
            .then(text => {
                this.messageRemovedLB = text;
                super.notifyPropertyChange('messageRemovedLB', text);
            })
            .catch(err => {
                console.log('err: ' + err);
            });
    }
}
