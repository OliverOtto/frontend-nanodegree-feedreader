/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                //defined
                expect(allFeeds[i].url).toBeDefined();
                //not empty
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* A Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                //defined
                expect(allFeeds[i].name).toBeDefined();
                //not empty
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /*test suite named "The menu" */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("is hidden by default", function() {

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Atest that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        // clicked once should be visible
        it('is displayed when clicked', function() {
            $('.menu-icon-link').trigger('click');

            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
        // clicked again - should be hidden
        it('is hidden when clicked again', function() {
            $('.menu-icon-link').trigger('click');

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         *
         *Asynchronous handling provided - done()
         */
         //Asynchronous setup
         beforeEach(function(done) {
            loadFeed(0, done);
        });
        //check - after load at least one feed present
        it('are present - at least as single .entry element in the feed container', function(done) {
            var feeds = $('.feed').children().length;
            expect(feeds).toBeGreaterThan(0);
            done();
        });
    });


    /*  test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         //test setUp for asynchronous handling watch done()
        var oldFeedTitle;
        beforeEach(function(done) {
            oldFeedTitle = $('h2').text();
            loadFeed(1, done);
        });
        it('actually changes content', function(done) {
            var newFeedTitle = $('h2').text();
            //check defined
            expect(newFeedTitle).toBeDefined();
            //not empty
            expect(newFeedTitle.length).toBeGreaterThan(0);
            // not the same as old title
            expect(newFeedTitle).not.toBe(oldFeedTitle);
            done();
        });
        afterEach(function(done) {
            loadFeed(0, done);
        });;
    });
}());
