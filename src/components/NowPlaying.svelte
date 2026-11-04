<script>
  let { currentStream, currentBackground } = $props();
</script>

<div id="info" class="info fixed box bottom left shadow">
  {#if currentStream}
    <div>
      <a href={currentStream.origin_url} target="_blank">{currentStream.title}</a>
    </div>
  {/if}
  {#if currentBackground}
    <div>
      <a href={currentBackground.origin_url} target="_blank">
        {currentBackground.title}
      </a>
    </div>
  {/if}
</div>
