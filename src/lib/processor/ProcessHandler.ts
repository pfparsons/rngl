import type { FileLoadEvent, FileLoadState } from "../FileLoadd";
import FileWorker from "web-worker:./FileWorker"
import type { FileWorkerMessage } from "../WorkerMessagee";

export class ProcessHandler {

    private state: FileLoadState;
    private fileWorker = new FileWorker();
    
    constructor(public readonly file: File) {
        this.state = "NOT_STARTED";
    }

    start() {
        this.state = "LOADING"; // move to wkr msg handler
    }

    pause() {
        this.state = "PAUSED"; // move to worker message handler
    }

    onUpdate()

    private handleWorkerEvent(event: MessageEvent<FileWorkerMessage>): void {
    const message = event.data;
    switch (message.type) {
      case "start":
        //setText(`Loading...`);
        textarea.value = "loading..."
        break;
      case "progress":
        //setText(`Loaded: ${message.progress}%`);
        textarea.value = `Loaded: ${message.progress}%`;
        break;
      case "done":
        console.log(`Viewer recieved done: ${message.buffer.byteLength} bytes`);
        let sharedBuffer = new Uint8Array(message.buffer);
        let len = sharedBuffer.byteLength;
        let textBuffer = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            textBuffer[i] = sharedBuffer[i];
        }
        let text = decoder.decode(textBuffer);
        setText(text);
        break;
      default:
        break;
    }
  }


}