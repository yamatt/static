<script>
  const DISMISSED_KEY = "autoplay-popup-dismissed";
  let dismissed = $state(localStorage.getItem(DISMISSED_KEY) === "true");

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "true");
    dismissed = true;
  }
</script>

{#if !dismissed}
  <div
    id="autoplay-popup"
    class="info shadow fixed box top left"
    role="dialog"
    aria-label="Autoplay"
    tabindex="-1"
    ontouchstart={(event) => event.stopPropagation()}
    ontouchend={(event) => event.stopPropagation()}
    ontouchcancel={(event) => event.stopPropagation()}
  >
    <button
      type="button"
      class="autoplay-popup-close"
      aria-label="Dismiss autoplay notice"
      onclick={dismiss}
      onkeydown={(event) => event.stopPropagation()}
      onkeyup={(event) => event.stopPropagation()}
    >
      ×
    </button>
    <h1>Autoplay</h1>
    <p>
      If you can't hear audio, your browser may be blocking autoplay. Turn off
      auto-play blocking for this page or unmute it.
    </p>
  </div>
{/if}

<style>
  #autoplay-popup {
    position: relative;
    padding-right: 2.5rem;
  }

  .autoplay-popup-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
  }
</style>
