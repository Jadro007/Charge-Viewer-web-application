/// <reference path="engine/files/TextFileReader.ts" />
var fileTextReader = new Files.TextFileReader(
    (e: ProgressEvent, file: File) => { // complete
        console.log("custom complete");
        debugger;
    },
    (e: ProgressEvent, file: File) => { // progress

    });


window.document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    fileTextReader.read(files);
}