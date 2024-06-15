import express from "express";
const router = express.Router();
import { WebSocketServer } from "ws";
import itemBidModel from "../models/itemBidModel.js";

const wss = new WebSocketServer({ port: 8082 });
let currentItem = null;
let currentHighestBid = 0;
let highestBidder = null;
let bidderId;
function startAuction(item) {
  currentItem = item;
  currentHighestBid = item.startingPrice;
  highestBidder = null;

  // Notify clients about new auction item
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ type: "itemAdded", item }));
  });

  // Start auction countdown
  setTimeout(() => {
    endAuction();
  }, 60000);
}

function endAuction() {
  // Determine winner and notify clients
  if (highestBidder) {
    // Notify winner

    itemBidModel
      .findByIdAndUpdate(
        currentItem.id,
        {
          sold: true,
          price: currentHighestBid,
          winner: highestBidder,
          winnerId: bidderId,
        },
        { new: true }
      )
      .then((updatedItem) => {});
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: "auctionEnded",
          winner: highestBidder,
          price: currentHighestBid,
          sold: true,
        })
      );
    });
  }

  // Reset auction variables
  currentItem = null;
  currentHighestBid = 0;
  highestBidder = null;
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data);
    switch (data.type) {
      case "placeBid":
        const { bidder, bidAmount, bidder_id } = data;
        if (bidAmount > currentHighestBid) {
          currentHighestBid = bidAmount;
          highestBidder = bidder;
          bidderId = bidder_id;
          // Broadcast new highest bid to all clients
          wss.clients.forEach((client) => {
            client.send(
              JSON.stringify({
                type: "newBid",
                bidder,
                bidAmount,
                bidder_id,
              })
            );
          });
        }
        break;
      case "addItem":
        const { item } = data;
        startAuction(item);
        break;
      default:
        break;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

export default router;
