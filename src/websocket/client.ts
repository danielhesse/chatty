import { io } from "../http";

type ParamsProps = {
  email: string;
  text: string;
}

io.on("connect", (socket) => {
  socket.on("client_first_access", (params: ParamsProps) => {
    console.log(params);
  });
});
