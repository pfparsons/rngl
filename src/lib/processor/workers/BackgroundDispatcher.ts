/// <reference lib="webworker" />
import { EventLog } from "../../EventLog";

class BackgroundDispatcher {
    constructor() {

    }

    handleRequest(event: MessageEvent<Request> ): void {
        const message = event.data;

        switch (message.type)
    }

}