app.directive('toggleClass', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind({
                mousedown: function () {
                    $(this).addClass(attrs.toggleClass);
                },
                mouseup: function () {
                    $(this).removeClass(attrs.toggleClass);
                }
            });
        }
    };
});