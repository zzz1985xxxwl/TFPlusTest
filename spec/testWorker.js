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

/**
 * test will run after callback
 * so please use done
 */
describe("Using callbacks", function () {
    var value = 1;
    beforeEach(function (done) {
        setTimeout(function () {
            value = 0;
            done();
        }, 100);
    });

    it("should support async execution of test preparation and expectations", function (done) {
        expect(value).toBe(0);
        done();
    });
});

/**
 * test will run after promise return
 * so please use return
 */
describe("Using promises", function () {
    var value = 1;
    beforeEach(function () {
        return soon().then(function () {
            value = 0;
        });
    });

    it("should support async execution of test preparation and expectations", function () {
        return soon().then(function () {
            expect(value).toBe(0);
        });
    });
});

// /**
//  * async/await
//  */
// describe("Using async/await", function () {
//     var value = 1;
//     beforeEach(async () => {
//         await soon();
//         value = 0;
//     });

//     it("should support async execution of test preparation and expectations", function () {
//         await soon();
//         expect(value).toBe(0);
//     });
// });

/**
 * test custom argument matcher
 */
describe("Custom argument matcher", function () {
    function myChecker(someState) {
        return {
            asymmetricMatch: function (compareTo) {
                return compareTo.myState == someState;
            },
            jasmineToString: function () {
                return "<myChecker:" + someState + ">";
            }
        };
    }

    it("should only compare myState property", function () {
        expect({
            myState: "things"
        }).toEqual(myChecker("things"));
    });
});

function soon() {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve();
        }, 100);
    });
}