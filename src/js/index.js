const background_el = document.getElementById("background-video");
const player_el  = document.getElementById("player");

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
    background_el.setAttribute("src", background['url']);
    background_el.playbackRate = 0.5;
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
        while (player_el.lastChild) {
          player_el.removeChild(player_el.lastChild);
        }
        var yt_iframe = document.createElement("iframe");
        yt_iframe.setAttribute("allow", "autoplay; encrypted-media;");
        yt_iframe.setAttribute("src", stream['url'] + "?autoplay=1&enablejsapi=1");
        player_el.appendChild(yt_iframe);
        break;
      default:
        throw new Error("No stream processor found");
    }
  })
  .catch(function(error) {
    console.log(error.message);
  });

document.onkeypress = function (e) {
  e = e || window.event;

  if (e.code == "Space") {
    player_el.childNodes[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
  }
};
