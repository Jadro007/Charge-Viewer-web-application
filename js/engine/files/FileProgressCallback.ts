/// <reference path="../callbacks/Action.ts" /> 

module Files {

    export interface FileProgressCallback { //extends Callbacks.Action2<FileEvent, File> {
        (item: FileEvent, item2: File): void;
    }
}