describe("PlayBackControl", function () {
    var viewModel = {
        dataModel: {
            trips: []
        }
    };

    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

    });

    it("Test init Project", function () {
        var playBackControl = new TF.RoutingMap.RoutingPalette.PlayBackControl(viewModel);
        spyOn(playBackControl, "initLayer");
        spyOn(playBackControl, "initTripData");
        spyOn(playBackControl, "subscribeEvent");
        playBackControl.open();
        expect(playBackControl.initLayer).toHaveBeenCalled();
    });

    it("Test tick speed 60, it should go 1 minute at 1 second", function (done) {
        var playBackControl = new TF.RoutingMap.RoutingPalette.PlayBackControl(viewModel);
        spyOn(playBackControl, "playingChange");
        playBackControl.obPlaySpeed(60);
        playBackControl.beforeTick();
        playBackControl.obTargetTimeAsSecond(0);
        playBackControl.obTimeSliderMax(1000000);
        playBackControl.obPlaying(true);
        playBackControl.tick();
        setTimeout(function () {
            expect(Math.abs(playBackControl.obTargetTimeAsSecond() - 60)).toBeLessThan(3);
            playBackControl.obPlaying(false);
            done();
        }, 1000);
    });

    it("Test tick speed 1,it should go 5 seconds in 5 seconds", function (done) {
        var playBackControl = new TF.RoutingMap.RoutingPalette.PlayBackControl(viewModel);
        spyOn(playBackControl, "playingChange");
        playBackControl.obPlaySpeed(1);
        playBackControl.beforeTick();
        playBackControl.obTargetTimeAsSecond(0);
        playBackControl.obTimeSliderMax(1000000);
        playBackControl.obPlaying(true);
        playBackControl.tick();
        setTimeout(function () {
            expect(playBackControl.obTargetTimeAsSecond()).toEqual(5);
            playBackControl.obPlaying(false);
            done();
        }, 5030);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});