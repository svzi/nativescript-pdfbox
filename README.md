# NativeScript PdfBox  ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![NPM](https://nodei.co/npm/nativescript-pdfbox.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-urlhandler/)

Apache Pdfbox for NativeScript. It allows to extract the text from a PDF file.

![Sample Android](screenshots/android.png)

The screenshot is based on this [sample.pdf](demo/app/sample.pdf). The pdf file is included in the demo project.

Based on:

- Android [PdfBox-Android](https://github.com/TomRoush/PdfBox-Android)

This plugin is currently only avaiable for Android. 


## Installation

Describe your plugin installation steps. Ideally it would be something like:

```bash
tns plugin add nativescript-pdfbox
```

## Usage 
	
```javascript
import * as fs from 'tns-core-modules/file-system';
import { PdfBox } from 'nativescript-pdfbox';

const appPath = fs.knownFolders.currentApp().path;
const mySampleFile = appPath + '/sample.pdf';
const removeLineBreaks: boolean = true; // optional, default is false

const pdfbox: PdfBox = new PdfBox();
pdfbox
    .getText(mySampleFile, removeLineBreaks)
    .then(text => {
        this.messageNotRemovedLB = text;
        super.notifyPropertyChange('messageNotRemovedLB', text);
    });
```
  
## License

Apache License Version 2.0, January 2004
