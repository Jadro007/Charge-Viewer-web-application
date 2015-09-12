class CanvasSettings {
    
    // primary structure
    private _wireframe: boolean;
    private _sticks : boolean;
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

    setWireframe(val: boolean) {
        this.resetPrimaryStructure();
        this._wireframe = val;
        this.change();
    }

    getWireframe(): boolean {
        return this._wireframe;
    }

    setSticks(val: boolean) {
        this.resetPrimaryStructure();
        this._sticks = val;
        this.change();
    }

    getSticks(): boolean {
        return this._sticks;
    }
    
    setBallsAndSticks(val: boolean) {
        this.resetPrimaryStructure();
        this._ballsAndSticks = val;
        this.change();
    }

    getBallsAndSticks(): boolean {
        return this._ballsAndSticks;
    }
    
    setVanDerWaals(val: boolean) {
        this.resetPrimaryStructure();
        this._vanDerWaals = val;
        this.change();
    }

    getVanDerWaals(): boolean {
        return this._vanDerWaals;
    }

    setSurface(val: boolean) {
        this.resetPrimaryStructure();
        this._surface = val;
        this.change();
    }

    getSurface(): boolean {
        return this._surface;
    }

    setCharge(val: boolean) {
        this.resetColor();
        this._charge= val;
        this.change();
    }

    getCharge(): boolean {
        return this._charge;
    }

    setAtom(val: boolean) {
        this.resetColor();
        this._atom= val;
        this.change();
    }

    getAtom(): boolean {
        return this._atom;
    }

    setAlphaTrace(val: boolean) {
        this.resetColor();
        this._alphaTrace = val;
        this.change();
    }

    getAlphaTrace(): boolean {
        return this._alphaTrace;
    }


    setCartoon(val: boolean) {
        this.resetColor();
        this._cartoon = val;
        this.change();
    }

    getCartoon(): boolean {
        return this._cartoon;
    }

    private changeCallbacks = [];

    change(): void {
        for (var i in this.changeCallbacks) {
            if (this.changeCallbacks.hasOwnProperty(i)) {
                this.changeCallbacks[i].call();
            }
        }
    }

    listen(callback : any) : void {
        this.changeCallbacks.push(callback);
    }


}