/// <reference path="../typings/angular2/angular2.d.ts" />

import {Component, Inject, forwardRef, View, NgFor, bootstrap} from 'angular2/angular2';
import Molecule = Chemistry.Structures.Molecule;
import {MyService} from '';
declare var ChemDoodle: any;
declare var transformBallAndStick: any;
/// <reference path="engine/files/TextFileReader.ts" />
/**/

class MoleculeService {
    public molecules: List<Chemistry.Structures.Molecule> = [];

    add(molecule: Chemistry.Structures.Molecule): void {
        this.molecules.push(molecule);
    }

}


// Annotation section
@Component({
    selector: 'my-app',
    bindings: [MoleculeService]
})
@View({
        template: '<canvas id="mainCanvas"></canvas>' +
            '<ul><li *ng-for="#molecule of moleculeService.molecules" (click)="loadMolecule(molecule)">{{molecule.name}}</li></ul>',
        directives: [NgFor]
})
// Component controller
class MyAppComponent {

    private moleculeService : MoleculeService;
    constructor( @Inject(forwardRef(() => MoleculeService)) moleculeService: MoleculeService) {
        this.moleculeService = moleculeService;
        transformBallAndStick = new ChemDoodle.TransformCanvas3D('mainCanvas', 896, 667);
        transformBallAndStick.specs.set3DRepresentation('Ball and Stick');
        transformBallAndStick.specs.backgroundColor = 'black';
        transformBallAndStick.specs.deduceResidueBonds = true;
        //transformBallAndStick.specs.atoms_displayLabels_3D = true;
        transformBallAndStick.specs.macro_displayAtoms = true;
        //transformBallAndStick.specs.macro_displayBonds = true;
        //transformBallAndStick.specs.proteins_displayPipePlank = true;
        //transformBallAndStick.specs.proteins_ribbonCartoonize = true;
        transformBallAndStick.specs.proteins_displayRibbon = false;
        //transformBallAndStick.specs.proteins_displayBackbone = true;
        //this.canvas = ChemDoodle.TransformCanvas3D("main", 250, 250);
        var self = this;
        var fileTextReader = new Files.TextFileReader(
            (e: any, file: File) => { // complete
                var moleculeData = ChemDoodle.readPDB(e.target.result, 1);
                var molecule = new Chemistry.Structures.Molecule(moleculeData, file.name);
                this.moleculeService.add(molecule);
                this.loadMolecule(molecule);
            },
            (e: ProgressEvent, file: File) => { // progress

            });

        var handleFileSelect = function (evt) {
            var files = evt.target.files; // FileList object
            fileTextReader.read(files);

        }
        window.document.getElementById('files').addEventListener('change', handleFileSelect, false);

        
    }

    loadMolecule(molecule: Molecule): void {
        transformBallAndStick.loadMolecule(molecule.molecule);
    }
}


bootstrap(MyAppComponent);