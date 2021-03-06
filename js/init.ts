﻿/// <reference path="../typings/angular2/angular2.d.ts" />
import Molecule = Chemistry.Structures.Molecule;

import {Component, Inject, bootstrap, forwardRef, View, NgFor, NgIf, NgClass} from 'angular2/angular2';
declare var ChemDoodle: any;
declare var $: any;

export class Persistor {
    
    save(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    load(key: string) : any {
        return localStorage.getItem(key);
    }
}

export class CanvasSettingsPersistor
{
    private persistor: Persistor;
    private prefix : string = "canvasSettings";
    constructor( @Inject(Persistor) persistor: Persistor) {
        this.persistor = persistor;
    }

    haveBeenPersisted() {
        return !(this.persistor.load(this.prefix + "wireframe") == undefined);
    }

    save(canvasSettings: CanvasSettings) {
        this.persistor.save(this.prefix + "wireframe", !!canvasSettings.getWireframe());
        this.persistor.save(this.prefix + "sticks", !!canvasSettings.getSticks());
        this.persistor.save(this.prefix + "ballsAndSticks", !!canvasSettings.getBallsAndSticks());
        this.persistor.save(this.prefix + "vanDerWaals", !!canvasSettings.getVanDerWaals());
        this.persistor.save(this.prefix + "surface", !!canvasSettings.getSurface());
        this.persistor.save(this.prefix + "charge", !!canvasSettings.getCharge());
        this.persistor.save(this.prefix + "atom", !!canvasSettings.getAtom());
        this.persistor.save(this.prefix + "alphaTrace", !!canvasSettings.getAlphaTrace());
        this.persistor.save(this.prefix + "cartoon", !!canvasSettings.getCartoon());
    }

    private stringToBool(val: string): boolean {
        if (val === "true") {
            return true;
        }
        if (val === "false") {
            return false;
        }

        return !!val;
    }

    load(canvasSettings: CanvasSettings) : void {
        canvasSettings.setPromoteChanges(false);
        canvasSettings.setWireframe(this.stringToBool(this.persistor.load(this.prefix + "wireframe")));
        canvasSettings.setSticks(this.stringToBool(this.persistor.load(this.prefix + "sticks")));
        canvasSettings.setBallsAndSticks(this.stringToBool(this.persistor.load(this.prefix + "ballsAndSticks")));
        canvasSettings.setVanDerWaals(this.stringToBool(this.persistor.load(this.prefix + "vanDerWaals")));
        canvasSettings.setSurface(this.stringToBool(this.persistor.load(this.prefix + "surface")));
        canvasSettings.setCharge(this.stringToBool(this.persistor.load(this.prefix + "charge")));
        canvasSettings.setAtom(this.stringToBool(this.persistor.load(this.prefix + "atom")));
        canvasSettings.setAlphaTrace(this.stringToBool(this.persistor.load(this.prefix + "alphaTrace")));
        canvasSettings.setCartoon(this.stringToBool(this.persistor.load(this.prefix + "cartoon")));
        canvasSettings.setPromoteChanges(true);
    }

}


export class CanvasSettings {

    private persistor : CanvasSettingsPersistor;

    constructor( @Inject(CanvasSettingsPersistor) persistor: CanvasSettingsPersistor) {
        this.persistor = persistor;
        this.persistor.load(this);

        this.promoteChanges = false;
        if (!this.persistor.haveBeenPersisted() &&
            !this._wireframe && !this._sticks && !this._ballsAndSticks && !this._vanDerWaals && !this._surface) {
            this.setDefaultPrimaryStructure();
        }

        if (!this._charge && !this._atom) {
            this.setDefaultColor();
        }
        this.promoteChanges = true;
        this.change();
    }

    private promoteChanges : boolean = true;

    setPromoteChanges(val: boolean) {
        this.promoteChanges = val;
    }

    // primary structure
    private _wireframe: boolean;
    private _sticks: boolean;
    private _ballsAndSticks: boolean;
    private _vanDerWaals: boolean;
    private _surface: boolean;

    // color
    private _charge: boolean;
    private _atom: boolean;

    // secondary structure
    private _alphaTrace: boolean;
    private _cartoon: boolean;

    private setDefaultPrimaryStructure() {
        this.resetPrimaryStructure();
        this.setWireframe(true);
    }

    private resetPrimaryStructure() {
        this._wireframe = false;
        this._sticks = false;
        this._ballsAndSticks = false;
        this._vanDerWaals = false;
        this._surface = false;
    }

    private setDefaultColor() {
        this.resetColor();
        this.setAtom(true);
    }

    private resetColor() {
        this._charge = false;
        this._atom = false;
    }

    setWireframe(val: any) {
        if(val) {
            this.resetPrimaryStructure();
        }
        this._wireframe = val;
        this.change();
    }

    getWireframe(): boolean {
        return this._wireframe;
    }

    setSticks(val: boolean) {
        if (val) {
            this.resetPrimaryStructure();
        }
        this._sticks = !!val;
        this.change();
    }

    getSticks(): boolean {
        return this._sticks;
    }

    setBallsAndSticks(val: boolean) {
        if(val) {
            this.resetPrimaryStructure();
        }
        this._ballsAndSticks = !!val;
        this.change();
    }

    getBallsAndSticks(): boolean {
        return this._ballsAndSticks;
    }

    setVanDerWaals(val: boolean) {
        if(val) {
            this.resetPrimaryStructure();
        }
        this._vanDerWaals = !!val;
        this.change();
    }

    getVanDerWaals(): boolean {
        return this._vanDerWaals;
    }

    setSurface(val: boolean) {
        if(val) {
            this.resetPrimaryStructure();
        }
        this._surface = !!val;
        this.change();
    }

    getSurface(): boolean {
        return this._surface;
    }

    setCharge(val: boolean) {
        if(val) {
            this.resetColor();
        }
        this._charge = !!val;
        this.change();
    }

    getCharge(): boolean {
        return this._charge;
    }

    setAtom(val: boolean) {
        if(val) {
            this.resetColor();
        }
        this._atom = !!val;
        this.change();
    }

    getAtom(): boolean {
        return this._atom;
    }

    setAlphaTrace(val: boolean) {
        if(val) {
            this.resetColor();
        }
        this._alphaTrace = !!val;
        this.change();
    }

    getAlphaTrace(): boolean {
        return this._alphaTrace;
    }

    setCartoon(val: boolean) {
        if(val) {
            this.resetColor();
        }
        this._cartoon = !!val;
        this.change();
    }

    getCartoon(): boolean {
        return this._cartoon;
    }

    private changeCallbacks = [];

    change(): void {
        if (!this.promoteChanges) {
            return;
        }
        this.persistor.save(this);
        for (var i in this.changeCallbacks) {
            if (this.changeCallbacks.hasOwnProperty(i)) {
                this.changeCallbacks[i].call();
            }
        }
    }

    listen(callback: any): void {
        this.changeCallbacks.push(callback);
    }

}


export class CanvasService {
    private canvas: any;
    private canvasSettings : CanvasSettings;
    constructor(@Inject(CanvasSettings) canvasSettings: CanvasSettings) {
        this.canvasSettings = canvasSettings;
        var self = this;
        this.canvasSettings.listen(() => {
            self.render();
        });

        this.canvas = new ChemDoodle.TransformCanvas3D('mainCanvas', 250, 250);
        
        this.render();
    }

    resize(width, height) {
        this.canvas.resize(width, height);
    }

    render() {
        this.canvas.specs.atoms_display = true;
        this.canvas.specs.bonds_display = true;
        this.canvas.specs.macro_displayAtoms = true;
        this.canvas.specs.macro_displayBonds = true;

        if (this.canvasSettings.getWireframe()) {
            this.canvas.specs.set3DRepresentation('Wireframe');
        } else if (this.canvasSettings.getSticks()) {
            this.canvas.specs.set3DRepresentation('Stick');
        } else if(this.canvasSettings.getBallsAndSticks()) {
            this.canvas.specs.set3DRepresentation('Ball and Stick');     
        } else if(this.canvasSettings.getVanDerWaals()) {
            this.canvas.specs.set3DRepresentation('van der Waals Spheres');     
        } else if (this.canvasSettings.getSurface()) {

        } else {
            this.canvas.specs.atoms_display = false;
            this.canvas.specs.bonds_display = false;
            this.canvas.specs.macro_displayAtoms = false;
            this.canvas.specs.macro_displayBonds = false;
        }

        this.canvas.specs.compass_display = true;

        this.canvas.specs.backgroundColor = 'black';
        this.canvas.specs.deduceCovalentBonds = true;
        this.canvas.specs.deduceResidueBonds = true;
        //transformBallAndStick.specs.atoms_displayLabels_3D = true;
        
        //transformBallAndStick.specs.proteins_displayPipePlank = true;
        if (this.canvasSettings.getCartoon()) {
            this.canvas.specs.proteins_ribbonCartoonize = true;
            this.canvas.specs.proteins_displayRibbon = true;

        } else {
            this.canvas.specs.proteins_ribbonCartoonize = false;
            this.canvas.specs.proteins_displayRibbon = false;
        }

        if (this.canvasSettings.getCharge()) {

        }

        if (this.canvasSettings.getAlphaTrace()) {

        }
        //transformBallAndStick.specs.proteins_displayBackbone = true;
        //this.canvas = ChemDoodle.TransformCanvas3D("main", 250, 250);
        this.canvas.repaint();
    }

    renderMolecule(molecule: Chemistry.Structures.Molecule) {
        //var originalWidth = $("#mainCanvas").width();
        //var originalHeight = $("#mainCanvas").height();
        //this.canvas = new ChemDoodle.TransformCanvas3D('mainCanvas', originalWidth, originalHeight);
        this.canvas.loadMolecule(molecule.molecule);
        
    }

    getCanvas(): any {
        return this.canvas;
    }
}
export class MoleculeService {
    public molecules: List<Chemistry.Structures.Molecule> = [];

    private willBeAdded = 0;

    private moleculeRender: CanvasService;

    constructor(@Inject(CanvasService) moleculeRender: CanvasService) {
        this.moleculeRender = moleculeRender;
    }

    informAboutAdding(): void {
        this.willBeAdded++;
    }

    add(molecule: Chemistry.Structures.Molecule): void {
        this.willBeAdded--;
        if (this.willBeAdded === 0) {
            this.active = molecule;
            this.moleculeRender.renderMolecule(molecule);
        }
  
        this.molecules.push(molecule);
    }

    renderMolecule(molecule: Chemistry.Structures.Molecule) { // todo: pass CanvasService to LeftMenuComponent and remove this method
        this.active = molecule;
        this.moleculeRender.renderMolecule(molecule);
    }

    private active : Chemistry.Structures.Molecule;

    getActiveMolecule(): Chemistry.Structures.Molecule {
        return this.active;
    }

}


@Component({
    selector: 'canvasComponent'
    //bindings: [MoleculeService] //, CanvasComponent, RightMenuComponent]
})
@View({
        templateUrl: 'js/UI/Components/AppComponent/CanvasComponent/canvasComponent.html'
})
// Component controller
export class CanvasComponent {

    constructor( ) {

    }
}


@Component({
    selector: 'uploadComponent'
})
@View({
    templateUrl: 'js/UI/Components/AppComponent/LeftMenuComponent/UploadComponent/uploadComponent.html'
})
export class UploadComponent {

    private fileTextReader : Files.TextFileReader;
    private onUploadListeners;

    private moleculeService: MoleculeService;

    constructor(@Inject(MoleculeService) moleculeService: MoleculeService) {
        this.moleculeService = moleculeService;

        this.onUploadListeners = [];
        var self = this;
        this.fileTextReader = new Files.TextFileReader(
            (e: any, file: File) => { // complete
                var moleculeData = ChemDoodle.readPDB(e.target.result, 1);
                var molecule = new Chemistry.Structures.Molecule(moleculeData, file.name);
                this.moleculeService.add(molecule);
        },
        (e: ProgressEvent, file: File) => { // progress

        });

        var molFile = '3036\n  CHEMDOOD12280913053D\n\n 28 29  0     0  0  0  0  0  0999 V2000\n    0.0456    1.0544   -1.9374 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7952   -1.7026   -1.7706 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    0.6447   -0.8006   -4.1065 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    1.8316   -0.9435    4.4004 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    6.9949    1.1239   -3.9007 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    1.9032   -1.0692   -1.6001 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8846   -1.0376   -0.1090 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.2176   -0.5035   -2.1949 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5585   -0.6223   -2.3126 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2670    0.1198    0.5688 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3480   -1.2638   -2.0859 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4856   -2.1660    0.6075 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1719    0.7242   -2.7939 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2506    0.1490    1.9633 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5313   -0.7541   -2.6203 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4691   -2.1369    2.0020 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3552    1.2340   -3.3284 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8515   -0.9793    2.6800 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5350    0.4948   -3.2417 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9777   -2.1366   -1.8749 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5727    1.0177    0.0401 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3513   -2.2356   -1.6034 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1951   -3.0814    0.0991 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3077    1.3562   -2.8879 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5491    1.0585    2.4783 H   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4431   -1.3411   -2.5451 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1584   -3.0244    2.5473 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3449    2.2098   -3.8075 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  9  1  0  0  0  0\n  2  9  1  0  0  0  0\n  3  9  1  0  0  0  0\n  4 18  1  0  0  0  0\n  5 19  1  0  0  0  0\n  6  7  1  0  0  0  0\n  6  8  1  0  0  0  0\n  6  9  1  0  0  0  0\n  6 20  1  0  0  0  0\n  7 10  2  0  0  0  0\n  7 12  1  0  0  0  0\n  8 11  2  0  0  0  0\n  8 13  1  0  0  0  0\n 10 14  1  0  0  0  0\n 10 21  1  0  0  0  0\n 11 15  1  0  0  0  0\n 11 22  1  0  0  0  0\n 12 16  2  0  0  0  0\n 12 23  1  0  0  0  0\n 13 17  2  0  0  0  0\n 13 24  1  0  0  0  0\n 14 18  2  0  0  0  0\n 14 25  1  0  0  0  0\n 15 19  2  0  0  0  0\n 15 26  1  0  0  0  0\n 16 18  1  0  0  0  0\n 16 27  1  0  0  0  0\n 17 19  1  0  0  0  0\n 17 28  1  0  0  0  0\nM  END\n';
        var molecule = ChemDoodle.readMOL(molFile, 1);
        this.moleculeService.informAboutAdding();
        this.moleculeService.add(new Chemistry.Structures.Molecule(molecule, "Test molecule"));
    }

    handleFileSelect(evt : any) : void {
        var files = evt.target.files; // FileList object
        this.fileTextReader.read(files);
        this.moleculeService.informAboutAdding();
    }
}


@Component({
    selector: 'rightMenuComponent',
})
@View({
    templateUrl: 'js/UI/Components/AppComponent/RightMenuComponent/rightMenuComponent.html'
})
export class RightMenuComponent {

    private canvasSettings: CanvasSettings;

    constructor( @Inject(CanvasSettings) canvasSettings: CanvasSettings) {
        this.canvasSettings = canvasSettings;
        $(":input[type=checkbox]").bootstrapSwitch();

        $("#wireframe").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setWireframe(state);
        }).bootstrapSwitch("state", canvasSettings.getWireframe());
        
        $("#sticks").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setSticks(state);
        }).bootstrapSwitch("state", canvasSettings.getSticks());

        $("#ballsAndSticks").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setBallsAndSticks(state);
        }).bootstrapSwitch("state", canvasSettings.getBallsAndSticks());

        $("#vanDerWaals").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setVanDerWaals(state);
        }).bootstrapSwitch("state", canvasSettings.getVanDerWaals());

        $("#surface").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setSurface(state);
        }).bootstrapSwitch("state", canvasSettings.getSurface());

        $("#atom").on("switchChange.bootstrapSwitch", function (event, state) {
            if (!state) {
                $("#charge").bootstrapSwitch("state", true);
            }

            canvasSettings.setAtom(state);
        }).bootstrapSwitch("state", canvasSettings.getAtom());

        $("#charge").on("switchChange.bootstrapSwitch", function (event, state) {
            if (!state) {
                $("#atom").bootstrapSwitch("state", true);
            }

            canvasSettings.setCharge(state);

        }).bootstrapSwitch("state", canvasSettings.getCharge());

        $("#alphaTrace").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setAlphaTrace(state);
        }).bootstrapSwitch("state", canvasSettings.getAlphaTrace());

        $("#cartoon").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setCartoon(state);
        }).bootstrapSwitch("state", canvasSettings.getCartoon());

        $(".primaryStructureGroup").on("click", function (event, state) {
            $(".primaryStructureGroup").not(this).bootstrapSwitch("state", false);
        });

        $(".bootstrap-switch-label").click(function (e) {
            e.stopPropagation();
            $(this).parent().find(":input").click().trigger("switchChange.bootstrapSwitch").click();
        });

        $(".bootstrap-switch-handle-off, .bootstrap-switch-handle-on").click(function(e) {
            e.stopPropagation();
            $(this).parent().find(":input").click().click();
        });

        $("#rightMenu .list-group-item").click(function() {
            $(this).find(":input").click();
        });
        
    }
}


@Component({
    selector: 'leftMenuComponent'
})
@View({
    templateUrl: 'js/UI/Components/AppComponent/LeftMenuComponent/leftMenuComponent.html',
    directives: [UploadComponent, NgFor, NgIf, NgClass] 
})
export class LeftMenuComponent {

    private moleculeService: MoleculeService;

    constructor( @Inject(MoleculeService) moleculeService: MoleculeService) {
        this.moleculeService = moleculeService;

    }ap

    isActive(molecule: Chemistry.Structures.Molecule): boolean {
        return molecule == this.moleculeService.getActiveMolecule();
    }
}

@Component({
    selector: 'appComponent',
    bindings: [CanvasService, MoleculeService, CanvasSettings, CanvasSettingsPersistor, Persistor]//, LeftMenuComponent, RightMenuComponent, CanvasComponent, UploadComponent]
})
@View({
        templateUrl: 'js/UI/Components/AppComponent/appComponent.html',
        directives: [LeftMenuComponent, CanvasComponent, RightMenuComponent]
})
// Component controller
export class AppComponent {
    //  private canvasComponent : CanvasComponent;
    constructor(
        @Inject(CanvasService) canvasService: CanvasService
    ) {
        $(window).resize(function() {
            var width = $("#canvasGrid").width();
            var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            canvasService.resize(width, height);
        }).resize();

    }

}

bootstrap(AppComponent);