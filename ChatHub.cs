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
            await Clients.Group(channelName).SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined the channel {channelName}");
        }

        public async Task LeaveChannel(string channelName) {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelName);
            await Clients.Group(channelName).SendAsync("ReceiveMessage", $"{Context.ConnectionId} has left the channel {channelName}");
        }

        public async Task SendSelfMessage(string user, string message) {
            await Clients.Users(user).SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendChannelMessage(string channelName, string user, string message) {
            await Clients.Group(channelName).SendAsync("ReceiveMessage", user, message);
        }
    }
}