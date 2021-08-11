import { getCustomRepository } from "typeorm";
import { io } from "../http";

import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

type ParamsProps = {
  email: string;
  text: string;
}

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  const usersRepository = getCustomRepository(UsersRepository);
  const connectionsRepository = getCustomRepository(ConnectionsRepository);

  socket.on("client_first_access", async (params: ParamsProps) => {
    let user_id = null;
    const { email, text } = params;

    const checkUserExistence = await usersRepository.findOne({ email });

    if (!checkUserExistence) {
      const user = await usersService.create({ email });

      // Create connection
      await connectionsService.create({
        user_id: user.id,
        socket_id: socket.id,
      });

      user_id = user.id;
    } else {
      // Verify if connection exists
      const connection = await connectionsRepository.findOne({
        where: { user_id: checkUserExistence },
      });

      if (!connection) {
        // Create connection
        await connectionsService.create({
          user_id: checkUserExistence.id,
          socket_id: socket.id,
        });
      } else {
        // Update connection
        connection.socket_id = socket.id;

        await connectionsService.create(connection);
      }

      user_id = checkUserExistence.id;
    }

    // Send message
    await messagesService.create({
      user_id,
      text,
      sender: "user",
    });

    // Emit new Event to list messages
    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionsRepository.find({ where: { sender: "user" } });
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionsRepository.findOne({ socket_id });

    const message = await messagesService.create({
      user_id,
      text,
      sender: "user",
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      socket_id,
      message,
    });
  });
});
