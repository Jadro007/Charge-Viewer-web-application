declare module Callbacks {
    interface Action<T> {
        (item: T): void;
    }
    interface Action2<T, T2> extends Action<T> {
        (item: T, item2: T2): void;
    }
}
declare module Callbacks {
}
declare module Events {
    interface EventInterface {
    }
}
declare module Files {
    interface FileCompleteCallback {
        (item: FileEvent, item2: File): void;
    }
}
declare module Files {
    interface FileErrorCallback {
        (item: FileEvent, item2: File): void;
    }
}
declare module Files {
    class FileEvent implements Events.EventInterface {
    }
}
declare module Files {
    interface FileProgressCallback {
        (item: FileEvent, item2: File): void;
    }
}
declare module Files {
    class TextFileReader {
        constructor(onCompleteCalback: FileCompleteCallback, onErrorCallback?: FileErrorCallback, onProgressCallback?: FileProgressCallback);
        private onCompleteCalback;
        private onErrorCalback;
        private onProgressCallback;
        read(files: FileList): void;
        private readComplete(file);
        private readProgress(file);
        private readError(file);
    }
}
declare var ChemDoodle: any;
declare class CanvasService {
    private canvas;
    constructor();
    renderMolecule(molecule: Chemistry.Structures.Molecule): void;
    getCanvas(): any;
}
declare class MoleculeRender {
    render(molecule: Chemistry.Structures.Molecule): void;
}
declare class MoleculeService {
    molecules: List<Chemistry.Structures.Molecule>;
    private willBeAdded;
    private moleculeRender;
    constructor();
    informAboutAdding(): void;
    add(molecule: Chemistry.Structures.Molecule): void;
    renderMolecule(molecule: Chemistry.Structures.Molecule): void;
}
declare module Chemistry.Structures {
    class Molecule {
        molecule: any;
        name: string;
        constructor(molecule: any, name: string);
    }
}
