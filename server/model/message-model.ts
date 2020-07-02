import mongoose from "mongoose";

interface MessageAttrs {
  name: string;
  userId: string;
  message: string;
  roomId: string;
}

export interface MessageDoc extends mongoose.Document {
  name: string;
  userId: string;
  message: string;
  roomId: string;
  createdAt: Date;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    message: { type: String, required: true },
    roomId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

MessageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  "Messages",
  MessageSchema
);

export { Message };
