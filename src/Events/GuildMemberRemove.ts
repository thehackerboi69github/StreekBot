import { EmbedBuilder, Events, GuildTextBasedChannel } from 'discord.js';
import { ClientEvent } from '../Structures';

export default new ClientEvent({
    name: Events.GuildMemberRemove,
    run: async member => {
        const { client, guild, user } = member;

        const schema = await client.getServerConfigSchema();

        const { welcomeChannelId, leaveMessages } = schema;

        await client.verificationCollection.deleteOne({ userId: user.id }).catch(() => null);

        const channel = (await client.channels
            .fetch(welcomeChannelId)
            .catch(() => null)) as GuildTextBasedChannel | null;

        if (!channel) return;

        let leaveMessage = leaveMessages[Math.floor(Math.random() * leaveMessages.length)];

        if (!leaveMessage) return;

        leaveMessage = leaveMessage
            .replaceAll('{user}', member.toString())
            .replaceAll('{username}', user.username)
            .replaceAll('{server}', guild.name)
            .replaceAll('{members}', guild.memberCount.toString());

        const channelEmbed = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setTitle(`Tot ziens ${user.username}!`)
            .setDescription(leaveMessage)
            .setColor(client.config.color)
            .setTimestamp();

        await channel.send({ embeds: [channelEmbed] });
    },
});