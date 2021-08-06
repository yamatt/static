(()=>{"use strict";class t{#state;#iframe;constructor(t){this.parent=t,this.player_el=t.player_el,this.stream_url=t.stream.url}setup(){let t=this;this.#iframe=document.createElement("iframe"),this.#iframe.setAttribute("allow","autoplay; encrypted-media;"),this.#iframe.setAttribute("src",this.stream_url+"?enablejsapi=1"),this.#iframe.addEventListener("load",(function(e){t.play()})),this.player_el.appendChild(this.#iframe),this.state=0}get state(){return this.#state}set state(t){this.#state=t}post_message(t){this.#iframe.contentWindow.postMessage('{"event":"command","func":"'+t+'","args":""}',"*")}play(){this.post_message("playVideo"),this.state=1}stop(){this.post_message("stopVideo"),this.state=0}destroy(){this.stop(),this.#iframe.remove(),this.#iframe=void 0,this.state}}let e;e=new class{BACKGROUND_VIDEO_EL_ID="background-video";BACKGROUND=class{BACKGROUND_VIDEO_URL="backgrounds.json";constructor(t){this.parent=t,this.background_video_el=t.background_video_el,this.background_video_el.defaultPlaybackRate=.5}get_json(t,e){return fetch(t).then((function(t){if(!t.ok)throw new Error("HTTP error, status = "+t.status);return t.json()})).then(e.bind(this))}handle_backgrounds(t){this.backgrounds=t}random_choice(t){return t[Math.floor(Math.random()*t.length)]}random_background(){var t=this;let e=Object.keys(this.backgrounds).map((function(e){return t.backgrounds[e]}));return this.random_choice(e)}stream_changed(){localStorage.getItem("bg-"+this.parent.player.stream.id)&&update_background(this.backgrounds[this.parent.player.stream.id])}update_background(t){this.background_video_el.setAttribute("src",t.url)}change(){this.background=this.random_background(),this.update_background(this.background),this.parent.info.update_background(this.background),this.parent.player.stream&&localStorage.setItem("bg-"+this.parent.player.stream.id,this.background.id)}get_backgrounds(){return this.get_json(this.BACKGROUND_VIDEO_URL,this.handle_backgrounds)}start(){this.get_backgrounds().then(this.change.bind(this))}};PLAYER_EL_ID="player";PLAYER=class{STREAMS_URL="streams.json";SOURCES={"www.youtube.com":t};constructor(t){this.parent=t,this.player_el=t.player_el}get_json(t,e){return fetch(t).then((function(t){if(!t.ok)throw new Error("HTTP error, status = "+t.status);return t.json()}))}handle_streams(t){this.streams=t}random_choice(t){return t[Math.floor(Math.random()*t.length)]}random_stream(){var t=this;let e=Object.keys(this.streams).map((function(e){return t.streams[e]}));return this.random_choice(e)}change_stream(){this.stream=this.random_stream(),this.start_stream()}start_stream(){!this.stream&&localStorage.getItem("stream")&&(this.stream=localStorage.getItem("stream")),this.source&&this.source.destroy(),this.parent.info.update_stream(this.stream);const t=new URL(this.stream.url);this.source=new this.SOURCES[t.hostname](this),this.source.setup(),localStorage.setItem("stream",this.stream.id),this.parent.background.use_background()}pause(){this.source.stop()}play(){this.source.play()}toggle(){1!=this.source.state?0!=this.source.state||this.source.play():this.source.stop()}clear(){this.source&&this.source.destroy()}start(){this.get_json(this.STREAMS_URL,this.handle_streams).then(this.handle_streams.bind(this)).then(this.change_stream.bind(this))}};SHORTCUTS=class{KEY_MAP={Space:this.playpause,ArrowRight:this.next_station,ArrowLeft:this.prev_station,ArrowDown:this.change_background,ArrowUp:this.change_background};constructor(t){this.parent=t}setup(){const t=this;document.addEventListener("keyup",(e=>{(e=e||window.event).code in this.KEY_MAP&&this.KEY_MAP[e.code].call(t,e)}))}playpause(t){this.parent.player.toggle()}next_station(){this.parent.player.change_stream()}prev_station(){this.parent.player.change_stream()}change_background(){this.parent.background.change()}};INFO_EL_ID="info";INFO=class{#stream_el;#background_el;constructor(t){this.parent=t,this.info_el=t.info_el}get stream_el(){return this.#stream_el||(this.#stream_el=document.createElement("div"),this.info_el.appendChild(this.#stream_el)),this.#stream_el}get background_el(){return this.#background_el||(this.#background_el=document.createElement("div"),this.info_el.appendChild(this.#background_el)),this.#background_el}update_background(t){let e=t.title;this.background_el.childNodes.length>0&&this.background_el.childNodes[0].remove(),this.background_el.appendChild(document.createTextNode(e))}update_stream(t){let e=t.title;this.stream_el.childNodes.length>0&&this.stream_el.childNodes[0].remove(),this.stream_el.appendChild(document.createTextNode(e))}};#background_video;#background;#player_el;#player;#shortcuts;#info_el;#info;get background_video_el(){return this.#background_video||(this.#background_video=document.getElementById(this.BACKGROUND_VIDEO_EL_ID)),this.#background_video}get background(){return this.#background||(this.#background=new this.BACKGROUND(this)),this.#background}get player_el(){return this.#player_el||(this.#player_el=document.getElementById(this.PLAYER_EL_ID)),this.#player_el}get player(){return this.#player||(this.#player=new this.PLAYER(this)),this.#player}get shortcuts(){return this.#shortcuts||(this.#shortcuts=new this.SHORTCUTS(this)),this.#shortcuts}get info_el(){return this.#info_el||(this.#info_el=document.getElementById(this.INFO_EL_ID)),this.#info_el}get info(){return this.#info||(this.#info=new this.INFO(this)),this.#info}run(){this.shortcuts.setup(),this.player.start(),this.background.start()}},e.run()})();
//# sourceMappingURL=main.js.map