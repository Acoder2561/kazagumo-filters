# kazagumo-filter
A plugin that allows you to set filter faster in Kazagumo

Install
```
npm i kazagumo-filter
```

Support filter:
```
- clear
- eightD
- soft
- speed
- karaoke
- nightcore
- pop
- vaporwave
- bass
- party
- earrape
- equalizer
- electronic
- radio
- tremolo
- treblebass
- vibrato
- china
- chimpunk
- darthvader
- daycore
- doubletime
- pitch
- rate
- slow
```

How to
```js
const { Kazagumo } = require('kazagumo');
const KazagumoFilter = require('kazagumo-filter');

const kazagumo = new Kazagumo(
  {
    plugins: [
      new KazagumoFilter(),
    ],
  },
  new Connectors.DiscordJS(client),
  Nodes,
);

const player = kazagumo.player.get("guild_id")
await player.filter("nightcore")
```