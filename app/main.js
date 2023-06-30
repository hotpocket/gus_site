define(function (require) {
    require(['knockout', './viewModel', 'domReady!'], function(ko, viewModel) {
        ko.applyBindings(new viewModel());
        console.log("in knockout main function");
    });
});





