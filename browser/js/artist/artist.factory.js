'use strict';

juke.factory('ArtistFactory', function($http, $log) {

  // load our initial data
  var artistsObj = {};
  artistsObj.fetchAll = function() {
    return $http.get('/api/artists/')
      .then(function(res) {
        return res.data; })
      .catch($log.error);
  }

  artistsObj.fetchById = function(id) {
    return $http.get('/api/artists/' + id + '/albums')
      .then(function(res) {
        return res.data; })
      .then(function(albums) {
        albums.forEach(function(album) {
          album.imageUrl = '/api/albums/' + album.id + '/image'
        })
        return albums
      })

    .catch($log.error);
  }

  return artistsObj;

});
