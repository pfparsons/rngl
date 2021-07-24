import { FileHandler } from "./ProcessHandlerler";

export type FileSetEventType = 
"add";

export type FileSetEventHandler = (eventType: FileSetEventType, handler: FileHandler) => void;

export class FileSet {

    private readonly fileHandlers = new Map<string,FileHandler>();

    private readonly listeners = new Array<FileSetEventHandler>();


    addFiles(files: FileList) {
        if(files && files.length > 0) {
            for(let file of files) {
                let filename = file.name;
                let fileHandler = new FileHandler(file);
                this.fileHandlers.set(filename, fileHandler);
                this.updateListeners("add" ,fileHandler);
            }
        }
    }

    private updateListeners(eventType: FileSetEventType, fileHandler: FileHandler) {
        for(let eventHandler of this.listeners ) {
            eventHandler(eventType, fileHandler);
        }
    }

    addEventHandler(eventType: FileSetEventType, eventHandler: FileSetEventHandler) {
        this.listeners.push()
    }
    
}