describe('PollFactory tests', function () {
    var PollFactory;

    beforeEach(function () {
        module('app');
        inject(function (_PollFactory_) {
            PollFactory = _PollFactory_;
        });
    });

    it('poll service should be defined', function () {
        expect(PollFactory)
            .toBeDefined();
    });

});