"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useGetItemQuery } from "@/store/slices/itemSlices";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ChatBox from "@/components/ChatBox";
import { useCreateConvoMutation } from "@/store/slices/conversationSlices";
import { useRouter } from "next/router";

const page = ({ params }) => {
  const [items, setItems] = useState();
  const { data, isSuccess, isLoading } = useGetItemQuery(params.id);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newConvo, setNewConvo] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [secondUser, setSecondUser] = useState();
  const [count, setCount] = useState(0);
  const [user, setUser] = useState();
  const userProfile = JSON.parse(localStorage.getItem("profile"));
  const router = useRouter();
  useEffect(() => {
    if (!userProfile) {
      router.push("auth/login");
    }
  }, [userProfile]);
  useEffect(() => {
    setUser(userProfile.user.result._id);
  }, []);

  useEffect(() => {
    arrivalMessage &&
      conversations?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    setCount((prevCount) => prevCount + 1);
  }, [arrivalMessage, conversations]);

  console.log(count);

  useEffect(() => {
    if (data && isSuccess) {
      const { result } = data;
      setItems(result);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (items) {
      setSecondUser(items.seller._id);
    }
  }, [items]);

  //console.log(conversations);
  const [progress, setProgress] = React.useState(25);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  console.log(secondUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/conversation/find/${user}/${secondUser}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setConversations(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user, secondUser]);

  const fetchMessage = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/message/${conversations._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setMessages(result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(conversations);
  const [createConvo] = useCreateConvoMutation();

  const createConv = async (data) => {
    try {
      const response = await createConvo(data);
      if (response.error) {
        console.log(response.error.data);
      }
      console.log(response);
      setNewConvo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    setIsChatOpen(!isChatOpen);
    if (conversations) {
      fetchMessage();
    } else {
      const data = {
        senderId: user,
        receiverId: secondUser,
      };
      createConv(data);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [messages, conversations]);
  return items && !isLoading ? (
    <div className="p-24 flex justify-center items-center">
      <div>
        <div>
          <Image
            src={items.images[0].url}
            width={250}
            height={300}
            alt="home page backgriund"
          />
        </div>
        <div className="flex justify-end mt-3">
          <span className="font-Bricolage font-semibold">
            Price: Nrp.{items.price}{" "}
          </span>
        </div>
        <div className="mt-8 flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col pl-3">
            <span className="text-sm text-[#0F730C] font-Bricolage">
              {items.seller.name}
            </span>
            <span className="text-xs font-Bricolage">
              {items.seller.phone || 9727347233}
            </span>
          </div>
          <span className="text-xs font-Bricolage">
            {moment(items.created_At).fromNow()}
          </span>
        </div>
        <div className="mt-5">
          <Separator className="text-text-grey w-[300px] h-[2px]" />
        </div>
        <div className="flex justify-center items-center mt-3 w-full">
          <Button
            variant="ghost"
            className="flex items-center w-full"
            onClick={handleSubmit}
          >
            <MessageSquareText />
            <span className="text-lg font-Bricolage ml-1">Chat</span>
          </Button>
        </div>
      </div>
      <div className="ml-3">
        <Separator
          orientation="vertical"
          className="text-text-grey w-[2px] h-[470px]"
        />
      </div>
      <div className="p-2 pl-4">
        <div>
          <span className="font-Bricolage font-bold text-3xl">
            {" "}
            {items.title}{" "}
          </span>
        </div>
        <div className="mt-6">
          <span className="font-Bricolage text-xl"> Description </span>
        </div>
        <div>
          <Separator className="text-text-grey w-[600px] h-[2px]" />
        </div>
        <div className="p-3">
          <span>{items.description}</span>
        </div>
        <div className="mt-5">
          <span className="font-Bricolage text-xl">Details</span>
        </div>
        <div>
          <Table>
            <TableBody>
              <TableRow key={items._id}>
                <TableCell className="font-medium font-Bricolage">
                  Ads ID
                </TableCell>
                <TableCell className="font-Bricolage">{items._id}</TableCell>
              </TableRow>
              <TableRow key={items.location}>
                <TableCell className="font-medium font-Bricolage">
                  Location
                </TableCell>
                <TableCell className="font-Bricolage">
                  {items.location}
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="font-medium font-Bricolage">
                  Delivery
                </TableCell>
                <TableCell className="font-Bricolage">No Delivery</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="font-medium font-Bricolage">
                  Negotiable
                </TableCell>
                <TableCell className="font-Bricolage">Non Negotiable</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="ml-3">
        <Separator
          orientation="vertical"
          className="text-text-grey w-[2px] h-[470px]"
        />
      </div>
      {isChatOpen && (
        <ChatBox
          onClose={toggleChat}
          messages={messages}
          user={userProfile}
          conversationsId={conversations._id ? conversations._id : newConvo._id}
          currentChat={conversations ? conversations : newConvo}
        />
      )}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Progress value={progress} className="w-[60%]" />
      <span className="mt-10"> Please wait ...... </span>
    </div>
  );
};

export default page;
