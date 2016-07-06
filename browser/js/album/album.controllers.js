'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

    // add album length to scope



  AlbumFactory.fetchById(1)
  .then(function (album){
    $scope.album = album
    return StatsFactory.totalTime(album)
  })
  .then(function(totalTime){
      var mins = Math.floor(totalTime/60);
      var secs = Math.floor(totalTime)%60;
      if (secs < 10) secs = '0'+secs;
      var time = mins+":"+secs;
      $scope.album.totalTime = time;
    })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // // main toggle
  // $scope.toggle = function (song) {
  //   if ($scope.playing && song === $scope.currentSong) {
  //     $rootScope.$broadcast('pause');
  //   } else $rootScope.$broadcast('play', song);
  // };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  function pause () {
    PlayerFactory.pause()
  }
  function play (event, song) {
    PlayerFactory.play()
  };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };


});

juke.controller('AllAlbumsCtrl', function ($scope, $log, AlbumFactory) {

  AlbumFactory.fetchAll()
  .then(function(albums){
    albums.forEach(function(album){
      album.imageUrl = '/api/albums/' + album.id + '/image'
    })
    $scope.albums = albums;
  })
  .catch($log.error);

});


