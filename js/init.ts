/// <reference path="../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

/// <reference path="engine/files/TextFileReader.ts" />
/*var fileTextReader = new Files.TextFileReader(
    (e: ProgressEvent, file: File) => { // complete
        
    },
    (e: ProgressEvent, file: File) => { // progress

    });

alert("baf");
window.document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    fileTextReader.read(files);
}*/

// Annotation section
@Component({
    selector: 'my-app'
})
@View({
    template: '<h1>Hello {{ name }}</h1>'
})
// Component controller
class MyAppComponent {
    name: string;
    constructor() {
        debugger;
        this.name = 'Alice';
    }
}

alert("wtf")
console.log("gergergsd");
bootstrap(MyAppComponent);