declare var ChemDoodle: any;
class CanvasService {
    private canvas : any;
    constructor() {
        var transformBallAndStick = new ChemDoodle.TransformCanvas3D('mainCanvas', 896, 667);
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
        this.canvas = transformBallAndStick;
    }

    renderMolecule(molecule: Chemistry.Structures.Molecule) {
        this.canvas.loadMolecule(molecule.molecule);
    }

    getCanvas() : any {
        return this.canvas;
    }
}