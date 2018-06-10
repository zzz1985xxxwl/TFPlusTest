describe("StopPool Data Model", function () {
    var testObj = {
        func: function () { },
        p1: 1,
        p2: 2
    };

    beforeAll(function () {

    });

    beforeEach(function () {
        testObj = { a: 1 };
        // spy part
        spyOn(testObj, "func");
        spyOnProperty(testObj, "p1");
    });

    afterAll(function () {

    });

    afterEach(function () {

    });

    it("Test init Project", function () {
        expect(true).toEqual(true);
        expect(testObj.p1).toEqual(1);
    });
});