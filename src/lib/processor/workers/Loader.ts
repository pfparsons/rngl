/// <reference lib="webworker" />
import { EventLog } from "../../EventLog";
import { MESSAGE, ProcessState , Request, LoadBufferRequest, Response, LoadBufferUpdate, BufferTransfer, Instruction } from "../DispatchMessages"

declare var self: DedicatedWorkerGlobalScope;
const logger = new EventLog();

class Loader {

    private processId: number = -1;
    private msgSeq: number = 0;
    private buffer: ArrayBuffer;
    private uint8Buffer: Uint8Array;

    private bufferPosition: number = 0;
    private readonly length: number;
    private state = ProcessState.PENDING;
    private readonly PAUSE_WAIT_MS = 300

    constructor(processId: number, length: number) {
        this.processId = processId;
        this.length = length;
    }

    private sleep(durationMs: number) {
        return new Promise<void>(resolve => setTimeout(resolve, durationMs));
    }
 
    private async pause() {
        while (this.state == ProcessState.PAUSED) {
            await this.sleep(this.PAUSE_WAIT_MS);
            console.log(`worker ${this.processId} paused...`);
        }
    }

    private reportLoadProgres(){
        let progMsg: LoadBufferUpdate = {
            messageId: ++this.msgSeq,
            processId: this.processId,
            state: ProcessState.LOADING,
            loadedBytes: this.bufferPosition + 1,
            totalBytes: this.length
        }

        self.postMessage(progMsg);
    }

    transferBuffer() {
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

        reader.read()
        .then(this.read)


            console.log(`worker ${this.processId} reading...`)


            if (result.done || this.bufferPosition == this.length) {
                this.reportLoadProgres();
                reader.releaseLock();
                return;
            }

            return this.readNextChunk(reader);

        }

    }

    private read(result: ReadableStreamDefaultReadResult<Uint8Array>) {
            if (result.value && result.value.byteLength > 0) {
                for (let i = 0; i < result.value.byteLength; i++) {
                    this.uint8Buffer.set(result.value, this.bufferPosition);
                    this.bufferPosition += result.value.byteLength;
                }
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





