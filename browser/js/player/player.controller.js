'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {


  // state
  $scope.getCurrentSong = function(){
    return PlayerFactory.getCurrentSong();
  }

  $scope.isPlaying = function(){
    return PlayerFactory.isPlaying();
  }

  $scope.getProgress = function(){
    return PlayerFactory.getProgress()*100;
  }


  // main toggle
  $scope.toggle = function () {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.resume();
  };

  $scope.prev = function(){
    PlayerFactory.previous();
  }

  $scope.next = function(){
    PlayerFactory.next();    
  }


  function seek (decimal) {
    PlayerFactory.audio.currentTime = PlayerFactory.audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
