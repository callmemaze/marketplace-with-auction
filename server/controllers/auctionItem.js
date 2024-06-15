import auctionItemSchema from "../models/itemBidModel.js";
import bidModel from "../models/bidModel.js";
import { uploads } from "../services/cloudinary.js";
import fs from "fs";

export const getAuctionItems = async (req, res) => {
  try {
    const items = await auctionItemSchema.find().populate("user");
    res.status(200).json({ result: items });
  } catch (error) {
    res.status(404).json({ message: "Somethings Wrong" });
  }
};

export const getAuctionItem = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await auctionItemSchema.findById(id).populate("user");
    res.status(200).json({ result: items });
  } catch (error) {
    res.status(404).json({ message: "Somethings Wrong" });
  }
};

export const createAuctionItem = async (req, res) => {
  try {
    const item = req.body;
    const files = req.files;
    const data = [];
    const uploaders = async (path) => await uploads(path, "Images");
    for (const file of files) {
      const { path } = file;
      const newPath = await uploaders(path);
      data.push(newPath);
      fs.unlinkSync(path);
    }
    console.log(item.start_bid_date);
    if (item.start_bid_date == "1m") {
      item.start_bid_date = 60;
    } else if (item.start_bid_date == "1h") {
      item.start_bid_date = 3600;
    } else if (item.start_bid_date == "1d") {
      item.start_bid_date = 24 * 60 * 60;
    }
    const newItemPost = new auctionItemSchema({
      ...item,
      user: req.userId,
      images: data,
    });
    await newItemPost.save();
    res.status(201).json({ newItemPost });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
