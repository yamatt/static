(()=>{const t=document.getElementById("bg-video");document.getElementById("player"),fetch("backgrounds.json").then((function(t){if(!t.ok)throw new Error("HTTP error, status = "+t.status);return t.json()})).then((function(e){var n=e[Math.floor(Math.random()*e.length)];t.setAttribute("src",n.url),t.playbackRate=.5})).catch((function(t){console.log(t.message)}))})();