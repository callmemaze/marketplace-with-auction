"use client";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetConvoQuery } from "@/store/slices/conversationSlices";
import Conversation from "@/components/Conversation";
import {
  useCreateMessageMutation,
  useGetMessageQuery,
} from "@/store/slices/messageSlices";
import Message from "@/components/Message";
import { useFormik } from "formik";
import { messageSchema } from "@/validation/schemas";
import { io } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { toast } = useToast();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const userProfile = JSON.parse(localStorage.getItem("profile"));
  const { data, isSuccess, isLoading } = useGetConvoQuery(
    userProfile.user.result._id
  );
  useEffect(() => {
    if (data && isSuccess) {
      setConversations(data);
    }
  }, [data, isSuccess]);
  const {
    data: message,
    isSuccess: success,
    isLoading: loading,
  } = useGetMessageQuery(currentChat?._id);

  useEffect(() => {
    setMessages(message);
  }, [message, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userProfile.user.result._id);
    socket.current.on("getUsers", (users) => {});
  }, [userProfile.user.result]);

  const initialValues = {
    text: "",
    sender: userProfile.user.result._id,
    conversationId: "",
  };
  const [createMessage] = useCreateMessageMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const [newMessage, setNewMessage] = useState("");

  const handleSubmits = async (e) => {
    e.preventDefault();
    const message = {
      sender: userProfile.user.result._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== userProfile.user.result._id
    );
    socket.current.emit("sendMessage", {
      senderId: userProfile.user.result._id,
      receiverId,
      text: values.text,
    });
    try {
      const response = await createMessage(message);
      console.log(response.data);
      if (response.data) {
        setMessages([...messages, response.data]);
        setErrorMessage("");
      }
      if (response.error) {
        setErrorMessage(response.error);
        console.log(response.error.data);
        toast({
          title: "Oops Error",
          variant: "destructive",
          description: response.error.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(messages);
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: messageSchema,
    onSubmit: async (values, action) => {
      values.conversationId = currentChat._id;
      const receiverId = currentChat.members.find(
        (member) => member !== userProfile.user.result._id
      );

      socket.current.emit("sendMessage", {
        senderId: userProfile.user.result._id,
        receiverId,
        text: values.text,
      });
      try {
        const response = await createMessage(values);
        if (response.data) {
          setMessages([...messages, response.data]);
          setErrorMessage("");
          action.resetForm();
        }
        if (response.error) {
          setErrorMessage(response.error);
          console.log(response.error.data);
          toast({
            title: "Oops Error",
            variant: "destructive",
            description: response.error.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex p-20">
      <div className="w-60">
        <div>
          <span className="font-Bricolage">Your Conversation</span>
        </div>
        <ScrollArea className="h-96 w-full rounded-md border">
          <div className="p-2 mt-2 w-full h-10">
            {conversations && !isLoading
              ? conversations.map((c) => (
                  <div onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={userProfile} />
                  </div>
                ))
              : null}
          </div>
        </ScrollArea>
      </div>
      <div className="w-2/3 h-96">
        <span>Your Messages</span>
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="p-4">
            {messages?.map((m) => (
              <Message
                message={m}
                own={m.sender === userProfile.user.result._id}
              />
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit}>
          <div className="mt-8">
            <Textarea
              placeholder="Type your message here."
              id="text"
              type="text"
              name="text"
              value={values.text}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
