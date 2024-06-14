"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetAuctionItemQuery } from "@/store/slices/auctionItemSlices";

const page = ({ params }) => {
  const [items, setItems] = useState();
  const [reBidStart, setReBidStart] = useState(false);
  const [mode, setMode] = useState("");
  const [activeBorder, setActiveBorder] = useState(null);
  const [socket, setSocket] = useState();
  useEffect(() => {
    // WebSocket connection
    const userProfile = JSON.parse(localStorage.getItem("profile"));
    const socket = new WebSocket(
      `ws://localhost:8080?token=${userProfile.user.result._id}`
    );
    setSocket(socket);
    socket.onopen = () => {
      console.log("connected to the server");
    };

    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      const input = document.querySelector('.add-bid input[type="number"]');
      const previousBids = document.querySelector(".previous-bids .content");

      switch (parsed.type) {
        case "itemPlaced":
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          break;
        case "inWait":
          setMode("inWait");
          document.querySelector(".circle-bid").style.backgroundColor =
            "#E6F4F7";
          activeBorder.style.backgroundColor = "#39B4CC";
          activeBorder.style.backgroundImage =
            "linear-gradient(90deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)";
          // More React-like way of setting content
          setCircleContent(
            <>
              <h6>Bid starts in:</h6>
              <h5 id="endtime"></h5>
            </>
          );
          initializeClock(parsed.content.currentItem[0].start_bid_date);
          break;
        case "bidStart":
          setMode("bidStart");
          document.querySelector(".circle-bid").style.backgroundColor =
            "#E6F4F7";
          timer(parsed.content.degree, parsed.type);
          activeBorder.style.backgroundColor = "#39B4CC";
          activeBorder.style.backgroundImage =
            "linear-gradient(90deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)";
          // More React-like way of setting content
          setCircleContent(
            <>
              <p>Current Price: </p>
              <p style={{ fontWeight: "bold" }}>
                {parsed.content.current_price}$
              </p>
            </>
          );
          clockAudio("play");
          break;
        // Handle other cases similarly
        default:
          break;
      }
    };

    // Cleanup function
    return () => {
      // Close WebSocket connection
      socket.close();
    };
  }, []);
  const sendBid = () => {
    socket.send(JSON.stringify({ type: "addBid", price: 100 }));
  };

  const { data, isSuccess, isLoading } = useGetAuctionItemQuery(params.id);
  useEffect(() => {
    if (data && isSuccess) {
      const { result } = data;
      setItems(result);
    }
  }, [data, isSuccess]);
  console.log(items);
  const [progress, setProgress] = React.useState(25);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
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
              {items.user.name}
            </span>
            <span className="text-xs font-Bricolage">
              {items.user.phone || 9727347233}
            </span>
          </div>
          <span className="text-xs font-Bricolage">
            {moment(items.created_At).fromNow()}
          </span>
        </div>
        <div className="mt-5">
          <Separator className="text-text-grey w-[300px] h-[2px]" />
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
            {items.name}{" "}
          </span>
        </div>
        <div className="mt-6">
          <span className="font-Bricolage text-xl"> Description </span>
        </div>
        <div>
          <Separator className="text-text-grey w-[600px] h-[2px]" />
        </div>
        <div className="p-3">
          <span>{items.details}</span>
        </div>
        <div className="mt-5">
          <span className="font-Bricolage text-xl">Bidding</span>
        </div>
        <div>
          <Button onClick={sendBid}>Send Bid</Button>
        </div>
      </div>
      <div className="ml-3">
        <Separator
          orientation="vertical"
          className="text-text-grey w-[2px] h-[470px]"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Progress value={progress} className="w-[60%]" />
      <span className="mt-10"> Please wait ...... </span>
    </div>
  );
};

export default page;
