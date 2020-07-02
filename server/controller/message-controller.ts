import { Request, Response } from "express";
import { Message } from "../model/message-model";

export const getAllMessageController = async (req: Request, res: Response) => {
  const messages = await Message.find({ roomId: req.params.roomId });
  res.status(200).send(messages);
};

export const addMessageController = async (req: Request, res: Response) => {
  const { message } = req.body;
  const newMessage = Message.build({
    message,
    name: req.currentUser.name,
    userId: req.currentUser.id,
    roomId: req.params.roomId,
  });
  await newMessage.save();
  res.status(201).send(newMessage);
};
