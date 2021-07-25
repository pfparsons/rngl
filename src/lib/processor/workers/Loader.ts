/// <reference lib="webworker" />
import { EventLog } from "../../EventLog";
import { MESSAGE, ProcessState , Request, LoadBufferRequest, Response, LoadBufferUpdate, BufferTransfer, Instruction } from "../DispatchMessages"

declare var self: DedicatedWorkerGlobalScope;
const logger = new EventLog();

    let msgSeq: number = 0;
    let buffer: ArrayBuffer;
    let uint8Buffer: Uint8Array;

    let bufferPosition: number = 0;
    let length: number = 0;
    let state = ProcessState.PENDING;


    function reportLoadProgres(): void {
        let progMsg: LoadBufferUpdate = {
            messageId: ++this.msgSeq,
            processId: this.processId,
            state: ProcessState.LOADING,
            loadedBytes: this.bufferPosition + 1,
            totalBytes: this.length
        }

        self.postMessage(progMsg);
    }

    function transferBuffer(): void {
        let bufferMsg: BufferTransfer = {
            messageId: ++this.msgSeq,
            processId: this.processId,
            state: ProcessState.DONE,
            buffer: this.buffer
        }
        self.postMessage(bufferMsg,[this.buffer]);
    }

    async readIntoBuffer(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<void> {
        this.buffer = new ArrayBuffer(this.length);
        this.uint8Buffer = new Uint8Array(this.buffer);
        this.bufferPosition = 0;
        await this.readAll(reader);
    }

    private async readAll(reader: ReadableStreamDefaultReader<Uint8Array>) {
        while (this.state != ProcessState.DONE && this.state != ProcessState.ERROR) {
        
        reader.read().then(this.read)


            console.log(`worker ${this.processId} reading...`)




        }
        reader.releaseLock();


    }

    private read(result: ReadableStreamDefaultReadResult<Uint8Array>) {
            if (result.value && result.value.byteLength > 0) {
                for (let i = 0; i < result.value.byteLength; i++) {
                    this.uint8Buffer.set(result.value, this.bufferPosition);
                    this.bufferPosition += result.value.byteLength;
                }
            }
            if (result.done || this.bufferPosition == this.length) {
                this.reportLoadProgres();
            }
    }


}

self.addEventListener(MESSAGE, (event: MessageEvent<Request>): void => {
    const message = event.data;

    switch (message.instruction) {
        case Instruction.LOAD:
            const loadRequest = message as LoadBufferRequest;
            const loader = new Loader(loadRequest.processId, loadRequest.length);
            loader.readIntoBuffer(loadRequest.reader);
            break;
        case Instruction.PAUSE:

    }

    console.log(`ReaderToBuffer worker received instruction: ${message.instruction} `);
});





