using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub {
        public async Task SendMessage(string user, string message) {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task JoinChannel(string channelName) {
            await Groups.AddToGroupAsync(Context.ConnectionId, channelName);
            await Clients.Group(channelName).SendAsync("ReceiveMessage");
        }

        public async Task LeaveChannel(string channelName) {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelName);
            await Clients.Group(channelName).SendAsync("ReceiveMessage");
        }

        public async Task SendChannelMessage(string channelName, string user, string message) {
            await Clients.Group(channelName).SendAsync("ReceiveMessage", user, message);
        }

        public async Task UpdateChannelSet() {
            await Clients.All.SendAsync("UpdateAllChannelSet");
        }

        public async Task UpdateCurrentChannel(string channelName) {
            await Clients.Group(channelName).SendAsync("UpdateGroupCurrentChannel");
        }
    }
}