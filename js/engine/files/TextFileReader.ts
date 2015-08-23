module Files {
    import Action = Callbacks.Action;

    export class TextFileReader {
        constructor(onCompleteCalback: FileCompleteCallback, onErrorCallback? : FileErrorCallback, onProgressCallback?: FileProgressCallback) {
            this.onCompleteCalback = onCompleteCalback;
            this.onErrorCalback = onErrorCallback;
            this.onProgressCallback = onProgressCallback;
        }

        private onCompleteCalback: FileCompleteCallback;
        private onErrorCalback: FileErrorCallback;
        private onProgressCallback: FileProgressCallback;

        public read(files: FileList): void {
            for (var i in files) {
                var fileReader = new FileReader();

                fileReader.onprogress = this.readProgress(files[i]);
                fileReader.onloadend = this.readComplete(files[i]);
                fileReader.onerror = this.readError(files[i]);

                fileReader.readAsText(files[i]);
            }
        }

        private readComplete(file : File): Action<ProgressEvent> {
            var self = this;
            return (ev: ProgressEvent) => {
                self.onCompleteCalback(ev, file);
            }
        }

        private readProgress(file: File): Action<ProgressEvent> {
            var self = this;
            return (ev: ProgressEvent) => {
                if (self.onProgressCallback) {
                    self.onProgressCallback(ev, file);
                }
            }
        }

        private readError(file: File): Action<ProgressEvent> {
            var self = this;
            return (ev: ProgressEvent) => {
                if (self.onErrorCalback) {
                    self.onErrorCalback(ev, file);
                }
            }
        }
    }
}