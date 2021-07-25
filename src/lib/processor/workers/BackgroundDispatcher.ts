/// <reference lib="webworker" />
import { EventLog } from "../../EventLog";
import type { Request, LoadBufferRequest } from "../DispatchMessages";
import { Instruction } from "../DispatchMessages";
import Loader from "web-worker:./Loader"

class BackgroundDispatcher {

    

    constructor() {

    }

    handleRequest(event: MessageEvent<Request> ): void {
        let request = event.data;

        switch (request.instruction ){
            case Instruction.LOAD:
                request = request as LoadBufferRequest;
                break;
        }
    }

    async dispatchLoadRequest(loadRequest: LoadBufferRequest) {

    }

}