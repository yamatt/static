# Static

[Static](https://yamatt.github.io/static) is an open source web-based embedded radio player that uses webpack to generate a static page that can be hosted as a GitHub Page.

You can submit radio stations from YouTube as Pull Requests, or fork this repo to create your own playlist.

## How does it work

There is a hidden iframe that switches between different URLs for embedded live streams from YouTube based on the station you select. The code here hooks in to an unofficial API in YouTube that allows you to pause a stream.

### Enable Auto Play

Some browsers block automatic playing of videos. You may have to go to YouTube to enable autoplay to get Static to work.

The backgrounds are videos from giphy that are loaded in a video element in the background.

### Updating Stations

Update the streams JSON in `src/data` to listen to your preferred live streams. It currently only works with YouTube.

### Updating Backgrounds

Update the backgrounds JSON in `src/data` to select relaxing animations to have in the background. Note that they are played at 50% speed to make them even more relaxing.

## Development

You can run this locally by building with webpack, putting all the files together in a public directory and hosting a static server there.

From the root of this repo:

```bash
npm install
npm run build
npm run local
```

## License
AGPLv3
