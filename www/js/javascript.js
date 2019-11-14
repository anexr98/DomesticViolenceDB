var youTubePlayer;

function onYouTubeIframeAPIReady() {
    'use strict';

    var inputVideoId = document.getElementById('YouTube-video-id');
    var videoId = inputVideoId.value;
    var suggestedQuality = 'tiny';
    var height = 300;
    var width = 600;
    var youTubePlayerVolumeItemId = 'YouTube-player-volume';


    function onError(event) {
        youTubePlayer.personalPlayer.errors.push(event.data);
    }


    function onReady(event) {
        var player = event.target;

        player.loadVideoById({suggestedQuality: suggestedQuality,
                              videoId: videoId
                             });
        player.pauseVideo();
        youTubePlayerDisplayFixedInfos();
    }


    function onStateChange(event) {
        var volume = Math.round(event.target.getVolume());
        var volumeItem = document.getElementById(youTubePlayerVolumeItemId);

        if (volumeItem && (Math.round(volumeItem.value) != volume)) {
            volumeItem.value = volume;
        }
    }


    youTubePlayer = new YT.Player('YouTube-player',
                                  {videoId: videoId,
                                   height: height,
                                   width: width,
                                   playerVars: {'autohide': 0,
                                                'cc_load_policy': 0,
                                                'controls': 2,
                                                'disablekb': 1,
                                                'iv_load_policy': 3,
                                                'modestbranding': 1,
                                                'rel': 0,
                                                'showinfo': 0,
                                                'start': 3
                                               },
                                   events: {'onError': onError,
                                            'onReady': onReady,
                                            'onStateChange': onStateChange
                                           }
                                  });


    youTubePlayer.personalPlayer = {'currentTimeSliding': false,   // Add private data to the YouTube object
                                    'errors': []};
}

function youTubePlayerActive() {
    'use strict';

    return youTubePlayer && youTubePlayer.hasOwnProperty('getPlayerState');
}


function youTubePlayerChangeVideoId() {
    'use strict';

    var inputVideoId = document.getElementById('YouTube-video-id');
    var videoId = inputVideoId.value;

    youTubePlayer.cueVideoById({suggestedQuality: 'tiny',
                                videoId: videoId
                               });
    youTubePlayer.pauseVideo();
    youTubePlayerDisplayFixedInfos();
}

/*--Pause----*/
function youTubePlayerPause() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.pauseVideo();
    }
}


/*----- Play---- */
function youTubePlayerPlay() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.playVideo();
    }
}

function youTubePlayerStateValueToDescription(state, unknow) {
    'use strict';

    var STATES = {'-1': 'unstarted',   // YT.PlayerState.
                  '0': 'ended',        // YT.PlayerState.ENDED
                  '1': 'playing',      // YT.PlayerState.PLAYING
                  '2': 'paused',       // YT.PlayerState.PAUSED
                  '3': 'buffering',    // YT.PlayerState.BUFFERING
                  '5': 'video cued'};  // YT.PlayerState.CUED

    return (state in STATES
            ? STATES[state]
            : unknow);
}


/*-----Stop----*/
function youTubePlayerStop() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.stopVideo();
        youTubePlayer.clearVideo();
    }
}

/*----- Main------*/
(function () {
    'use strict';

    function init() {

        var tag = document.createElement('script'); // Load YouTube library

        tag.src = 'https://www.youtube.com/iframe_api';

        var first_script_tag = document.getElementsByTagName('script')[0];

        first_script_tag.parentNode.insertBefore(tag, first_script_tag);

        setInterval(youTubePlayerDisplayInfos, 1000); // Set timer to display infos
    }


    if (window.addEventListener) {
        window.addEventListener('load', init);
    } else if (window.attachEvent) {
        window.attachEvent('onload', init);
    }
}());
/**---------------/YouTube-------------------------------------------------------------------------*/

$(document).on("pagecreate", function() {
  $("body > [data-role='panel']").panel();
  $("body > [data-role='panel'] [data-role='listview']").listview();
});

$(document).one("pageshow", function() {
  $("body > [data-role='header']").toolbar();
  $("body > [data-role='header'] [data-role='navbar']").navbar();
});


$("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeIn(2000)
    .next()
    .fadeOut(2000)
    .end()
    .appendTo('#slideshow');
}, 3000);
/**-------------------------------navbar-------------------------------------------------*/

function init() {

  var greenIcon = L.icon({
    iconUrl: 'images/markup.png',
    position: 'fixed',
    iconSize: [45, 45], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });




  var map = new L.Map('map');

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 20
  }).addTo(map);
  map.attributionControl.setPrefix('');
  var location = new L.LatLng(-20.16527900, 57.4963800);
  map.setView([-20.16527900, 57.4963800], 10);


  //markercluster
  L.marker([-20.165360, 57.501730], {
    icon: greenIcon
  }).addTo(map); //  2nd Floor, SILWF Building, Edith Cavell Street, Port Louis
  L.marker([-20.190230, 57.724680], {
    icon: greenIcon
  }).addTo(map); // 	Flacq Women Centre Royal Road Flacq
  L.marker([-20.493520, 57.467110], {
    icon: greenIcon
  }).addTo(map); // Paul Baillache Street, Chemin Grenien, Mauritius
  L.marker([-20.058520, 57.554470], {
    icon: greenIcon
  }).addTo(map); // Bonair Road, Triolet,  Mauritius
  L.marker([-20.262320, 57.412140], {
    icon: greenIcon
  }).addTo(map); //Royal Road Bambous, Mauritius
  L.marker([-20.427900, 57.600840], {
    icon: greenIcon
  }).addTo(map); // National Women Development New Grove
  L.marker([-20.409440, 57.707420], {
    icon: greenIcon
  }).addTo(map); // Mahebourg
  L.marker([-20.319360, 57.505910], {
    icon: greenIcon
  }).addTo(map); // Rue La Marque, Curepipe, Mauritius


  //markercluster popup
  var popup = L.popup()
    .setLatLng([-20.165360, 57.501730])
    .setContent("<strong> Port Louis </strong> <br> Family Welfare and Protection Unit")
    .addTo(map);

  var popup = L.popup()
    .setLatLng([-20.190230, 57.724680])
    .setContent("<strong>Flacq</strong><br>Family Counseling Service")
    .addTo(map);

  var popup = L.popup()
    .setLatLng([-20.493520, 57.467110])
    .setContent("<strong>Souillac</strong><br>Family Welfare and Protection Unit")
    .addTo(map);

  var popup = L.popup()
    .setLatLng([-20.058520, 57.554470])
    .setContent("<strong>Triolet</strong><br>Family Counseling Service")
    .addTo(map);

  var popup = L.popup()
    .setLatLng([-20.262320, 57.412140])
    .setContent("<strong>Bambous</strong><br>Family Counseling Service")
    .addTo(map);

  var popup = L.popup()
    .setLatLng([-20.427900, 57.600840])
    .setContent("<strong>New Grove</strong><br>Family Counseling Service")
    .addTo(map);

  var popup = L.popup()
    .setLatLng([-20.409440, 57.707420])
    .setContent("<strong>Mahebourg</strong><br>Family Welfare and Protection Unit")
    .addTo(map);

  var popup = L.popup()
    .setLatLng([-20.319360, 57.505910])
    .setContent("<strong>Curepipe</strong><br>Family Welfare and Protection Unit")
    .addTo(map);
}

/*----------------------------------------map---------------------------------------*/

if (typeof(Storage) !== undefined) {
      localStorage.setItem("name", "Domestic Violence");
      localStorage.setItem("work", "utm");
      var myName = localStorage.getItem("name");
      alert("Domestic Violence");
    } else {
      alert("but why?");
    }

    db = window.openDatabase("myStoriesDB", "1.0", "Simple Demo", 2 * 1024 * 1024);
    db.transaction(createDB, errorCB, successCB);

    function createDB(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS story(id INT, name TEXT, storyline TEXT)');
    }

    function errorCB(err) {
      alert("SQL Error: " + err.code);
    }

    function successCB() {
      alert("Database & Table Created");
    }

    // <------------------>
    function submitForm() {
      db.transaction(insertDB, errorCB);
      return false;
    }

    function insertDB(tx) {
      var name_c = $("[name='name']").val();
      var storyline_c = $("[name='storyline']").val();
      var sql = 'INSERT INTO story (name, storyline) VALUES (?,?)';
      tx.executeSql(sql, [name_c, storyline_c], successQueryDB, errorCB);
    }

    function successQueryDB(tx) {
      alert("Insert Successful");
      tx.executeSql('SELECT * FROM story', [], renderListCB, errorCB)
    }

    function renderListCB(tx, results) {
      var htmlString = ' ';
      var len = results.rows.length;

      for (var i = 0; i < len; i++) {
        htmlString += '<li>' + results.rows.item(i).name + '<br>' + results.rows.item(i).storyline + '</li>';
      }

      $('#resultList').html(htmlString);
      $('#resultList').listview('refresh');
    }

    function submitForm() {

      db.transaction(insertDB, errorCB);
      $.mobile.changePage("#pageeight", {
        reverse: false,
        transition: "slide"
      });

      return false;
    }

    //<------------------->
    document.addEventListener("deviceready", onDeviceReady, false);
    var db;

    function onDeviceReady() {

      alert("device ready");
}
