'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

    // add album length to scope

  $scope.show = false;

  $scope.isPlaying = function() {return PlayerFactory.isPlaying()}
  $scope.getCurrentSong = function() {return PlayerFactory.getCurrentSong()}

  $scope.$on('viewThings', function(event, viewObj){
    if (viewObj.name !== 'oneAlbum'){
      $scope.show = false;
      return
    }
    AlbumFactory.fetchById(viewObj.id)
    .then(function (album){
      $scope.album = album
      $scope.show = true;
      return StatsFactory.totalTime(album)
    })
    .then(function(totalTime){
        var mins = Math.floor(totalTime/60);
        var secs = Math.floor(totalTime)%60;
        if (secs < 10) secs = '0'+secs;
        var time = mins+":"+secs;
        $scope.album.totalTime = time;
      })
    .catch($log.error);

  })
 // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
        console.log('or in here', song)

    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause()
    } else if (PlayerFactory.getCurrentSong() === song) PlayerFactory.resume()
    else PlayerFactory.start(song, $scope.album.songs);
  };

});

juke.controller('AllAlbumsCtrl', function ($rootScope, $scope, $log, AlbumFactory) {

  $scope.show = false;

  AlbumFactory.fetchAll()
  .then(function(albums){
    albums.forEach(function(album){
      album.imageUrl = '/api/albums/' + album.id + '/image'
    })
    $scope.albums = albums;
  })
  .catch($log.error);

  $scope.$on('viewThings', function(event, viewObj){
    if (viewObj.name !== 'allAlbums'){

      $scope.show = false;
      return

    }
    $scope.show = !$scope.show;
  })

  $scope.goToAlbum = function(id){
    console.log(id);
    $scope.show = false;
    $rootScope.$broadcast('viewThings', {id: id, name: 'oneAlbum'});
  }



});


