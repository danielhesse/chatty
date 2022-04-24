import { Connection } from "../entities/Connection";
import { io } from "../http";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) => {
  const connectionsRepository = ConnectionsRepository;
  const messagesService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionsRepository.find({
    where: { admin_id: null },
    relations: ["user"],
  });

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages);
  });

  socket.on("admin_send_message", async (params) => {
    const { user_id, text } = params;

    await messagesService.create({
      admin_id: socket.id,
      user_id,
      text,
      sender: "admin",
    });

    const { socket_id } = await connectionsRepository.findOne({
      where: {
        user_id
      }
    });

    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id,
    });
  });

  socket.on("admin_user_in_support", async params => {
    const { user_id } = params;
    await connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ socket_id: socket.id })
      .where("user_id = :user_id", {
        user_id,
      })
      .execute();

    const allConnectionsWithoutAdmin = await connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"],
    });

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
  });
});
