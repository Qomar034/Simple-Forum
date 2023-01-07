const loadListeners = () => {
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
      socket.on(SOCKET_EVENTS.IDENTIFY, (msg) => {

          console.log(msg);

          try {
              const json = jParse(msg);
              const { userId } = json;
              const mapId = Number(userId);

              if (isNaN(mapId)) {
                  emitSocket(socket, SOCKET_EVENTS.ERROR, jString({
                      error: true,
                      message: "Invalid userId",
                  }));
              }

              // save user socket for use
              userSockets.set(mapId, socket);
          } catch (err) {
              console.error("[IDENTIFY ERROR]", err);

              emitSocket(socket, SOCKET_EVENTS.ERROR, jString({
                  error: true,
                  message: "Internal Server Error",
              }));
          }
      });

      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
          let uId;
          for (const [id, usocket] of userSockets) {
              if (socket.id === usocket.id) {
                  uId = id;
                  break;
              }
          }

          if (uId) userSockets.delete(uId);
      });
  });
}