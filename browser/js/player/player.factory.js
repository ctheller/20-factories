'use strict';

juke.factory('PlayerFactory', function(){
  var mediaPlayer = {};
  mediaPlayer.audio = document.createElement('audio');

  mediaPlayer.start = function (song, songList){
    mediaPlayer.pause();
    mediaPlayer.audio.src = song.audioUrl;
    mediaPlayer.audio.load();
    mediaPlayer.audio.play();
    mediaPlayer.currentSong = song;
    mediaPlayer.songList = songList;
  }

  mediaPlayer.pause = function (){
    mediaPlayer.audio.pause()
  }

  mediaPlayer.resume = function (){
    mediaPlayer.audio.play()
  }

  mediaPlayer.isPlaying = function (){
    return !mediaPlayer.audio.paused
  }

  mediaPlayer.getCurrentSong = function (){
    return mediaPlayer.currentSong ? mediaPlayer.currentSong : null
  }

  mediaPlayer.next = function (){
    var index = mediaPlayer.songList.indexOf(mediaPlayer.currentSong) + 1
    if (index >= mediaPlayer.songList.length) index = 0;
    mediaPlayer.start(mediaPlayer.songList[index])
  }

  mediaPlayer.previous = function (){
    var index = mediaPlayer.songList.indexOf(mediaPlayer.currentSong) - 1
    if (index < 0) index = mediaPlayer.songList.length - 1;
    mediaPlayer.start(mediaPlayer.songList[index])
  }

  mediaPlayer.getProgress = function (){
    console.log(mediaPlayer.audio.currentTime, mediaPlayer.audio.duration)
    var progress = mediaPlayer.audio.currentTime / mediaPlayer.audio.duration;
    if (isNaN(progress)) progress = 0;
    console.log('progress ', progress)
     return progress
  }

  return mediaPlayer
});
