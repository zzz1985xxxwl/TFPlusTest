describe("Test Web Worker", () => {
    var testObj;
    beforeEach(function () {
        testObj = new testWorker();
        spyOn(testObj, "onmessage");
    });
    it("work should return 499500", (done) => {
        testObj.postMessage(1000).then(() => {
            expect(testObj.onmessage).toHaveBeenCalledWith(499500);
            done();
        });
    });
});