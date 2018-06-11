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
        expect().nothing();
        // https://jasmine.github.io/api/3.0/matchers.html
        // expect(thing).toBe(realThing);
        // expect(number).toBeCloseTo(42.2, 3);
        // expect(result).toBeDefined();
        // expect(result).toBeFalsy();
        // expect(result).toBeGreaterThan(3);
        // expect(result).toBeGreaterThanOrEqual(25);
        // expect(result).toBeLessThan(0);
        // expect(result).toBeUndefined();
        // expect("my string").toMatch(/string$/);
        // expect(array).toContain(anElement);
        // expect(mySpy).toHaveBeenCalled();
        // expect(mySpy).not.toHaveBeenCalled();
        // expect(testObj.p1).toEqual(1);
        // expect(mySpy).toHaveBeenCalledBefore(otherSpy);
        // expect(mySpy).toHaveBeenCalledTimes(3);
        // expect(mySpy).toHaveBeenCalledWith('foo', 'bar', 2);
        // expect(function () { return 'other'; }).toThrowError();
    });
});