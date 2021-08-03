const background = document.getElementById("background-video");
const player  = document.getElementById("player");

const backgrounds_url = "backgrounds.json";
const streams_url = "streams.json";

fetch(backgrounds_url)
  .then(function(response) {
    if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })
  .then(function(backgrounds) {
    var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    background.setAttribute("src", background['url']);
    background.playbackRate = 0.5;
  })
  .catch(function(error) {
    console.log(error.message);
  });

fetch(streams_url)
  .then(function(response) {
    if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })
  .then(function(streams) {
    var stream = streams[Math.floor(Math.random() * streams.length)];
    const stream_url = new URL(stream['url']);
    switch(stream_url.hostname) {
      case "www.youtube.com":
        while (player.lastChild) {
          player.removeChild(player.lastChild);
        }
        var yt_iframe = document.createElement("iframe");
        yt_iframe.setAttribute("allow", "autoplay; encrypted-media;");
        yt_iframe.setAttribute("src", stream['url']);
        player.appendChild(yt_iframe);
        break;
      default:
        // code block
    }
  })
  .catch(function(error) {
    console.log(error.message);
  });
