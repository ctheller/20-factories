juke.controller('AllArtistsCtrl', function ($rootScope, $scope, $log, ArtistFactory) {

  $scope.show = false;

  ArtistFactory.fetchAll()
  .then(function(artists){
    $scope.artists = artists;
  })
  .catch($log.error);

  $scope.$on('viewThings', function(event, viewObj){
    if (viewObj.name !== 'allArtists'){

      $scope.show = false;
      return

    }
    $scope.show = !$scope.show;
  })

  $scope.goToArtist = function(id){
    console.log(id);
    $scope.show = false;
    $rootScope.$broadcast('viewThings', {id: id, name: 'oneArtist'});
  }

});


juke.controller('ArtistCtrl', function ($rootScope, $scope, $log, ArtistFactory, PlayerFactory) {

  $scope.show = false;
  $scope.showTable = false;
  $scope.artist = {}

  $scope.$on('viewThings', function(event, viewObj){
    if (viewObj.name !== 'oneArtist'){
      $scope.show = false;
      $scope.showTable = false;
      return;
    }
    ArtistFactory.fetchById(viewObj.id)
    .then(function(albums){
      $scope.artist.name = albums[0].artists[0].name;
      $scope.albums = albums;
      $scope.show = true;
    })
    .catch($log.error)
  });

  $scope.showSongs = function(id){
    $scope.showTable = true
    $scope.album = $scope.albums.filter(function (album){
      return album.id === id
    })
    $scope.album = $scope.album[0]

    console.log($scope.album.songs)

  }

  $scope.isPlaying = function() {return PlayerFactory.isPlaying()}
  $scope.getCurrentSong = function() {return PlayerFactory.getCurrentSong()}
  $scope.toggle = function (song) {
    console.log('in here', song)
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause()
    } else if (PlayerFactory.getCurrentSong() === song) PlayerFactory.resume()
    else PlayerFactory.start(song, $scope.album.songs);
  };

});
