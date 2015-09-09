module Chemistry.Structures {
    
    export class Molecule {
        public molecule: any;
        public name : string;

        constructor(molecule: any, name : string) {
            this.molecule = molecule;
            this.name = name;
        }

    }
} 