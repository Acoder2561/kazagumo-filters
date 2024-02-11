const {Client, GatewayIntentBits} = require('discord.js');
const {Guilds, GuildVoiceStates, GuildMessages, MessageContent} = GatewayIntentBits;
const {Connectors} = require("shoukaku");
const {Kazagumo, KazagumoTrack} = require("kazagumo");
const Deezer = require("../dist");

const Nodes = [{
    name: 'owo',
    url: 'lavalink-1gia.onrender.com',
    auth: 'dreamvast_lavalink',
    secure: true
}];
const client = new Client({intents: [Guilds, GuildVoiceStates, GuildMessages, MessageContent]});
const kazagumo = new Kazagumo({
    defaultSearchEngine: "youtube",
    // MAKE SURE YOU HAVE THIS
    send: (guildId, payload) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
    },
    plugins: [
      new Deezer(),
    ],
}, new Connectors.DiscordJS(client), Nodes);

console.log(kazagumo.KazagumoOptions)

client.on("ready", () => console.log(client.user.tag + " Ready!"));

kazagumo.shoukaku.on('ready', (name) => console.log(`Lavalink ${name}: Ready!`));
kazagumo.shoukaku.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error));
kazagumo.shoukaku.on('close', (name, code, reason) => console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`));
kazagumo.shoukaku.on('disconnect', (name, players, moved) => {
    if (moved) return;
    players.map(player => player.connection.disconnect())
    console.warn(`Lavalink ${name}: Disconnected`);
});

kazagumo.on("playerStart", (player, track) => {
    client.channels.cache.get(player.textId)?.send({content: `Now playing **${track.title}** by **${track.author}**`})
        .then(x => player.data.set("message", x));
});

kazagumo.on("playerEnd", (player) => {
    player.data.get("message")?.edit({content: `Finished playing`});
});

kazagumo.on("playerEmpty", player => {
    client.channels.cache.get(player.textId)?.send({content: `Destroyed player due to inactivity.`})
        .then(x => player.data.set("message", x));
    player.destroy();
});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;

    if (msg.content.startsWith("!play")) {
        const args = msg.content.split(" ");
        const query = args.slice(1).join(" ");

        const {channel} = msg.member.voice;
        if (!channel) return msg.reply("You need to be in a voice channel to use this command!");

        let player = await kazagumo.createPlayer({
            guildId: msg.guild.id,
            textId: msg.channel.id,
            voiceId: channel.id,
            volume: 40
        })

        let result = await kazagumo.search(query, {requester: msg.author});
        if (!result.tracks.length) return msg.reply("No results found!");

        if (result.type === "PLAYLIST") for (let track of result.tracks) player.queue.add(track);
        else player.queue.add(result.tracks[0]);

        console.log(player)

        if (!player.playing && !player.paused) player.play();
        return msg.reply({content: result.type === "PLAYLIST" ? `Queued ${result.tracks.length} from ${result.playlistName}` : `Queued ${result.tracks[0].title}`});
    }

    if (msg.content.startsWith("!forceplay")) {
        let player = kazagumo.players.get(msg.guild.id);
        if (!player) return msg.reply("No player found!");
        const args = msg.content.split(" ");
        const query = args.slice(1).join(" ");
        let result = await kazagumo.search(query, {requester: msg.author});
        if (!result.tracks.length) return msg.reply("No results found!");
        player.play(new KazagumoTrack(result.tracks[0].getRaw(), msg.author));
        return msg.reply({content: `Forced playing **${result.tracks[0].title}** by **${result.tracks[0].author}**`});
    }

    if (msg.content.startsWith("!nightcore")) {
        let player = kazagumo.players.get(msg.guild.id);
        await player.filter("nightcore")
        return msg.reply({content: `Data setted`});
    }
})


client.login('');