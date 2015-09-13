/// <reference path="../typings/angular2/angular2.d.ts" />
import Molecule = Chemistry.Structures.Molecule;

import {Component, Inject, bootstrap, forwardRef, View, NgFor, NgIf, NgClass} from 'angular2/angular2';
declare var ChemDoodle: any;
declare var $: any;

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
        this.canvas.specs.set3DRepresentation('Ball and Stick');
        this.canvas.specs.backgroundColor = 'black';
        var molFile = '3036\n  CHEMDOOD12280913053D\n\n 28 29  0     0  0  0  0  0  0999 V2000\n    0.0456    1.0544   -1.9374 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7952   -1.7026   -1.7706 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    0.6447   -0.8006   -4.1065 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    1.8316   -0.9435    4.4004 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    6.9949    1.1239   -3.9007 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n    1.9032   -1.0692   -1.6001 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8846   -1.0376   -0.1090 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.2176   -0.5035   -2.1949 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5585   -0.6223   -2.3126 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2670    0.1198    0.5688 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3480   -1.2638   -2.0859 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4856   -2.1660    0.6075 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1719    0.7242   -2.7939 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2506    0.1490    1.9633 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5313   -0.7541   -2.6203 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4691   -2.1369    2.0020 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3552    1.2340   -3.3284 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8515   -0.9793    2.6800 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.5350    0.4948   -3.2417 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9777   -2.1366   -1.8749 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5727    1.0177    0.0401 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3513   -2.2356   -1.6034 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1951   -3.0814    0.0991 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3077    1.3562   -2.8879 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5491    1.0585    2.4783 H   0  0  0  0  0  0  0  0  0  0  0  0\n    6.4431   -1.3411   -2.5451 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1584   -3.0244    2.5473 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.3449    2.2098   -3.8075 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  9  1  0  0  0  0\n  2  9  1  0  0  0  0\n  3  9  1  0  0  0  0\n  4 18  1  0  0  0  0\n  5 19  1  0  0  0  0\n  6  7  1  0  0  0  0\n  6  8  1  0  0  0  0\n  6  9  1  0  0  0  0\n  6 20  1  0  0  0  0\n  7 10  2  0  0  0  0\n  7 12  1  0  0  0  0\n  8 11  2  0  0  0  0\n  8 13  1  0  0  0  0\n 10 14  1  0  0  0  0\n 10 21  1  0  0  0  0\n 11 15  1  0  0  0  0\n 11 22  1  0  0  0  0\n 12 16  2  0  0  0  0\n 12 23  1  0  0  0  0\n 13 17  2  0  0  0  0\n 13 24  1  0  0  0  0\n 14 18  2  0  0  0  0\n 14 25  1  0  0  0  0\n 15 19  2  0  0  0  0\n 15 26  1  0  0  0  0\n 16 18  1  0  0  0  0\n 16 27  1  0  0  0  0\n 17 19  1  0  0  0  0\n 17 28  1  0  0  0  0\nM  END\n';
        var molecule = ChemDoodle.readMOL(molFile, 1);
        this.canvas.loadMolecule(molecule);

        this.canvas.specs.set3DRepresentation('Wireframe');
        
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
    bindings: [CanvasService, MoleculeService, CanvasSettings]//, LeftMenuComponent, RightMenuComponent, CanvasComponent, UploadComponent]
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