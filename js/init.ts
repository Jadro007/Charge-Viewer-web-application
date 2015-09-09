/// <reference path="../typings/angular2/angular2.d.ts" />
import Molecule = Chemistry.Structures.Molecule;

import {Component, Inject, bootstrap, forwardRef, View, NgFor} from 'angular2/angular2';
declare var ChemDoodle: any;

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

    constructor( @Inject(MoleculeService) moleculeService: MoleculeService) {
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

    constructor(){

    }
}


@Component({
    selector: 'leftMenuComponent'
})
@View({
    templateUrl: 'js/UI/Components/AppComponent/LeftMenuComponent/leftMenuComponent.html',
    directives: [UploadComponent, NgFor] 
})
export class LeftMenuComponent {

    private moleculeService: MoleculeService;

    constructor( @Inject(MoleculeService) moleculeService: MoleculeService) {
        this.moleculeService = moleculeService;
    }
}

@Component({
    selector: 'appComponent',
    bindings: [CanvasService, MoleculeService]//, LeftMenuComponent, RightMenuComponent, CanvasComponent, UploadComponent]
})
@View({
        templateUrl: 'js/UI/Components/AppComponent/appComponent.html',
        directives: [LeftMenuComponent, CanvasComponent, RightMenuComponent]
})
// Component controller
export class AppComponent {
    //  private canvasComponent : CanvasComponent;
    constructor(
       
    ) {
        var self = this;

    }

    //loadMolecule(molecule: Molecule): void {
    //    BallAndStick1.loadMolecule(molecule.molecule);
    //}
}

bootstrap(AppComponent);