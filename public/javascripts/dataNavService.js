// Self envoking function! once the document is ready, bootstrap our application.
// We do this to make sure that all the HTML is rendered before we do things
// like attach event listeners and any dom manipulation.
(function(){
  $(document).ready(function(){
    bootstrapSearch();
  })
})();

/**
  This function bootstraps the navService request functionality.
*/
function bootstrapSearch(){

  var userInput, searchUrl, results;
  var outputArea = $("#q-results");

  $('#dns').on("click", function(){
      var dnsQueryRequest;
      userInput = $('#dns-q').val();
      searchUrl = "https://api.spotify.com/v1/search?type=artist&q=" + userInput;

      // Generate the request object
      spotifyQueryRequest = $.ajax({
          type: "GET",
          dataType: 'json',
          url: searchUrl
      });

      // Attach the callback for success
      // (We could have used the success callback directly)
      spotifyQueryRequest.done(function (data) {
        var artists = data.artists;

        // Clear the output area
        outputArea.html('');

        // The spotify API sends back an array 'items'
        // Which contains the first 20 matching elements.
        // In our case they are artists.
        artists.items.forEach(function(artist){
          var artistLi = $("<li>" + artist.name + " - " + artist.id + "</li>")
          artistLi.attr('data-spotify-id', artist.id);
          outputArea.append(artistLi);

          artistLi.click(displayAlbumsAndTracks);
        })
      });

      // Attach the callback for failure
      // (Again, we could have used the error callback direcetly)
      spotifyQueryRequest.fail(function (error) {
        console.log("Something Failed During Spotify Q Request:")
        console.log(error);
      });
  });
}

function displayAlbumsAndTracks(event) {
  var appendToMe = $('#albums-and-tracks');
  var $artistId = $('li').attr('data-spotify-id');
  var albumRequest, albumUrl, dateRequest, dates;

  albumRequest = $.ajax( {
    type: "GET",
    url: `https://api.spotify.com/v1/artists/${$artistId}/albums`,
    dataType: 'json'
  });

  albumRequest.done(function(artist) {
    var albumDate;

    artist.items.forEach(function(album) {
      albumDate = getDate(album.href);
      console.log(albumDate);
      appendToMe.append(`<li>${album.name}, release date: ${albumDate}</li>`);
    })

    function getDate(albumUrl) {
      dateRequest = $.ajax( {
        type: "GET",
        url: albumUrl,
        dataType: 'json',
      });
      dateRequest.done(function(date) {
        dates = date.release_date;
      });
      console.log(dates);
    }
  });
};



// tracks:  https://api.spotify.com/v1/albums/{id}/tracks

/* YOU MAY WANT TO CREATE HELPER FUNCTIONS OF YOUR OWN */
/* THEN CALL THEM OR REFERENCE THEM FROM displayAlbumsAndTracks */
/* THATS PERFECTLY FINE, CREATE AS MANY AS YOU'D LIKE */





// // These two lines can be deleted. They're mostly for show.
// console.log("you clicked on:");
// console.log($(event.target).attr('data-spotify-id'));//.attr('data-spotify-id'));
