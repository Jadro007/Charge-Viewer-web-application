class CanvasSettings {
    
    private wireframe: boolean;

    setWireframe(val: boolean): void {
        this.wireframe = val;
        this.change();
    }

    getWireframe(): boolean {
        return this.wireframe;
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