requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts/vendor',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        modules: '../modules',
        jquery : 'https://code.jquery.com/jquery',
        bootstrap : '../../../js/bootstrap.min'
    }
});

// Start the main app logic.
requirejs(['jquery',  'knockout', 'modules/root', 'modules/app','modules/logs', 'modules/comments', 'modules/wiki'],
    function   ($,  ko, root, app, logs, comments, wiki) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
    });