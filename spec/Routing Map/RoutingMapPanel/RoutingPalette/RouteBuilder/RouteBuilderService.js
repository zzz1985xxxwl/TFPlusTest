xdescribe("Route Builder Service ", function () {
    var routeBuilderService;
    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        routeBuilderService = TF.RoutingMap.RoutingPalette.routeBuilderService;
    });

    it("Test Http Get", function () {
        spyOn(tf.promiseAjax, "get").and.callFake(function () {
            return Promise.resolve();
        });
        var url = "test";
        return routeBuilderService.httpGet(url).then(function () {
            expect(tf.promiseAjax.get).toHaveBeenCalledWith(url, jasmine.objectContaining({
                headers: {
                    "Token": "",
                    "Transfinder": "http://devmulti15.hosted.transfinder.com/routefinderApi/v1/",
                    "Time-Zone": -4,
                    "Accept-Language": "en-US"
                }
            }));
        });
    });

    // it("Test get trips", function () {
    //     return routeBuilderService.initialize().then(function () {
    //         expect(routeBuilderService.token).not.toEqual("");
    //         expect(routeBuilderService.routeBuilderUserID).toBeGreaterThan(0);
    //     }).then(function () {
    //         return routeBuilderService.getAllTrips().then(function (trips) {
    //             expect(trips.length).toBeGreaterThan(0);
    //         });
    //     }).then(function () {
    //         return routeBuilderService.getGPSEventByTripId(5656).then(function (events) {
    //             expect(events.length).toBeGreaterThan(0);
    //         });
    //     });
    // });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
