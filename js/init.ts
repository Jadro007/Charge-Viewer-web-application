/// <reference path="../typings/angular2/angular2.d.ts" />
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

    load(canvasSettings: CanvasSettings) {
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
        persistor.load(this);
    }

    private promoteChanges : boolean = true;

    setPromoteChanges(val: boolean) {
        this.promoteChanges = val;
    }

    // primary structure
    private _wireframe: boolean = false;
    private _sticks: boolean = false;
    private _ballsAndSticks: boolean;
    private _vanDerWaals: boolean;
    private _surface: boolean;

    // color
    private _charge: boolean;
    private _atom: boolean;

    // secondary structure
    private _alphaTrace: boolean;
    private _cartoon: boolean;

    private resetPrimaryStructure() {
        this._wireframe = false;
        this._sticks = false;
        this._ballsAndSticks = false;
        this._vanDerWaals = false;
        this._surface = false;
    }

    private resetColor() {
        this._charge = false;
        this._atom = false;
    }

    setWireframe(val: any) {
        this.resetPrimaryStructure();
        this._wireframe = val;
        this.change();
    }

    getWireframe(): boolean {
        return this._wireframe;
    }

    setSticks(val: boolean) {
        this.resetPrimaryStructure();
        this._sticks = !!val;
        this.change();
    }

    getSticks(): boolean {
        return this._sticks;
    }

    setBallsAndSticks(val: boolean) {
        this.resetPrimaryStructure();
        this._ballsAndSticks = !!val;
        this.change();
    }

    getBallsAndSticks(): boolean {
        return this._ballsAndSticks;
    }

    setVanDerWaals(val: boolean) {
        this.resetPrimaryStructure();
        this._vanDerWaals = !!val;
        this.change();
    }

    getVanDerWaals(): boolean {
        return this._vanDerWaals;
    }

    setSurface(val: boolean) {
        this.resetPrimaryStructure();
        this._surface = !!val;
        this.change();
    }

    getSurface(): boolean {
        return this._surface;
    }

    setCharge(val: boolean) {
        this.resetColor();
        this._charge = !!val;
        this.change();
    }

    getCharge(): boolean {
        return this._charge;
    }

    setAtom(val: boolean) {
        this.resetColor();
        this._atom = !!val;
        this.change();
    }

    getAtom(): boolean {
        return this._atom;
    }

    setAlphaTrace(val: boolean) {
        this.resetColor();
        this._alphaTrace = !!val;
        this.change();
    }

    getAlphaTrace(): boolean {
        return this._alphaTrace;
    }

    setCartoon(val: boolean) {
        this.resetColor();
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
    constructor( @Inject(CanvasSettings) canvasSettings: CanvasSettings) {
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
            alert("Surface is not supported yet");
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
            alert("Charge is not supported yet");
        }

        if (this.canvasSettings.getAlphaTrace()) {
            alert("Alpha trace is not supported yet");
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
        });

        $("#sticks").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setSticks(state);
        });

        $("#ballsAndSticks").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setBallsAndSticks(state);
        });

        $("#vanDerWaals").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setVanDerWaals(state);
        });

        $("#surface").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setSurface(state);
        });

        $("#atom").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setAtom(state);
        });

        $("#charge").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setCharge(state);
        });

        $("#alphaTrace").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setAlphaTrace(state);
        });

        $("#cartoon").on("switchChange.bootstrapSwitch", function (event, state) {
            canvasSettings.setCartoon(state);
        });



        $(".primaryStructureGroup").on("click", function (event, state) {
            $(".primaryStructureGroup").not(this).bootstrapSwitch("state", false);
        });

        $(".colorGroup").on("click", function (event, state) {
            $(".colorGroup").not(this).bootstrapSwitch("state", false);
        });

        $(".bootstrap-switch-label").click(function() {
            $(this).parent().parent().parent().click();
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