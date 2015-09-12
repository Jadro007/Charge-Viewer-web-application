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
declare class CanvasSettings {
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
    setWireframe(val: boolean): void;
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
declare class MoleculeRender {
    render(molecule: Chemistry.Structures.Molecule): void;
}
declare module Chemistry.Structures {
    class Molecule {
        molecule: any;
        name: string;
        constructor(molecule: any, name: string);
    }
}
