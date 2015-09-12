/// <reference path="../typings/angular2/angular2.d.ts" />
export declare class CanvasService {
    private canvas;
    private canvasSettings;
    constructor(canvasSettings: CanvasSettings);
    resize(width: any, height: any): void;
    render(): void;
    renderMolecule(molecule: Chemistry.Structures.Molecule): void;
    getCanvas(): any;
}
export declare class MoleculeService {
    molecules: List<Chemistry.Structures.Molecule>;
    private willBeAdded;
    private moleculeRender;
    constructor(moleculeRender: CanvasService);
    informAboutAdding(): void;
    add(molecule: Chemistry.Structures.Molecule): void;
    renderMolecule(molecule: Chemistry.Structures.Molecule): void;
    private active;
    getActiveMolecule(): Chemistry.Structures.Molecule;
}
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
    private canvasSettings;
    constructor(canvasSettings: CanvasSettings);
}
export declare class LeftMenuComponent {
    private moleculeService;
    constructor(moleculeService: MoleculeService);
    ap: any;
    isActive(molecule: Chemistry.Structures.Molecule): boolean;
}
export declare class AppComponent {
    constructor(canvasService: CanvasService);
}
