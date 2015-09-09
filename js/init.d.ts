/// <reference path="../typings/angular2/angular2.d.ts" />
export declare class CanvasComponent {
    constructor();
}
export declare class UploadComponent {
    private fileTextReader;
    private onUploadListeners;
    private moleculeService;
    constructor(moleculeService: MoleculeService);
    handleFileSelect(evt: any): void;
}
export declare class RightMenuComponent {
    constructor();
}
export declare class LeftMenuComponent {
    private moleculeService;
    constructor(moleculeService: MoleculeService);
}
export declare class AppComponent {
    constructor();
}
