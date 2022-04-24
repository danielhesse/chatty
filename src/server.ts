import "reflect-metadata";


import { http } from "./http";

import "./websocket/client";
import "./websocket/admin";
import { AppDataSource } from "./database";

async function server() {
  await AppDataSource.initialize();

  http.listen(3333, () => {
    console.log("🚀 Server running on port 3333.");
  });

}
server()
