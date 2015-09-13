/// <reference path="../typings/angular2/angular2.d.ts" />
export declare class Persistor {
    save(key: string, value: any): void;
    load(key: string): any;
}
export declare class CanvasSettingsPersistor {
    private persistor;
    private prefix;
    constructor(persistor: Persistor);
    save(canvasSettings: CanvasSettings): void;
    private stringToBool(val);
    load(canvasSettings: CanvasSettings): void;
}
export declare class CanvasSettings {
    private persistor;
    constructor(persistor: CanvasSettingsPersistor);
    private promoteChanges;
    setPromoteChanges(val: boolean): void;
    private _wireframe;
    private _sticks;
    private _ballsAndSticks;
    private _vanDerWaals;
    private _surface;
    private _charge;
    private _atom;
    private _alphaTrace;
    private _cartoon;
    private resetPrimaryStructure();
    private resetColor();
    setWireframe(val: any): void;
    getWireframe(): boolean;
    setSticks(val: boolean): void;
    getSticks(): boolean;
    setBallsAndSticks(val: boolean): void;
    getBallsAndSticks(): boolean;
    setVanDerWaals(val: boolean): void;
    getVanDerWaals(): boolean;
    setSurface(val: boolean): void;
    getSurface(): boolean;
    setCharge(val: boolean): void;
    getCharge(): boolean;
    setAtom(val: boolean): void;
    getAtom(): boolean;
    setAlphaTrace(val: boolean): void;
    getAlphaTrace(): boolean;
    setCartoon(val: boolean): void;
    getCartoon(): boolean;
    private changeCallbacks;
    change(): void;
    listen(callback: any): void;
}
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
