const { MessageEmbed } = require('discord.js');
const { Ticket, TicketCategory } = require('../models/ticket');

const createTicketCooldowns = new Map();
const closeTicketCooldowns = new Map();
const reopenTicketCooldowns = new Map();
const deleteTicketCooldowns = new Map();
const transcriptCooldowns = new Map();

const COOLDOWNS = {
  create_ticket: 10000,
  confirm_close_ticket: 10000,
  reopen_ticket: 10000,
  delete_channel: 10000,
  transcript: 60000,
};

function getCooldownMap(buttonType) {
  switch (buttonType) {
    case 'create_ticket':
      return createTicketCooldowns;
    case 'confirm_close_ticket':
      return closeTicketCooldowns;
    case 'reopen_ticket':
      return reopenTicketCooldowns;
    case 'delete_channel':
      return deleteTicketCooldowns;
    case 'transcript':
      return transcriptCooldowns;
    default:
      return null;
  }
}

function checkCooldown(cooldownMap, id, buttonType) {
  if (cooldownMap.has(id)) {
    const expirationTime = cooldownMap.get(id);
    if (Date.now() < expirationTime) {
      return (expirationTime - Date.now()) / 1000; 
    }
  }
  cooldownMap.set(id, Date.now() + COOLDOWNS[buttonType]);
  return false; 
}

function cleanupTicketOperations() {
  const now = Date.now();
  [createTicketCooldowns, closeTicketCooldowns, reopenTicketCooldowns, 
   deleteTicketCooldowns, transcriptCooldowns].forEach(cooldownMap => {

    for (const [userId, expirationTime] of cooldownMap.entries()) {
      if (now >= expirationTime) {
        cooldownMap.delete(userId);
      }
    }
  });
}

module.exports = async (client) => {
  setInterval(cleanupTicketOperations, 600000);
  
  async function logTicketEvent(logsChannelId, embed) {
    const logsChannel = client.channels.cache.get(logsChannelId);
    if (logsChannel) {
      await logsChannel.send({ embeds: [embed] }).catch(console.error);
    }
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const { customId, guild, channel, user } = interaction;

    try {
      let ticketCategory = null;
      
      if (customId === 'create_ticket') {
        ticketCategory = await TicketCategory.findOne({ 
          guildId: guild.id,
          setupMessageId: interaction.message.id 
        });
      } else {
        const ticket = await Ticket.findOne({ 
          guildId: guild.id, 
          channelId: channel.id 
        });
        
        if (ticket) {
          ticketCategory = await TicketCategory.findOne({ 
            guildId: guild.id,
            setupId: ticket.setupId
          });
        }
      }

      if (!ticketCategory || !ticketCategory.logsChannelId) return;
      const logsChannelId = ticketCategory.logsChannelId;

      const cooldownMap = getCooldownMap(customId);
      if (cooldownMap) {
        const cooldownRemaining = checkCooldown(cooldownMap, user.id, customId);
        if (cooldownRemaining) {
          return interaction.reply({
            embeds: [
              new MessageEmbed()
                .setDescription(`Please wait ${cooldownRemaining.toFixed(1)} seconds before using this button again.`)
                .setColor(client.color),
            ],
            ephemeral: true,
          });
        }
      }

      let logEmbed;

      switch (customId) {
        case 'create_ticket':
          logEmbed = new MessageEmbed()
            .setTitle('Ticket Created')
            .setDescription(`${user} created a ticket in ${channel}.`)
            .setColor(client.color)
            .setTimestamp();
          break;

        case 'confirm_close_ticket':
          logEmbed = new MessageEmbed()
            .setTitle('Ticket Closed')
            .setDescription(`${user} closed the ticket in ${channel}.`)
            .setColor(client.color)
            .setTimestamp();
          break;

        case 'reopen_ticket':
          logEmbed = new MessageEmbed()
            .setTitle('Ticket Reopened')
            .setDescription(`${user} reopened the ticket in ${channel}.`)
            .setColor(client.color)
            .setTimestamp();
          break;
        case 'confirm_reopen_ticket':
            logEmbed = new MessageEmbed()
              .setTitle('Ticket Reopened')
              .setDescription(`${user} reopened the ticket in ${channel}.`)
              .setColor(client.color)
              .setTimestamp();
            break;          

        case 'delete_channel':
          logEmbed = new MessageEmbed()
            .setTitle('Ticket Deleted')
            .setDescription(`${user} deleted the ticket in ${channel.name}.`)
            .setColor(client.color)
            .setTimestamp();
          break;

        case 'transcript':
          logEmbed = new MessageEmbed()
            .setTitle('Transcript Generated')
            .setDescription(`${user} generated a transcript for the ticket in ${channel}.`)
            .setColor(client.color)
            .setTimestamp();
          break;
        case 'confirm_close_ticket1':
            logEmbed = new MessageEmbed()
              .setTitle('Ticket Closed')
              .setDescription(`${user} closed the ticket in ${channel}.`)
              .setColor(client.color)
              .setTimestamp();
            break;          
        case 'transcript1':
              logEmbed = new MessageEmbed()
                .setTitle('Transcript Generated')
                .setDescription(`${user} generated a transcript for the ticket in ${channel}.`)
                .setColor(client.color)
                .setTimestamp();
              break;            
        case 'confirm_delete':
                logEmbed = new MessageEmbed()
                  .setTitle('Ticket Deleted')
                  .setDescription(`${user} deleted the ticket in ${channel.name}.`)
                  .setColor(client.color)
                  .setTimestamp();
                break;              

        default:
          return;
      }

      if (logEmbed) {
        await logTicketEvent(logsChannelId, logEmbed);
      }
    } catch (error) {
      console.error('Error handling ticket logs:', error);
    }
  });
  client.on('ticketMemberAdded', async ({ guild, channel, addedBy, member }) => {
    try {
      const ticketCategory = await TicketCategory.findOne({ guildId: guild.id });

      if (!ticketCategory || !ticketCategory.logsChannelId) return;
      const logsChannelId = ticketCategory.logsChannelId;

      const logEmbed = new MessageEmbed()
        .setTitle('Member Added to Ticket')
        .setDescription(`${addedBy} added ${member} to the ticket in ${channel}.`)
        .setColor(client.color)
        .setTimestamp();

      await logTicketEvent(logsChannelId, logEmbed);
    } catch (error) {
      console.error('Error logging member addition to ticket:', error);
    }
  });  
  client.on('ticketMemberRemove', async ({ guild, channel, removedBy, member }) => {
    try {
      const ticketCategory = await TicketCategory.findOne({ guildId: guild.id });

      if (!ticketCategory || !ticketCategory.logsChannelId) return;
      const logsChannelId = ticketCategory.logsChannelId;

      const logEmbed = new MessageEmbed()
        .setTitle('Member Removed to Ticket')
        .setDescription(`${removedBy} removed ${member} to the ticket in ${channel}.`)
        .setColor(client.color)
        .setTimestamp();

      await logTicketEvent(logsChannelId, logEmbed);
    } catch (error) {
      console.error('Error logging member addition to ticket:', error);
    }
  });    
  client.on('ticketRenamed', async ({ guild, channel, renamedBy, oldName, newName }) => {
    try {
        const ticketCategory = await TicketCategory.findOne({ guildId: guild.id });

        if (!ticketCategory || !ticketCategory.logsChannelId) return;
        const logsChannelId = ticketCategory.logsChannelId;

        const logEmbed = new MessageEmbed()
            .setTitle('Ticket Channel Renamed')
            .setDescription(`${renamedBy} renamed the ticket channel\nOld Name: ${oldName}\nNew Name: ${newName}`)
            .setColor(client.color)
            .setTimestamp();

        await logTicketEvent(logsChannelId, logEmbed);
    } catch (error) {
        console.error('Error logging ticket rename:', error);
    }
  });  
};
