class MoleculeService {
    public molecules: List<Chemistry.Structures.Molecule> = [];

    private willBeAdded = 0;

    private moleculeRender: CanvasService;

    constructor(){//moleculeRender: CanvasService) {
        this.moleculeRender = new CanvasService(); // todo: use DI
    }

    informAboutAdding() : void {
        this.willBeAdded++;
    }

    add(molecule: Chemistry.Structures.Molecule): void {
        this.willBeAdded--;
        if (this.willBeAdded === 0) {
            this.moleculeRender.renderMolecule(molecule);
        }
        this.molecules.push(molecule);
    }

    renderMolecule(molecule: Chemistry.Structures.Molecule) { // todo: pass CanvasService to LeftMenuComponent and remove this method
        this.moleculeRender.renderMolecule(molecule);
    }

}