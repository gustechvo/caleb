'use strict';

angular.module('caleb').controller('MainCtrl', function ($scope,$rootScope, LoadData, $http,$sce) {

  console.log("Main Controller");
  if(!$rootScope.postData){
    LoadData.fetch().then(
      function(result) {
        $rootScope.result = result;
        $rootScope.projects = result.projects;
        $rootScope.portfolioTypes = result.portfolio_types;
        console.log("postData",result);
        $rootScope.$broadcast('dataFetched');
        
        //Load Instagram Feed
        var feed = new Instafeed({
            get: 'user',
            userId: 230016769,
            accessToken: '230016769.4c98199.72648f2e9eff4a10b2fd717041bf1242',
            template: '<a href="{{link}}"><img class="instaimage" src="{{image}}" /></a>',
            sortBy: 'most-liked',
            limit: 60,
            resolution: "low_resolution",
            filter: function(image) {
              return image.tags.indexOf('site') >= 0;
            }
          
        });
        feed.run();

        //Load Dribble Feed
        $.jribbble.setToken('a96d5c9e21930f4ab63da82a48f0705df031f7193c72e1d4fc8ed1270a090906');

        $.jribbble.users('calebheisey').shots({per_page: 2}).then(function(shots) {
          var html = [];
          
          shots.forEach(function(shot) {
            html.push('<a href="' + shot.html_url + '"><img class="dribbbleimage" src="' + shot.images.normal + '" /></a>');
          });
          
          $('.shots').html(html.join(''));
        });




    });
  }
  else{
    console.error("Error retrieving data.");
  };

  $rootScope.pf = pf();
  var resizeId;
  $(window).on('resize', function (){
    clearTimeout(resizeId);
    resizeId = setTimeout(function(){
      $rootScope.pf = pf();
      $rootScope.$apply();
    }, 500);
  });

  //Active States on tags
  $scope.select= function(item) {
      $('article.project').removeClass('fadeIn');
      $('.tag a').removeClass('active');
      $scope.selected = item;
      $('article.project').addClass('fadeIn');
  };

  $scope.isActive = function(item) {
    return $scope.selected === item;
  };

  $rootScope.randomOffset = function(){
    return Math.floor(Math.random() * 3000);
  }

  /*$scope.slideshow.after = function(){
        $scope.slideshow.log.push({ id: ++logId, message: 'after' });
      }*/

})


