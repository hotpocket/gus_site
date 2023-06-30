// For any third party dependencies, like jQuery, place them in the lib folder.

// paths config is relative to the baseUrl
requirejs.config({  //  www/js/app/lib/app.js
    baseUrl: 'lib',
    paths: {
        app: '../app'
    }
});

// app: 'app/path' in requirejs config corresponds to the app in 'app/main' below
requirejs(['app/main']);