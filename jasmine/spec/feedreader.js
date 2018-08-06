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
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         * 
         * It does this by using a for loop to go through each element
         * in the allFeeds array and make sure that a url is defined
         * and the url is not an empty string.
         */
        it('has a url and url is not empty', () => {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         * 
         * It does this by using a for loop to go through each element
         * in the allFeeds array and make sure that a name is defined
         * and the name is not an empty string.
         */
        it('has a name and name is not empty', () => {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('The menu', () => {
        /* This test ensures that the menu element is
         * hidden by default.
         * 
         * This test is completed by asking what the default 
         * state of the menu is without any interaction on the menu button.
         */
        const body = $('body');

        it('is hidden by default', () => {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* This test that ensures the menu changes
          * visibility when the menu icon is clicked. 
          * 
          * It tests this by asking if the menu is hidden after the menu icon is clicked.
          *  And is the menu hidden  after it the menu icon is clicked again.
          */
        it('changes visibility when the menu icon is clicked', () => {
            const menuButton = $('i.icon-list');
            menuButton.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuButton.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries',  () => {
        /* Initial Entries test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * 
         * It tests to find out if first there are any elements 
         * in the div with the class feed.
         * Then to make sure that at least a single element with the 
         * class entry exists within the feed.
         * Makes use of the beforeEach function and done for the feeds asynchronous nature.
         */
        beforeEach( (done) => {
            loadFeed(0, () => {
                done();
            });
        });

        it('should have at least a single .entry element in the .feed container', (done) => {
            const feed = $('.feed');
            expect(feed.length).toBeGreaterThan(0);
            expect(feed.find('.entry')).toBeDefined();
            done();
        });

        
    });

    describe('New Feed Selection', () => {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * 
         * It does this by comparing a previous feed entry with a 
         * current entry after changing feeds using the loadFeed function
         * and makes use of the beforeEach function and done for the feeds asynchronous nature.
         * Specifically the strings of entries are compared.
         */
        const feed = $('.feed');
        const prevFeed = [];
        const curFeed = [];
        

        beforeEach( (done) => {
            loadFeed(0);
            let entry = feed.find('.entry');
            prevFeed.push(entry[0]);

            loadFeed( 1, () => {
                done();
            });
        });

        it('should change content', (done) => {
            let entry = feed.find('.entry');
            curFeed.push(entry[0]);
            expect(curFeed[0].innerText).not.toEqual(prevFeed[0].innerText);
            done();
        });
    });

    describe('App loads default', () => {
        /* App loads default test is to ensure that once all testing
        * is complete the initial page is loaded 
        * and is in fact the page that has been loaded.
        * 
        * This test makes sure that the current id of allFeeds is 0 
        * after loadFeeds(0) has been run already.
        */
        it('should be on default page after all tests are run', () => {
            loadFeed(0);
            expect(allFeeds[0].id).toBe(0);
        });
    });
}());
