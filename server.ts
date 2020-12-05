import ApplicationController from "./src/ApplicationController";

import https from "https";
import fs from "fs";
import socketio from "socket.io";
import NotificationSocketService from "./src/app/services/NotificationSocketService";

const port = process.env.PORT || 3333;

let server;

if (process.env.NODE_ENV == "dev") {
  server = ApplicationController.listen(port);

  console.log("Listening in development mode. Port: " + port);
} else {
  const options = {
    key: fs.readFileSync("./privkey.pem"),
    cert: fs.readFileSync("./cert.pem"),
  };

  server = https.createServer(options, ApplicationController).listen(port);

  console.log("Listening in production mode. Port: " + port);
}

/** Socket initialize. */
NotificationSocketService.setSocketServer(socketio(server));
NotificationSocketService.initializeSocketListeners();
