const SocketEvents = {
  JOIN: {
    NOTIFICATIONS: "join:notifications",
  },

  NEW: {
    NOTIFICATION: "new:notification",
    DEVICE_TOKEN: "new:device_token",
  },

  REQUEST: {
    NEW_TOKEN: "request:new_token",
    CONFIRM_RECEIVED: "request:confirm_received",
  },
};

export default SocketEvents;
