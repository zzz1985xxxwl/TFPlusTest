function testWorker() {
    this.myWorker = new Worker("src/worker.js");
}

testWorker.prototype.postMessage = function (num) {
    return new Promise((resolve, reject) => {
        this.myWorker.postMessage(num);
        this.myWorker.onmessage = (e) => {
            this.onmessage(e.data);
            resolve();
        };
        this.myWorker.onerror = (e) => {
            reject(e);
        };
    });
};

testWorker.prototype.onmessage = function (e) {
    console.log("finish:" + e.data);
};