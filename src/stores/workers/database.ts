import { parentPort, workerData } from "node:worker_threads";

(async () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage(workerData);
})();
