/// <reference lib="webworker" />
import { EventLog } from "../../EventLog";
import type { Request, Response, LoadBufferRequest, LoadBufferUpdate } from "../DispatchMessages";
import { Instruction, ProcessState } from "../DispatchMessages";
import Loader from "web-worker:./Loader"

declare var self: DedicatedWorkerGlobalScope;
const loader = new Loader();

async function dispatchLoadRequest(loadRequest: LoadBufferRequest) {
    loader.postMessage(loadRequest);
}

function handleWorkerResponse(message: MessageEvent<Response>): void {
    let response = message.data;
    self.postMessage(response);
}

loader.addEventListener("message", handleWorkerResponse)

function handleRequest(event: MessageEvent<Request>): void {
    let request = event.data;

    switch (request.instruction) {
        case Instruction.LOAD:
            loader.postMessage(request);
            break;
    }
}

self.addEventListener("messge", handleRequest);