describe('pollDirective tests', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('app'));

    beforeEach(module('tplmod'));

    beforeEach(function () {
        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('should load poll with id 1', function () {
        var element = $compile("<poll poll-id='1'></poll>")($rootScope);
        // $rootScope.$digest();
        // expect(element.html()).toContain('sd');
    });
});