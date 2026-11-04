<script>
  import { onMount } from "svelte";
  import AutoplayPopup from "./components/AutoplayPopup.svelte";
  import BackgroundVideo from "./components/BackgroundVideo.svelte";
  import Help from "./components/Help.svelte";
  import NowPlaying from "./components/NowPlaying.svelte";
  import PlayerHost from "./components/PlayerHost.svelte";
  import StaticPlayer from "./js/static.js";

  let currentStream = $state(null);
  let currentBackground = $state(null);

  onMount(() => {
    const player = new StaticPlayer({
      onStreamChange: (stream) => {
        currentStream = stream;
      },
      onBackgroundChange: (background) => {
        currentBackground = background;
      },
    });
    player.run();
  });
</script>

<BackgroundVideo />
<AutoplayPopup />
<Help />
<PlayerHost />
<NowPlaying {currentStream} {currentBackground} />
