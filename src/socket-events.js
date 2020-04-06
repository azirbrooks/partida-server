const socketEvents = {
  listen: function (io) {
    io.on("connection", function (socket) {
      socket.on("join_room", (data) => {
        // An user becomes a player when joins a room
        const player = socket.handshake.session.user;

        // TODO: Thow an error and/or disconnect the socket if there's no user session by now
        if (typeof player !== "undefined") {
          // TODO: Don't let a user create a room if already exists
          // TODO: Don't let a user join if the room is full
          socket.join(player.roomName, () => {
            // TODO: Change test data
            console.log(player);
            io.emit("update_table", {
              // TODO: Change test dataplayerName: player.name,
              player: { id: player.playerNumber, playerName: player.name },
            });

            socket.on("start_game", () => {
              // TODO: Don't let a game start if the number of minimum players is not reached
              // TODO: Emit update_player event to each socket.id in the room.
              //       For now we send only to sender's socket.id
              io.emit("update_player", {
                // TODO: Change test data
                cards: [
                  { value: 7, type: "Hearts" },
                  { value: 14, type: "Diamonds" },
                  { value: 12, type: "Diamonds" },
                  { value: 11, type: "Diamonds" },
                ],
              });
            });

            socket.on("play_card", (card) => {
              io.emit("update_table", {
                // TODO: Change test data
                cards: card,
                gameScore: [10, 2],
                generalScore: [4, 3],
                players: [{ id: 1, playerName: "a" }],
              });
            });

            socket.on("add_hand", (data) => {
              io.in(player.roomName).emit("update_table", {
                // TODO: Change test data
                cards: [{ value: 1, type: "Clubs" }],
                gameScore: [10, 2],
                generalScore: [4, 3],
                players: ["Player1", "Player2", "Player3", "Player4"],
              });
            });

            socket.on("reset_hand", (data) => {
              // TODO: Emit update_player event to each socket.id in the room.
              //       For now we send only to sender's socket.id
              io.to(`${socket.id}`).emit("update_player", {
                // TODO: Change test data
                cards: [
                  { value: 7, type: "Hearts" },
                  { value: 3, type: "Diamonds" },
                ],
              });

              io.in(player.roomName).emit("update_table", {
                // TODO: Change test data
                cards: [{ value: 1, type: "Clubs" }],
                gameScore: [10, 2],
                generalScore: [4, 3],
                players: ["Player1", "Player2", "Player3", "Player4"],
              });
            });
          });
        }
      });
    });
  },
};

module.exports = socketEvents;
