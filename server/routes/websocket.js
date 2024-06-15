import express from "express";
import path from "path";
import { WebSocketServer } from "ws";
import auctionItemSchema from "../models/itemBidModel.js";
import bidModel from "../models/bidModel.js";
import UserModel from "../models/userModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const wss = new WebSocketServer({ port: 8081 });

let message = {
  type: "noItem",
  content: {
    currentItem: [],
    degree: 0,
    previousBidsUser: [],
    current_price: 0,
  },
  private: {
    previousBids: [],
  },
};

async function checkNewItem() {
  let checkNewItemId = setInterval(() => {
    if (message.type === "noItem") {
      if (message.content.currentItem[0] !== undefined) {
        (async () => {
          let check = await auctionItemSchema
            .find({ bidded: false })
            .sort({ start_bid_date: 1 })
            .limit(1);
          if (check.length > 0) {
            pickItem();
          }
        })();
      } else {
        (async () => {
          let check = await auctionItemSchema
            .find({ bidded: false })
            .sort({ start_bid_date: 1 })
            .limit(1);
          if (check.length > 0) {
            pickItem();
          }
        })();
      }
    } else if (message.type === "inWait") {
      (async () => {
        let check = await auctionItemSchema
          .find({ bidded: false })
          .sort({ start_bid_date: 1 })
          .limit(1);
        if (check.length > 0) {
          if (check[0]._id != message.content.currentItem[0]._id) {
            if (
              check[0].start_bid_date <
              message.content.currentItem[0].start_bid_date
            ) {
              message.type = "itemPlaced";
              broadcast();
              clearInterval(global.inWaitId);
              message.content.currentItem = check;
              setTimeout(() => {
                pickItem();
              }, 1000);
            }
          }
        }
      })();
    }
  }, 5000);
}

checkNewItem();

async function pickItem() {
  try {
    let check = await auctionItemSchema
      .find({ bidded: false })
      .sort({ start_bid_date: 1 })
      .limit(1);
    let noItemId;
    if (check.length > 0) {
      message.content.currentItem = check;
      message.content.previousBidsUser = [];
      message.content.currentItem[0].start_bid_date;
      if (
        message.content.currentItem[0].start_bid_date >= new Date().getTime()
      ) {
        inWait();
      } else {
        bidLoop();
      }
      message.content.current_price = check[0].price;
    } else {
      noItem();
    }
  } catch (err) {
    console.log(err);
  }
}

pickItem();

router.get("/", auth, (req, res) => {
  (async () => {
    try {
      if (
        message.type !== "noItem" &&
        message.content.currentItem[0] !== undefined
      ) {
        let loggedInUser = await req.userId;
        let previous_bids = [];
        let currentItem = message.content.currentItem;
        let arr = [];
        for (bid in message.content.previousBidsUser) {
          arr.push(bid);
        }
        for (let n = arr.length; n--; ) {
          let prop = message.content.previousBidsUser[arr[n]];
          previous_bids.push(prop);
        }

        let owner = await UserModel.find({ _id: currentItem[0].user_id });
        let currentPrice = message.content.current_price;
        let previousBids = message.content.previousBidsUser;
        let startBidDate = message.content.currentItem.start_bid_date;
        res.status(200).json({
          currentItem,
          previousBids,
          owner,
          currentPrice,
          previous_bids,
          startBidDate,
          loggedInUser,
        });
      } else {
        let noItem = true;
        res.status(200).json({ noItem });
      }
    } catch (err) {
      console.log(err);
    }
  })();
});

function broadcast() {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({ type: message.type, content: message.content })
      );
    }
  });
}

function noItem() {
  message.type = "noItem";
  broadcast();
}

let bidPlaced = false;

function inWait(itemPlaced) {
  message.type = "inWait";
  broadcast();
  global.inWaitId = global.setInterval(() => {
    if (message.content.currentItem[0].start_bid_date < new Date().getTime()) {
      global.clearInterval(inWaitId);
      bidPlaced = false;
      bidLoop();
    }
  }, 1000);
}

function bidLoop() {
  let i = 0;

  function bidStart() {
    i = 0;
    message.type = "bidStart";
    message.content.degree = i;
    broadcast();
    global.bidStartId = setInterval(() => {
      message.content.degree = i;
      if (bidPlaced) {
        global.clearInterval(bidStartId);
        bidPlaced = false;
        bidStart();
        broadcast();
      }
      if (i > 360) {
        global.clearInterval(bidStartId);
        message.type = "bonusTime";
        broadcast();
        setTimeout(() => {
          bonusStart();
        }, 2000);
      }
      i++;
    }, 30);
  }

  setTimeout(() => {
    bidStart();
  }, 1000);

  function bonusStart() {
    i = 0;
    message.type = "bonusStart";
    global.bonusStartId = setInterval(() => {
      if (i <= 360) {
        message.content.degree = i;
        if (i == 0) {
          broadcast();
        }
      } else {
        global.clearInterval(bonusStartId);
        message.content.degree = 0;
        if (message.content.previousBidsUser.length > 0) {
          message.type = "itemSold";
          broadcast();
          setTimeout(() => {
            nextItem();
          }, 2000);
        } else {
          nextItem();
        }
      }
      i++;
    }, 30);
  }
}

function nextItem() {
  message.type = "nextItem";
  broadcast();
  (async () => {
    if (message.content.previousBidsUser.length > 0) {
      await auctionItemSchema.updateOne(
        { _id: message.content.currentItem[0]._id },
        { bidded: true, sold: true }
      );
      await bidModel.create({
        item_id: message.content.currentItem[0]._id,
        user_id:
          message.private.previousBids[message.private.previousBids.length - 1]
            .user_id,
        price: message.content.current_price,
      });
      pickItem();
    } else {
      await auctionItemSchema.updateOne(
        { _id: message.content.currentItem[0]._id },
        { bidded: true }
      );
      pickItem();
    }
    message.content.previousBidsUser = [];
    message.content.current_price = 0;
  })();
}

wss.on("connection", function connection(ws, req) {
  const token = req.url.split("?")[1].split("=")[1];
  if (token) {
    (async () => {
      let user = await UserModel.findById({ _id: token });
      if (user) {
        ws.user = user;
      } else {
        ws.user = undefined;
      }
    })();
  }

  ws.on("message", function incoming(data) {
    let parsed = JSON.parse(data);
    console.log(parsed);
    if (
      (message.type == "bidStart" || message.type == "bonusStart") &&
      parseInt(parsed.price) > message.content.current_price
    ) {
      if (ws.user !== undefined) {
        message.content.previousBidsUser.push({
          price: parsed.price,
          address: ws.user[0].address,
        });
        message.private.previousBids.push({
          price: parsed.price,
          user_id: ws.user[0]._id,
          address: ws.user[0].address,
        });
        message.content.current_price = parseInt(parsed.price);
        clearInterval(global.bidStartId);
        clearInterval(global.bonusStartId);
        message.type = "bidPlaced";
        broadcast();
        bidPlaced = true;
        bidLoop();
      }
    }
  });
  ws.send(JSON.stringify({ type: message.type, content: message.content }));
});

export default router;
