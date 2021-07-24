export const MESSAGE = "message";

export enum Instruction {
    "LOAD",
    "PAUSE",
    "CANCEL"
}

export enum ProcessState {
    "PENDING",
    "LOADING",
    "PAUSED",
    "DONE",
    "ERROR"
}

interface BaseMessage {
    messageId: number,
    processId: number,
}

export interface Request extends BaseMessage{
    instruction: Instruction
}

export interface Response extends BaseMessage {
    state: ProcessState
}

export interface LoadBufferRequest extends Request {
    reader: ReadableStreamDefaultReader,
    length: number
}

export interface LoadBufferUpdate extends Response {
    loadedBytes: number,
    totalBytes: number;
}

export interface BufferTransfer extends Response {
    buffer: ArrayBuffer
}

