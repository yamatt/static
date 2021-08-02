const bgVideo = document.getElementById("bg-video");
const player  = document.getElementById("player");

const video_url = "backgrounds.json";

fetch(video_url)
  .then(function(response) {
    if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })
  .then(function(video_urls) {
    var stream = video_urls[Math.floor(Math.random() * video_urls.length)];
    bgVideo.setAttribute("src", stream['url']);
    bgVideo.playbackRate = 0.5;
  })
  .catch(function(error) {
    console.log(error.message);
  });
