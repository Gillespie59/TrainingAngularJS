(function () {
    "use strict";

    /** Home view controller */
    angular.module('app')
        .controller('HomeController', ['$scope','newsService', function ($scope,newsService) {

            $scope.message = "Welcome in our shop!!!";


            /** Gets all the news. */
            $scope.lstNews = newsService.query();

            /** Gets the news with id = 1. */
            $scope.currentNews = newsService.get({ id: 1 });
            $scope.newsOfTheDay = newsService.random();

            /** Creates a new news. */
            $scope.addedNews = new newsService;

            /** Increments the number of likes of a news, and saves the changes. */
            $scope.addLike = function(news) {
                news.$like();
            };

            /** Deletes a news. */
            $scope.deleteNews = function(news) {
                news.$delete();
                $scope.lstNews.splice($scope.lstNews.indexOf(news),1);
            };

            /** Adds a news. */
            $scope.addNews = function() {
                $scope.addedNews.$save();

                // We refresh the list with the added news.
                $scope.lstNews = newsService.query();
            };
        }]);
}());