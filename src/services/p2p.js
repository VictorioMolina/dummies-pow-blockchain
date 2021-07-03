import WebSocket from "ws";

const { P2P_PORT = 5000, PEERS } = process.env;
// PEERS=ws:5001,ws:5002...
const peers = PEERS ? PEERS.split(",") : [];
const MESSAGE = { BLOCKS: "blocks" };

class P2PSevice {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });

    server.on("connection", (socket) => this.onConnection(socket));

    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on("open", () => this.onConnection(socket));
    });

    console.log(`Service P2P:${P2P_PORT} listening...`);
  }

  onConnection(socket) {
    console.log("[ws:socket] connected");

    this.sockets.push(socket);

    socket.on("message", (message) => {
      console.log("[ws:message] received");

      const { type, value } = JSON.parse(message);

      try {
        if (type === MESSAGE.BLOCKS) {
          this.blockchain.replace(value);
        }
      } catch (err) {
        console.log(`[ws:message] error ${err}`);
      }
    });

    const message = {
      type: MESSAGE.BLOCKS,
      value: this.blockchain.blocks,
    };

    socket.send(JSON.stringify(message));
  }

  sync() {
    const { blocks } = this.blockchain;
    this.broadcast(MESSAGE.BLOCKS, blocks);
  }

  broadcast(type, value) {
    console.log(`[ws:broadcast] ${type}...`);

    const message = JSON.stringify({ type, value });

    this.sockets.forEach((socket) => {
      socket.send(message);
    });
  }
}

export default P2PSevice;
