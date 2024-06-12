import marketModel from "../models/marketModel.js";
import { uploads } from "../services/cloudinary.js";
import fs from "fs";

export const getItems = async (req, res) => {
  try {
    const items = await marketModel.find().populate("seller");
    res.status(200).json({ result: items });
  } catch (error) {
    res.status(404).json({ message: "Somethings Wrong" });
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await marketModel.findById(id).populate("seller");
    res.status(200).json({ result: items });
  } catch (error) {
    res.status(404).json({ message: "Somethings Wrong" });
  }
};

export const createItem = async (req, res) => {
  try {
    console.log(req);
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

    const newItemPost = new marketModel({
      ...item,
      seller: req.userId,
      images: data,
    });
    await newItemPost.save();
    res.status(201).json({ newItemPost });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
