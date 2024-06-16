import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import Message from "./Message";
import { messageSchema } from "@/validation/schemas";
import { useCreateMessageMutation } from "@/store/slices/messageSlices";
import { useFormik } from "formik";

const ChatBox = ({ onClose, messages, user, conversationsId, currentChat }) => {
  const [message, setMessage] = useState([]);
  const [createMessage] = useCreateMessageMutation();
  const initialValues = {
    text: "",
    sender: user.result?._id,
    conversationId: "",
  };

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: messageSchema,
    onSubmit: async (values, action) => {
      values.conversationId = conversationsId;
      const receiverId = currentChat.members.find(
        (member) => member !== user.result?._id
      );

      try {
        const response = await createMessage(values);
        if (response.data) {
          setMessage([...message, response.data]);
          action.resetForm();
        }
        if (response.error) {
          console.log(response.error.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex flex-col w-80 h-96 border border-gray-300 rounded bg-white shadow-lg absolute right-0 bottom-0">
      <div className="w-full flex justify-between p-2">
        <span className="font-Bricolage "> Your Message </span>
        <Button variant="ghost" onClick={onClose}>
          <X />
        </Button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages?.map((m) => (
          <Message
            message={m}
            own={m.sender === user.result?._id}
            key={m.sender}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex p-2 border-t border-gray-200">
          <Input
            type="text"
            name="text"
            id="text"
            value={values.text}
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded mr-2"
            placeholder="Type your message..."
          />
          <Button variant="ghost" className="rounded" type="submit">
            <SendHorizontal />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
