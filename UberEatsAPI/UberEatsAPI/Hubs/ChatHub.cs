using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using Newtonsoft.Json;
using UberEatsAPI.Models.SignalRModels;

namespace UberEatsAPI.Hubs
{
    public class ChatHub:Hub
    {
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _connections = connections;
        }
        public override Task OnConnectedAsync()
        {
            Console.WriteLine("--> Connection Established "+Context.ConnectionId);
            Clients.Client(Context.ConnectionId).SendAsync("RecieveConnID", Context.ConnectionId);
            return base.OnConnectedAsync();
        }
        public async Task SendMessageAsync(string message)
        {
           
            Console.WriteLine("Message Recieved on:" + Context.ConnectionId+" ; Message : "+message);
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
            {
                await Clients.Group(connection.Group).SendAsync("RecievedMessage", message);
            }

        }
        public async Task AssignGroup(string conn)
        {   
            var obj =JsonConvert.DeserializeObject<dynamic>(conn);
            UserConnection connection = new UserConnection() { Email=obj.Email,Group=obj.Group };
            _connections[Context.ConnectionId] = connection;
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.Group);
        }
    }
}
